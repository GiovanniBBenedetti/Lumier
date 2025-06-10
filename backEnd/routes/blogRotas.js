import express from 'express'
import { obterRecomendacaoPorIdController, atualizarRecomendacaoController, criarRecomendacaoController, obterRecomendacaoController, criarBlogController, atualizarBlogController, excluirBlogController, listarBlogController, obterBlogPorIdController, obterBlogPorEmailController } from '../controllers/blogController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/adminMiddleware.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.single('imagem1'), criarBlogController)
router.put('/:id', authMiddleware, upload.single('imagem1'), atualizarBlogController)
router.delete('/:id', authMiddleware, excluirBlogController)

router.get('/recomendacaoEstado/:id', obterRecomendacaoPorIdController)
router.get('/recomendacao/:email', authMiddleware, obterBlogPorEmailController)
router.get('/recomendacao', obterRecomendacaoController)
router.post('/recomendacao', authMiddleware, upload.single('imagem1'), criarRecomendacaoController)
router.put('/recomendacao/:id', authMiddleware, isAdmin, atualizarRecomendacaoController)


router.get('/', listarBlogController)
router.get('/:id', obterBlogPorIdController)


router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
})
router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE OPTIONS');
    res.status(204).send();
})


export default router   