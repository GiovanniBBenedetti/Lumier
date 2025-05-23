import { read, compare, create, readAll } from '../config/database.js'

const criarNoticiaController = async (req, res) => {
    try {
        const { titulo, conteudo, email } = req.body
        
        const noticiaData = {
            titulo: titulo,
            texto: conteudo,
            usuario: email
        }

        const noticiaId = await create('noticiaEstudante', noticiaData)
        res.status(201).json({ mensagem: 'Notícia enviada para revisão', noticiaId })
    }
    catch (err) {
        console.error('Erro ao criar livro: ', err)
        res.status(500).json({ mensagem: "Erro ao criar livro" })
        throw err
    }
}

export { criarNoticiaController }