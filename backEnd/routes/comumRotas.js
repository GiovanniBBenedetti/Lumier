import express from 'express'
import authMiddleware from '../middlewares/authMiddlewares.js'
import { criarNoticiaController } from '../controllers/ComumController.js'
const router = express.Router()

router.get('/', authMiddleware, (req, res) => {
    res.status(200).json({ usuario: req.usuarioNome, email: req.usuarioEmail, id: req.usuarioIdEspecifico, tipo: req.usuarioTipo })
})

router.post('/', authMiddleware, criarNoticiaController)



export default router