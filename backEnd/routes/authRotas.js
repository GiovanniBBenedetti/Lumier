import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js'
import { atualizarController, cadastroController, loginController, buscaController, listarController } from "../controllers/AuthController.js"

const router = express.Router()

router.post('/login', loginController)

router.post('/cadastro', cadastroController)

router.get('/', listarController)

router.get('/:email', buscaController)

router.put('/:email', authMiddleware, atualizarController)

router.options('/login', (req, res) => {
    res.setHeader('Allow', 'POST', 'OPTIONS')
    res.status(204).send()
})

router.options('/cadastro', (req, res) => {
    res.setHeader('Allow', 'POST', 'OPTIONS')
    res.status(204).send()
})

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

router.options('/:email', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

export default router