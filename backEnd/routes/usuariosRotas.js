import multer from 'multer';
import path from 'path';
import express from 'express'
import { getUsuario, putUsuario, deleteUsuario } from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { fileURLToPath } from 'url';
const router = express.Router()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});
const upload = multer({ storage: storage });


router.get('/',authMiddleware ,getUsuario);
router.put('/', authMiddleware,upload.single('fotoPerfil'),putUsuario);
router.delete('/',authMiddleware  ,deleteUsuario);

export default router;