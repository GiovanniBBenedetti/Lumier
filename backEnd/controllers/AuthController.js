import jwt from "jsonwebtoken"
import { read, compare, create, readAll } from '../config/database.js'
import { JWT_SECRET } from "../config/jwt.js"
import bcrypt from "bcryptjs"
import { generateHashedPassword } from "../hashPassword.js"
import { atualizarUsario } from "../models/Usuario.js"

const cadastroAdminController = async (req, res) => {
    const { email, senha, nome } = req.body

    try {
        const senhaHasheada = await generateHashedPassword(senha)
        const dataAtual = new Date()
        const usuarioData = {
            email: email,
            senha: senhaHasheada,
            nome: nome,
            tipo: "admin",
            dataCriacao: dataAtual,
            dataAtualizacao: dataAtual
        }
        const usuarioId = await create('usuarios', usuarioData)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' })
    }
    catch (err) {
        console.error('Erro criando usuário: ', err)
        res.status(500).json({ menssagem: "Erro ao criar usuário" })
    }
}

const buscaController = async (req, res) => {
    try {
        const email = req.params.email
        const usuario = await read('usuarios', `email = '${email}'`)
        if (usuario.length <= 0) {
            return res.status(200).json({ double: false, usuario: usuario[0] })
        }

        return res.status(200).json({ double: true, usuario: usuario[0] })
    }
    catch (err) {
        console.error('Erro listando usuários: ', err)
        res.status(500).json({ menssagem: "Erro interno" })
    }
}

const listarController = async (req, res) => {
    try {
        const usuarios = await readAll('usuarios')
        return res.status(200).json(usuarios)
    }
    catch (err) {
        console.error('Erro listando usuários: ', err)
        res.status(500).json({ menssagem: "Erro interno" })
    }
}

const loginController = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await read('usuarios', `email= '${email}'`)
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        const senhaCorreta = await compare(senha, usuario[0].senha)

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha Incorreta' })
        }
        const token = jwt.sign(
            {
                id: usuario[0].id,
                email: usuario[0].email,
                nome: usuario[0].nome,
                tipo: usuario[0].tipo 
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ mensagem: 'Login realizado com sucesso', token, tipo: usuario[0].tipo, nome:usuario[0].nome})
    } catch (err) {
        console.error('Erro ao fazer login: ', err)
        res.status(500).json({ mensagem: 'Erro ao fazer login' })
    }

}

const cadastroController = async (req, res) => {
    const { email, senha, nome } = req.body

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
        console.log(usuarioData)
        const usuarioId = await create('usuarios', usuarioData)
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' })
    }
    catch (err) {
        console.error('Erro criando usuário: ', err)
        res.status(500).json({ menssagem: "Erro ao criar usuário" })
    }
}

const atualizarController = async (req, res) => {
    try {
        const { email, senha, nome, dataCriacao } = req.body
        console.log(req.body)
        const senhaHasheada = await generateHashedPassword(senha)
        const dataAtualizacao = new Date()
        const novaData = new Date(dataCriacao)
        const usuarioData = {
            "email": email,
            "senha": senhaHasheada,
            "nome": nome,
            "tipo": "comum",
            "dataCriacao": novaData,
            "dataAtualizacao": dataAtualizacao
        }
        const usuarioId = await atualizarUsario(usuarioData, email)
        res.status(201).json({ mensagem: 'Usuário atualizado com sucesso'})
    }
    catch (err) {
        console.error('Erro atualizando usuário: ', err)
        res.status(500).json({ menssagem: "Erro ao atualizar usuário" })
    }
}

export { loginController, cadastroController, buscaController, listarController, cadastroAdminController, atualizarController }

