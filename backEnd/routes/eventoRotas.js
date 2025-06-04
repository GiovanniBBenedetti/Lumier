import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {listarEventoController, obterEventoPorIdController,criarEventoController, atualizarEventoController, excluirEventoController } from '../controllers/eventoController.js'
const router = express.Router()


router.get('/' ,listarEventoController)
router.get('/:id', obterEventoPorIdController)

router.post('/', authMiddleware, criarEventoController)
router.put('/:id', authMiddleware, atualizarEventoController)
router.delete('/:id', authMiddleware, excluirEventoController)




router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
})
router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE OPTIONS');
    res.status(204).send();
})





export default router   