import { listarLivros, obterLivro, criarLivro, atualizarLivro, excluirLivro } from "../models/Noticia.js"
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const listarLivrosController = async (req, res) => {
    try {
        const livros = await listarLivros()
        res.status(200).json(livros)
    }
    catch (err) {
        console.error('Erro ao listar livros:', err)
        res.status(500).json({ mensagem: "Erro ao listar livros" })
        throw err
    }
}

const obterLivroController = async (req, res) => {
    try {
        const livro = await obterLivro(req.params.id)
        if (livro) {
            res.json(livro)
        }
        else {
            res.status(404).json({ mensagem: "Livro não encontrado" })
        }
    }
    catch (err) {
        console.error('Erro ao listar livros:', err)
        res.status(500).json({ mensagem: "Erro ao listar livros" })
        throw err
    }
}

const criarLivroController = async (req, res) => {
    try {
        const { titulo, descricao, isbn } = req.body
        let capaPath = null
        if (req.file) {
            capaPath = req.file.path.replace(__dirname.replace('\\controlers', ''), '')
        }

        const livroData = {
            titulo: titulo,
            descricao: descricao,
            isbn: isbn,
            capa: capaPath,
        }

        const livroId = await criarLivro(livroData)
        res.status(201).json({ mensagem: 'Livro criado com sucesso', livroId })
    }
    catch (err) {
        console.error('Erro ao criar livro: ', err)
        res.status(500).json({ mensagem: "Erro ao criar livro" })
        throw err
    }
}


const atualizarLivroController = async (req, res) => {
    try {
        const livroId = req.params.id
        const { titulo, descricao, isbn } = req.body
        let capaPath = null
        if (req.file) {
            capaPath = req.file.path.replace(__dirname.replace('\\controlers', ''), '')
        }
        const livroData = {
            titulo: titulo,
            descricao: descricao,
            isbn: isbn,
            capa: capaPath,
        }
        await atualizarLivro(livroId, livroData)
        res.status(200).json({ mensagem: "Livro atualizado com sucesso" })
    }
    catch (err) {
        console.error('Erro ao atualizar livro: ', err)
        res.status(500).json({ mensagem: "Erro ao atualziar livro" })
        throw err
    }
}


const excluirLivroController = async (req, res) => {
    try {
        const livroId = req.params.id
        await excluirLivro(livroId)
        res.status(200).json({ mensagem: "Livro excluido com sucesso" })
    }
    catch (err) {
        console.error('Erro ao atualizar livro: ', err)
        res.status(500).json({ mensagem: "Erro ao atualziar livro" })
        throw err
    }
}

export { listarLivrosController, obterLivroController, criarLivroController, atualizarLivroController, excluirLivroController }