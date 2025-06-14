import { readMore, readAll, create } from "../config/database.js";

const postRecados = async (recadoData) => {
    try {
        return await create("recados", recadoData);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        throw error;
    }
};

const getRecado = async (turma) => {
    try {
        return await readMore("recados", `turma = '${turma}'`);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        throw error;
    }
};

const getAllRecados = async () => {
    try {
        return await readAll("recados");
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        throw error;
    }
};

export { getAllRecados, getRecado, postRecados };
