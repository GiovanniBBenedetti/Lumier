import { excluirEBlog, listarEBlog } from "../models/Estudante.js"
import { criarBlog } from "../models/Noticia.js"

const listarController = async (req, res) => {
    try {
        const usuarios = await listarEBlog('noticiaEstudante')
        return res.status(200).json(usuarios)
    }
    catch (err) {
        console.error('Erro ao fazer o login: ', err)
        res.status(500).json({ menssagem: "Erro ao fazer login" })
    }
}

const criarBlogController = async (req, res) => {
    try {
        const { noticiaId, titulo, conteudo, autor, imagem1, imagem2, imagem3 } = req.body
        const blogData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
            autor: autor,
            imagem1: imagem1,
            imagem2: imagem2,
            imagem3: imagem3,
        }
        console.log(blogData)
        const blogId = await criarBlog(blogData)
        const blogDel = await excluirEBlog(noticiaId)
        res.status(201).json({ mensagem: 'blog criado com sucesso', blogId })
    } catch (error) {
        console.error('Erro ao criar blog:', error)
        res.status(500).json({ mensagem: 'Erro ao criar blog' })
    }
}

export { listarController, criarBlogController }