import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js'
import { criarNoticiaController, userBlogController } from '../controllers/ComumController.js'
const router = express.Router()

router.get('/', authMiddleware, (req, res) => {
    res.status(200).json({ usuario: req.usuarioId.nome, email:req.usuarioId.email, tipo: req.usuarioId.tipo})
})

router.get('/:autor', authMiddleware, userBlogController)

router.post('/', authMiddleware, criarNoticiaController)

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET', 'POST', 'OPTIONS')
    res.status(204).send()
})

router.options('/:autor', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

export default router