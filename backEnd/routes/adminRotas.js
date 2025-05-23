import express from 'express'
import { listarController } from '../controllers/AdminController.js'
const router = express.Router()

// router.get('/')

router.get('/estudantes', listarController)

// router.post('/noticia')

// router.post('/noticiaEstudante')



export default router