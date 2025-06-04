import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url';
import path from 'path';
import authMiddleware from '../middlewares/authMiddlewares.js'
import { criarNoticiaController, userBlogController } from '../controllers/ComumController.js'
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

router.get('/', authMiddleware, userBlogController)

router.post('/', authMiddleware, upload.single('imagem'), criarNoticiaController)

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET', 'POST', 'OPTIONS')
    res.status(204).send()
})

export default router