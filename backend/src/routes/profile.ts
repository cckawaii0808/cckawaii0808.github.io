import { Router, Request, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// 取得個人資料 (公開)
router.get('/', async (req: Request, res: Response) => {
  try {
    const profile = await req.prisma.profile.findFirst()
    res.json({ success: true, data: profile })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ success: false, error: '無法取得個人資料' })
  }
})

// 更新個人資料 (需認證)
router.put('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, title, bio, email, avatarUrl, githubUrl, linkedinUrl } = req.body

    // 先檢查是否有現有的 profile
    const existingProfile = await req.prisma.profile.findFirst()

    let profile
    if (existingProfile) {
      // 更新現有資料
      profile = await req.prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name,
          title,
          bio,
          email,
          avatarUrl,
          githubUrl,
          linkedinUrl,
        },
      })
    } else {
      // 建立新資料
      profile = await req.prisma.profile.create({
        data: {
          name,
          title,
          bio,
          email,
          avatarUrl,
          githubUrl,
          linkedinUrl,
        },
      })
    }

    res.json({ success: true, data: profile })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ success: false, error: '無法更新個人資料' })
  }
})

export default router
