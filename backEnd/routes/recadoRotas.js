import express from 'express'
import { getAllRecadosController, getRecadoController, postRecadoController } from '../controllers/recadoController.js'
import multer from 'multer';
import path from 'path';
import authMiddleware from '../middlewares/authMiddleware.js'
import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/adminMiddleware.js';
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

router.get('/', auth, isAdmin, getAllRecadosController);
router.get('/:turma', authMiddleware, getRecadoController);
router.post('/', auth, isAdmin, upload.single('imagem1'), postRecadoController);

export default router