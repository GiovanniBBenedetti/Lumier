import express from 'express'
import { listarController, criarBlogController, recusarBlogController, dashboard} from '../controllers/AdminController.js'
import { cadastroAdminController } from '../controllers/AuthController.js'
import auto from '../middlewares/authMiddlewares.js'
import isAdmin from '../middlewares/adminMiddleware.js'
import authMiddleware from '../middlewares/authMiddlewares.js'
const router = express.Router()

router.get('/dashboard', auto, isAdmin, dashboard);

router.get('/estudantes', auto, isAdmin, listarController)

router.post('/estudantes', authMiddleware, criarBlogController)

router.post('/estudantesRejeitar', authMiddleware, recusarBlogController)

router.post('/cadastro', authMiddleware, cadastroAdminController)

router.options('/estudantes', (req, res) => {
    res.setHeader('Allow', 'GET', 'POST', 'OPTIONS')
    res.status(204).send()
})
router.options('/estudantesRejeitar', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

router.options('/cadastro', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

export default router