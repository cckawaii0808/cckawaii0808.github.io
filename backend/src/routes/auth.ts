import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// 登入
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { password } = req.body

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return res.status(500).json({ success: false, error: '伺服器設定錯誤' })
    }

    if (password !== adminPassword) {
      return res.status(401).json({ success: false, error: '密碼錯誤' })
    }

    const token = jwt.sign(
      { isAdmin: true },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({ success: true, data: { token } })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, error: '登入失敗' })
  }
})

// 驗證 Token
router.get('/verify', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ success: false, error: '未提供 Token' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    res.json({ success: true, data: { valid: true } })
  } catch (error) {
    res.status(401).json({ success: false, error: 'Token 無效' })
  }
})

export default router
