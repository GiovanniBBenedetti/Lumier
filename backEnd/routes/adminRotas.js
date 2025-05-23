import express from 'express'
import { listarController, criarBlogController } from '../controllers/AdminController.js'
import authMiddleware from '../middlewares/authMiddlewares.js'
const router = express.Router()

// router.get('/')

router.get('/estudantes', authMiddleware, listarController)

// router.post('/noticia')

router.post('/estudantes', authMiddleware, criarBlogController)



export default router