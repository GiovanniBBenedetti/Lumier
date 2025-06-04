import express from "express";
import { criarComentarioController, listarComentarioController } from "../controllers/comentarioBlogController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.options("/", (req, res) => {
  res.set("Allow", "POST,OPTIONS");
  res.sendStatus(204); // Sem conteúdo
});

router.options("/:id", (req, res) => {
  res.set("Allow", "GET,OPTIONS");
  res.sendStatus(204);
});

router.post("/", authMiddleware, criarComentarioController);
router.get("/:id", listarComentarioController);

export default router;
