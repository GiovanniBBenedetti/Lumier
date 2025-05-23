import { read, compare, create, readAll } from '../config/database.js'

const listarController = async (req, res) => {
    try {
        const usuarios = await readAll('noticiaEstudante')
        return res.status(200).json(usuarios)
    }
    catch (err) {
        console.error('Erro ao fazer o login: ', err)
        res.status(500).json({ menssagem: "Erro ao fazer login" })
    }
}

export { listarController }