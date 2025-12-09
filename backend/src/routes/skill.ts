import { Router, Request, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// 取得所有技能 (公開)
router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await req.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })
    res.json({ success: true, data: skills })
  } catch (error) {
    console.error('Get skills error:', error)
    res.status(500).json({ success: false, error: '無法取得技能' })
  }
})

// 新增技能 (需認證)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, level, order } = req.body

    const skill = await req.prisma.skill.create({
      data: {
        name,
        category,
        level: level || 50,
        order: order || 0,
      },
    })

    res.status(201).json({ success: true, data: skill })
  } catch (error) {
    console.error('Create skill error:', error)
    res.status(500).json({ success: false, error: '無法新增技能' })
  }
})

// 更新技能 (需認證)
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, category, level, order } = req.body

    const skill = await req.prisma.skill.update({
      where: { id: req.params.id },
      data: {
        name,
        category,
        level,
        order,
      },
    })

    res.json({ success: true, data: skill })
  } catch (error) {
    console.error('Update skill error:', error)
    res.status(500).json({ success: false, error: '無法更新技能' })
  }
})

// 刪除技能 (需認證)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await req.prisma.skill.delete({
      where: { id: req.params.id },
    })

    res.json({ success: true, data: null })
  } catch (error) {
    console.error('Delete skill error:', error)
    res.status(500).json({ success: false, error: '無法刪除技能' })
  }
})

export default router
