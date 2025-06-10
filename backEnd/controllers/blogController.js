import { obterRecomendacaoPorId, listarBlog, obterBlogPorId, criarBlog, atualizarBlog, excluirBlog, obterBlogPorEmail, criarRecomendacao, listarRecomendacao, atualizarRecomendacao } from "../models/Blog.js"
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
            res.status(404).json({ mensagem: 'Nenhum livro encontrado com esse ' })
        }
    } catch (err) {
        console.error('Erro ao obter blog por ID: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter blog por ID' })
    }
}



const criarBlogController = async (req, res) => {
    try {
        const { titulo, conteudo, tags, tipo } = req.body;
        const autor = req.usuario.nome
        let capaPath = null;
        if (req.file) {
            capaPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const blogData = {
            titulo: titulo,
            conteudo: conteudo,
            tags: tags,
            tipo: tipo,
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
            imagem2: imagem3,

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



///////////////////////////recomendação///////////////////////////////

const obterBlogPorEmailController = async (req, res) => {
    try {
        const blog = await obterBlogPorEmail(req.params.email)
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({ mensagem: 'Nenhum blog por este usuario' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
}

const obterRecomendacaoPorIdController = async (req, res) => {
    try {
        const blog = await obterRecomendacaoPorId(req.params.id)
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({ mensagem: 'Nenhum blog por este usuario' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
}



const criarRecomendacaoController = async (req, res) => {
    try {
        const { titulo, conteudo, tipo, tags } = req.body;
        const autor = req.usuario.nome
        const email = req.usuario.email
        let capaPath = null;
        if (req.file) {
            capaPath = req.file.path.replace(__dirname.replace('\\controllers', ''), '');
        }
        const blogData = {
            titulo: titulo,
            tags: tags,
            conteudo: conteudo,
            tipo: tipo,
            data_publicacao: new Date(),
            email: email,
            autor: autor,
            imagem1: capaPath,
            estado: 'Aguardando'
        };
        const blogId = await criarRecomendacao(blogData);
        res.status(201).json({ mensagem: 'blog criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar blog:', error);
        res.status(500).json({ mensagem: 'Erro ao criar blog' });
    }
}


const obterRecomendacaoController = async (req, res) => {
    try {
        const blogs = await listarRecomendacao()
        res.status(200).json(blogs)
    }
    catch (error) {
        console.error('Erro ao listar blogs: ', err)
        res.status(500).json({ mensagem: 'Erro ao listar blogs' })
    }
};



const atualizarRecomendacaoController = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { estado, titulo, imagem1, autor, data_publicacao, conteudo, tags, tipo } = req.body;
        const blogData = {
            estado: estado
        };
        await atualizarRecomendacao(blogId, blogData);
        if (estado == 'Aceitado') {
            const blogData = {
                titulo: titulo,
                tags: tags,
                conteudo: conteudo,
                tipo: tipo,
                data_publicacao: new Date(data_publicacao),
                autor: autor,
                imagem1: imagem1,
            }
            const blogId = await criarBlog(blogData);
            res.status(200).json({ mensagem: 'Recomendação incluida com sucesso' });
        }
        else {
            res.status(200).json({ mensagem: 'Recomendação excluída com sucesso' });
        }
    } catch (error) {
        console.error('Erro ao excluir blog:', error);
        res.status(500).json({ mensagem: 'Recomendação excluída com sucesso' });
    }
};





export {
    obterRecomendacaoPorIdController, atualizarRecomendacaoController, criarRecomendacaoController, listarBlogController, obterBlogPorIdController, criarBlogController, atualizarBlogController, excluirBlogController, obterBlogPorEmailController, obterRecomendacaoController
};