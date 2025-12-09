import { Router, Request, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()

// 取得所有作品集 (公開)
router.get('/', async (req: Request, res: Response) => {
  try {
    const portfolios = await req.prisma.portfolio.findMany({
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    })
    res.json({ success: true, data: portfolios })
  } catch (error) {
    console.error('Get portfolios error:', error)
    res.status(500).json({ success: false, error: '無法取得作品集' })
  }
})

// 取得精選作品 (公開)
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const portfolios = await req.prisma.portfolio.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
    })
    res.json({ success: true, data: portfolios })
  } catch (error) {
    console.error('Get featured portfolios error:', error)
    res.status(500).json({ success: false, error: '無法取得精選作品' })
  }
})

// 取得單一作品 (公開)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const portfolio = await req.prisma.portfolio.findUnique({
      where: { id: req.params.id },
    })
    if (!portfolio) {
      return res.status(404).json({ success: false, error: '找不到作品' })
    }
    res.json({ success: true, data: portfolio })
  } catch (error) {
    console.error('Get portfolio error:', error)
    res.status(500).json({ success: false, error: '無法取得作品' })
  }
})

// 新增作品 (需認證)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, imageUrl, projectUrl, githubUrl, technologies, featured, order } = req.body

    const portfolio = await req.prisma.portfolio.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies: technologies || [],
        featured: featured || false,
        order: order || 0,
      },
    })

    res.status(201).json({ success: true, data: portfolio })
  } catch (error) {
    console.error('Create portfolio error:', error)
    res.status(500).json({ success: false, error: '無法新增作品' })
  }
})

// 更新作品 (需認證)
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, imageUrl, projectUrl, githubUrl, technologies, featured, order } = req.body

    const portfolio = await req.prisma.portfolio.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies,
        featured,
        order,
      },
    })

    res.json({ success: true, data: portfolio })
  } catch (error) {
    console.error('Update portfolio error:', error)
    res.status(500).json({ success: false, error: '無法更新作品' })
  }
})

// 刪除作品 (需認證)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await req.prisma.portfolio.delete({
      where: { id: req.params.id },
    })

    res.json({ success: true, data: null })
  } catch (error) {
    console.error('Delete portfolio error:', error)
    res.status(500).json({ success: false, error: '無法刪除作品' })
  }
})

export default router
