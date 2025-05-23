import jwt from "jsonwebtoken"
import { read, compare, create, readAll } from '../config/database.js'
import { JWT_SECRET } from "../config/jwt.js"
import bcrypt from "bcryptjs"
import { generateHashedPassword } from "../hashPassword.js"

const buscaController = async (req, res) => {
    try {
        const email = req.params.email
        const usuario = await read('usuarios', `email = '${email}'`)

        if (!usuario) {
            return res.status(200).json({ double: false, email: email})
        }

        return res.status(200).json({ double: true, email: email})
    }
    catch (err) {
        console.error('Erro ao fazer o login: ', err)
        res.status(500).json({ menssagem: "Nenhum usuário encontrado" })
    }
}

const listarController = async (req, res) => {
    try {
        const usuarios = await readAll('usuarios')
        return res.status(200).json(usuarios)
    }
    catch (err) {
        console.error('Erro ao fazer o login: ', err)
        res.status(500).json({ menssagem: "Erro ao fazer login" })
    }
}

const loginController = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await read('usuarios', `email = '${email}'`)

        if (!usuario) {
            return res.status(404).json({ menssagem: "Usuário não encontrado" })
        }

        const senhaCorreta = await compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ menssagem: "senha incorreta" })
        }

        const token = jwt.sign({ id: usuario, tipo: usuario.tipo }, JWT_SECRET, { expiresIn: '1h' })

        res.json({ menssagem: 'Login realizado com sucesso ', token })
    }
    catch (err) {
        console.error('Erro ao fazer o login: ', err)
        res.status(500).json({ menssagem: "Erro ao fazer login" })
    }
}

const cadastroController = async (req, res) => {
    const { email, senha, nome} = req.body

    try {
        const senhaHasheada = await generateHashedPassword(senha)
        const dataAtual = new Date()
        const usuarioData = {
            email: email,
            senha: senhaHasheada,
            nome: nome,
            tipo: "comum",
            dataCriacao: dataAtual,
            dataAtualizacao: dataAtual
        }
        const usuarioId = await create('usuarios', usuarioData)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso'})
    }
    catch(err){
        console.error('Erro ao fazer ao criar usuário: ', err)
        res.status(500).json({ menssagem: "Erro ao criar usuário" })
    }
}

export { loginController, cadastroController, buscaController, listarController }

