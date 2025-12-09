import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { isAdmin: boolean }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ success: false, error: '未提供認證 Token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
    req.user = decoded as { isAdmin: boolean }
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token 無效或已過期' })
  }
}
