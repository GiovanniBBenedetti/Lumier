import { listarBlog, obterBlogPorId, criarBlog, atualizarBlog, excluirBlog } from "../models/Blog.js"
import { fileURLToPath } from 'url';
import path from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const listarBlogController = async (req, res) => {
    try {
        const blogs = await listarBlog()
        res.status(200).json(blogs)
    } catch (err) {
        console.error('Erro ao listar blogs: ', err)
        res.status(500).json({ mensagem: 'Erro ao listar blogs' })
    }
}

const obterBlogPorIdController = async (req, res) => {
    try {
        const blog = await obterBlogPorId(req.params.id)
        if (blog) {
            res.json(blog)
        } else {
            res.status(404).json({ mensagem: `blog não encontrado` })
        }
    } catch (err) {
        console.error('Erro ao obter blog por ID: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter blog por ID' })
    }
}



const criarBlogController = async (req, res) => {
    try {
        const { titulo, conteudo, data_publicacao, autor,} = req.body;
        let capaPath = null;
        if (req.file) {
            capaPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const blogData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
            autor: autor,
            imagem1: capaPath,

        };
        const blogId = await criarBlog(blogData);
        res.status(201).json({ mensagem: 'blog criado com sucesso', blogId });
    } catch (error) {
        console.error('Erro ao criar blog:', error);
        res.status(500).json({ mensagem: 'Erro ao criar blog' });
    }
}

const atualizarBlogController = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { titulo, conteudo, data_publicacao, autor, imagem1, imagem2, imagem3 } = req.body;
        const blogData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: data_publicacao,
            autor: autor,
            imagem1: imagem1,
            imagem2: imagem2,
            imagem2:imagem3,

        };
        await atualizarBlog(blogId, blogData);
        res.status(200).json({ mensagem: 'Blog atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar blog:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar blog' });
    }
};

const excluirBlogController = async (req, res) => {
    try {
        const blogId = req.params.id;
        await excluirBlog(blogId);
        res.status(200).json({ mensagem: 'Blog excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir blog:', error);
        res.status(500).json({ mensagem: 'Blog excluído com sucesso' });
    }
};

export {
  listarBlogController, obterBlogPorIdController, criarBlogController, atualizarBlogController,excluirBlogController
};