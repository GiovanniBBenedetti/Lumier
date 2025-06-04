import { criarEBlog, listarEBlog, obterEBlogPorUser } from "../models/Estudante.js"
import { obterBlogPorUser } from "../models/Noticia.js"
import { fileURLToPath } from 'url';
import path from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const criarNoticiaController = async (req, res) => {
    try {
        console.log(req.body)
        const { titulo, conteudo} = req.body
        let imagemPath = null;
        if (req.file) {
            imagemPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const noticiaData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
            autor: req.usuario.nome,
            imagem1: imagemPath,
            autorizacao: 'Aguardando'
        }
        console.log(imagemPath)
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
        const autor = req.usuario.nome
        const blog = await obterEBlogPorUser(autor)
        console.log(req.usuario)
        if (blog) {
            return res.json({blog, nome: autor})
        }
        else {
            res.status(404).json({ mensagem: "Não há blogs com este autor"})
        }
    }
    catch (err) {
        console.error('Erro listando blogs:', err)
        res.status(500).json({ mensagem: "Erro ao listar livros" })
        throw err
    }
}

export { criarNoticiaController, userBlogController }