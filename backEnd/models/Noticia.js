import { read, readAll, create, update, deleteRecord } from "../config/database.js";

const listarBlog = async () => {
    try {
        return await readAll('noticia')
    } catch (err) {
        console.error('Erro ao listar blog: ', err)
        throw err
    }
};

const obterBlogPorUser = async (user) => {
    try {
        return await read('noticia', `autor = ${user}`)
    } catch (err) {
        console.error('Erro ao obter blog por autor: ', err)
        throw err;
    }
}

const criarBlog = async (blogData) => {
    try {
        return await create('noticia', blogData);
    } catch (error) {
        console.error('Erro ao criar blog:', error);
        throw error;
    }
};

const atualizarBlog = async (id, blogData) => {
    try {
        await update('noticia', blogData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao atualizar blog:', error);
        throw error;
    }
};


const excluirBlog = async (id) => {
    try {
        await deleteRecord('noticia', `id = ${id}`);
    } catch (error) {
        console.error('Erro ao excluir blog:', error);
        throw error;
    }
};
export { listarBlog, obterBlogPorUser, criarBlog, atualizarBlog, excluirBlog }