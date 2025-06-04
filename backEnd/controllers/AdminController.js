import { atualizarEBlog, excluirEBlog, listarEBlog } from "../models/Estudante.js"
import { criarBlog } from "../models/Noticia.js"

const listarController = async (req, res) => {
    try {
        const usuarios = await listarEBlog('noticiaEstudante')
        console.log(usuarios)
        return res.status(200).json(usuarios)
    }
    catch (err) {
        console.error('Erro listando sugestões: ', err)
        res.status(500).json({ menssagem: "Erro ao listar sugestões" })
    }
}

const criarBlogController = async (req, res) => {
    try {
        const { noticia } = req.body
        const blogData = {
            titulo: noticia.item.titulo,
            conteudo: noticia.item.conteudo,
            data_publicacao: new Date(),
            autor: noticia.item.autor,
            imagem1: noticia.item.imagem1,
        }
        const blogEData = {
            titulo: noticia.item.titulo,
            conteudo: noticia.item.conteudo,
            data_publicacao: new Date(),
            autor: noticia.item.autor,
            imagem1: noticia.item.imagem1,
            autorizacao: 'aceito',
        }
        const blogId = await criarBlog(blogData)
        const blogUpd = await atualizarEBlog(noticia.item.id, blogEData)
        res.status(201).json({ mensagem: 'Blog aprovado', blogId, blogUpd })
    } catch (error) {
        console.error('Erro ao aprovar blog:', error)
        res.status(500).json({ mensagem: 'Erro ao aprovar blog' })
    }
}

const recusarBlogController = async (req, res) => {
    try {
        const noticia = req.body.noticia
        const blogEData = {
            titulo: noticia.item.titulo,
            conteudo: noticia.item.conteudo,
            data_publicacao: new Date(),
            autor: noticia.item.autor,
            imagem1: noticia.item.imagem1,
            autorizacao: 'Recusado',
        }
        const blogUpd = await atualizarEBlog(noticia.item.id, blogEData)
        res.status(201).json({ mensagem: 'Blog recusado', blogUpd })
    }
    catch (err) {
        console.error('Erro ao recusar blog: ', err)
        res.status(500).json({ mensagem: "Erro ao recusar blog" })
        throw err
    }
}

const dashboard = (req, res) => {
    res.json({ mensagem: `Bem-vindo ao painel admin, ${req.usuario.nome}` });
};

export { listarController, criarBlogController, recusarBlogController, dashboard }