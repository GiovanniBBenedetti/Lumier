import express from "express";
import { criarComentarioController, listarComentarioController } from "../controllers/comentarioBlogController.js";
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();


router.post("/", authMiddleware, criarComentarioController);


router.get("/:id", listarComentarioController);

export default router;
