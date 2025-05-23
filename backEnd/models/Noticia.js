import { read, readAll, create, deleteRecord, update } from "../config/database.js"

const listarLivros = async () => {
    try {
        return await readAll('livros')
    }
    catch (err) {
        console.error('Erro ao listar livros:', err)
        throw err
    }
}

const obterLivro = async (id) => {
    try {
        return await read('livros', `id = ${id}`)
    }
    catch (err) {
        console.error('Erro ao listar livro:', err)
        throw err
    }
}

const criarLivro = async (livroData) => {
    try {
        return await create('livros', livroData)
    }
    catch (err) {
        console.error('Erro ao criar livro:', err)
        throw err
    }
}

const atualizarLivro = async (id, livroData) => {
    try {
        await update('livros', livroData, `id = ${id}`)
    }
    catch (err) {
        console.error('Erro ao atualizar livro:', err)
        throw err
    }
}

const excluirLivro = async (id) => {
    try {
        await deleteRecord('livros', `id = ${ìd}`)
    }
    catch (err) {
        console.error('Erro ao delete livro:', err)
        throw err
    }
}

export { listarLivros, obterLivro, criarLivro, atualizarLivro, excluirLivro }