import express from 'express'
import { criarBlogController, atualizarBlogController, excluirBlogController, listarBlogController, obterBlogPorIdController} from '../controllers/blogController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import isAdmin from '../middlewares/adminMiddlewares.js'
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

router.post('/', authMiddleware,upload.single('imagem1'), isAdmin, criarBlogController )
router.put('/:id', authMiddleware,upload.single('imagem1'), isAdmin, atualizarBlogController )
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