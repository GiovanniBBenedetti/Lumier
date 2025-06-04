import { read, create, readAll, deleteRecord, update } from "../config/database.js";

const criarUsuario = async (usuarioData) => {
    try {
        return await create('usuarios', usuarioData)
    } catch (err) {
        console.error('Erro ao criar usuario: ', err)
        throw err
    }
}

const atualizarUsario = async (usuarioData, usuario ) => {
    try {
        console.log(usuarioData)
        return await update('usuarios', usuarioData, `email = '${usuario}'`)
    } catch (err) {
        console.error('Erro ao atualizar usuario: ', err)
        throw err
    }
}

const obterUsuarios = async () => {
    try {
        return await readAll('usuarios')
    } catch (err) {
        console.error('Erro ao listar usuarios: ', err)
        throw err
    }
}

const listarUsuario = async (usuario) => {
    try {
        return await read('usuarios', `usuario = ${usuario}`)
    } catch (err) {
        console.error('Erro ao listar usuarios: ', err)
        throw err
    }
}

export { criarUsuario, atualizarUsario, listarUsuario, obterUsuarios }