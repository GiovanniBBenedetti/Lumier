import express from 'express'
import { criarBlogController, atualizarBlogController, excluirBlogController, listarBlogController, obterBlogPorIdController} from '../controllers/blogController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/adminMiddlewares.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, criarBlogController )
router.put('/:id', authMiddleware, isAdmin, atualizarBlogController )
router.delete('/:id', authMiddleware, isAdmin, excluirBlogController)


router.get('/', listarBlogController)
router.get('/:id', obterBlogPorIdController)


router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})
router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})


export default router   