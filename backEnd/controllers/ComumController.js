import { criarEBlog, listarEBlog, obterEBlogPorUser } from "../models/Estudante.js"
import { obterBlogPorUser } from "../models/Noticia.js"

const criarNoticiaController = async (req, res) => {
    try {
        const { titulo, conteudo, imagem1, imagem2, imagem3 } = req.body

        const noticiaData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
            autor: req.usuarioId.nome,
            imagem1: imagem1,
            imagem2: imagem2,
            imagem3: imagem3,
            autorizacao: 'Aguardando'
        }
        console.log(noticiaData)
        const noticiaId = await criarEBlog(noticiaData)
        res.status(201).json({ mensagem: 'Notícia enviada para revisão', noticiaId })
    }
    catch (err) {
        console.error('Erro enviando sugestão: ', err)
        res.status(500).json({ mensagem: "Erro ao enviar sugestão" })
        throw err
    }
}

const userBlogController = async (req, res) => {
    try {
        const autor = req.params.autor
        const blog = await obterEBlogPorUser(autor)
        console.log(blog)
        if (blog) {
            return res.json(blog)
        }
        else {
            res.status(404).json({ mensagem: "Não há blogs com este autor" })
        }
    }
    catch (err) {
        console.error('Erro listando blogs:', err)
        res.status(500).json({ mensagem: "Erro ao listar livros" })
        throw err
    }
}

export { criarNoticiaController, userBlogController }