import { create, executeQuery } from "../config/database.js";

const criarComentario = async (comentarioData) => {
  try {
    return await create("comentariosBlog", comentarioData);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    throw error;
  }
};

const listarComentarioPorId = async (postId) => {
  try {
    const sql = `
      SELECT comentariosBlog.*, usuarios.nome AS user_name
      FROM comentariosBlog
      JOIN usuarios ON comentariosBlog.user_id = usuarios.id
      WHERE comentariosBlog.post_id = ?
    `;
    return await executeQuery(sql, [postId]);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    throw error;
  }
};

export { criarComentario, listarComentarioPorId };
