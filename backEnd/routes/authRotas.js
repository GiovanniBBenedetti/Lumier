import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js'
import { atualizarController, cadastroController, loginController, buscaController} from "../controllers/AuthController.js"

const router = express.Router()

router.get('/:email', buscaController)

router.post('/login', loginController)

router.post('/cadastro', cadastroController)

router.put('/:email', atualizarController)

router.options('/login', (req, res) => {
    res.setHeader('Allow', 'POST', 'OPTIONS')
    res.status(204).send()
})

router.options('/cadastro', (req, res) => {
    res.setHeader('Allow', 'POST', 'OPTIONS')
    res.status(204).send()
})

router.options('/:email', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

export default router