import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarEBlog = async () => {
    try {
        return await readAll('noticiaEstudante')
    } catch (err) {
        console.error('Erro ao listar blog: ', err)
        throw err
    }
};

const obterEBlogPorUser = async (autor) => {
    try {
        return await read('noticiaEstudante', `autor = '${autor}'`)
    } catch (err) {
        console.error('Erro ao obter blog por autor: ', err)
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
export { listarEBlog, obterEBlogPorUser, criarEBlog, atualizarEBlog, excluirEBlog }