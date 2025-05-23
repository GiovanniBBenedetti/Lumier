import express from 'express';
import { listarBlogController, obterBlogPorIdController, criarBlogController, atualizarBlogController, excluirBlogController } from '../controllers/blogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();



router.post('/', authMiddleware,  criarBlogController);
router.put('/:id', authMiddleware, atualizarBlogController);
router.delete('/:id', authMiddleware, excluirBlogController);

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