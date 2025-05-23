import { criarEBlog } from "../models/Estudante.js"

const criarNoticiaController = async (req, res) => {
    try {
        const { titulo, conteudo, imagem1, imagem2, imagem3 } = req.body

        const noticiaData = {
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
            autor: req.usuarioNome,
            imagem1: imagem1,
            imagem2: imagem2,
            imagem3: imagem3,
        }

        const noticiaId = await criarEBlog(noticiaData)
        res.status(201).json({ mensagem: 'Notícia enviada para revisão', noticiaId })
    }
    catch (err) {
        console.error('Erro ao criar livro: ', err)
        res.status(500).json({ mensagem: "Erro ao criar livro" })
        throw err
    }
}

export { criarNoticiaController }