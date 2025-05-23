import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarEBlog = async () => {
    try {
        return await readAll('noticiaEstudante')
    } catch (err) {
        console.error('Erro ao listar blog: ', err)
        throw err
    }
};

const obterEBlogPorId = async (id) => {
    try {
        return await read('noticiaEstudante', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao obter blog por ID: ', err)
        throw err;
    }
}

const criarEBlog = async (blogData) => {
    try {
        return await create('noticiaEstudante', blogData);
    } catch (error) {
        console.error('Erro ao criar blog:', error);
        throw error;
    }
};

const atualizarEBlog = async (id, blogData) => {
    try {
        await update('noticiaEstudante', blogData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao atualizar blog:', error);
        throw error;
    }
};


const excluirEBlog = async (id) => {
    try {
        await deleteRecord('noticiaEstudante', `id = ${id}`);
    } catch (error) {
        console.error('Erro ao excluir blog:', error);
        throw error;
    }
};
export { listarEBlog, obterEBlogPorId, criarEBlog, atualizarEBlog, excluirEBlog }