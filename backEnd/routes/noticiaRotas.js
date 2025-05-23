// import express from 'express'
// import { obterLivroController, listarLivrosController, criarLivroController, atualizarLivroController, excluirLivroController } from '../controllers/NoticiaControler.js'
// import multer from 'multer'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import authMiddleware from '../middlewares/authMiddlewares.js'

// const router = express.Router()
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads/'))
//     },
//     filename: (req, file, cb) => {
//         const nomeArquivo = `${Date.now()}-${file.originalname}`
//         cb(null, nomeArquivo);
//     }
// })
// const upload = multer({ storage: storage })

// router.get('/', listarLivrosController)

// router.get('/:id', obterLivroController)

// router.post('/', authMiddleware, upload.single('capa'), criarLivroController)

// router.put('/', authMiddleware, upload.single('capa'), atualizarLivroController)

// router.delete('/', authMiddleware, excluirLivroController)

// router.options('/', (req, res) => {
//     res.setHeader('Allow', 'GET', 'OPTIONS')
//     res.status(204).send()
// })

// router.options('/:id', (req, res) => {
//     res.setHeader('Allow', 'GET', 'OPTIONS')
//     res.status(204).send()
// })

// export default router