import { criarComentario, listarComentarioPorId  } from "../models/ComentariosBlog.js";


export const criarComentarioController  = async (req, res) => {
  const { post_id, content } = req.body;
  const user_id = req.usuario.id;

  if (!post_id || !content) {
    return res.status(400).json({ message: "Post ID e conteúdo são obrigatórios." });
  }
  
  try {
    await criarComentario({ post_id, user_id, content });
    res.status(201).json({ message: "Comentário criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ message: "Erro ao criar comentário." });
    
  }


}

export const listarComentarioController = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await listarComentarioPorId(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ message: "Erro ao buscar comentários." });
  }
};
