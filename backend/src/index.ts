import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

import portfolioRoutes from './routes/portfolio.js'
import profileRoutes from './routes/profile.js'
import skillRoutes from './routes/skill.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// 將 prisma 實例附加到 request
app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

// Routes
app.use('/api/portfolios', portfolioRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/auth', authRoutes)

// 健康檢查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 錯誤處理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ success: false, error: '伺服器內部錯誤' })
})

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// 優雅關閉
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

// 擴展 Express Request 類型
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient
    }
  }
}
