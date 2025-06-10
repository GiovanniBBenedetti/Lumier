import { read, readAll, create, update, deleteRecord, readMore } from "../config/database.js";

const listarBlog = async () => {
    try {
    
        return await readAll('noticia', null, 'data_publicacao DESC')
    } catch (err) {
        console.error('Erro ao listar blog: ', err)
        throw err
    }
};

const obterBlogPorId = async (id) => {
    try {
        return await read('noticia', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao obter blog por ID: ', err)
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

const obterBlogPorEmail = async (autor) => {
    try {
        return await readMore('recomendacoes', `email = '${autor}'`)
    } catch (error) {
        console.error('Erro listar blogs:', error);
        throw error;
    }
}

const obterRecomendacaoPorId = async (id) => {
    try {
        return await readMore('recomendacoes', `id = '${id}'`)
    } catch (error) {
        console.error('Erro listar blogs:', error);
        throw error;
    }
}

const criarRecomendacao = async (blogData) => {
    try {
        return await create('recomendacoes', blogData);
    } catch (error) {
        console.error('Erro ao criar blog:', error);
        throw error;
    }
};

const listarRecomendacao = async () => {
    try {
        return await readAll('recomendacoes');
    } catch (err) {
        console.error('Erro ao listar blogs:', err);
        throw err;
    }
}

const atualizarRecomendacao = async (id, blogData) => {
    try {
        return await update('recomendacoes', blogData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao atualizar blog:', error);
        throw error;
    }
};

export { listarBlog, obterBlogPorId, criarBlog, atualizarBlog, excluirBlog, obterBlogPorEmail, criarRecomendacao, listarRecomendacao, atualizarRecomendacao, obterRecomendacaoPorId }