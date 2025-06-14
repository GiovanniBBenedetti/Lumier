import { read, update, deleteRecord, create } from "../config/database.js";

const obterUsuario = async (email) => {
    try {
        return await read('usuarios', `email = '${email}'`);
    } catch (err) {
        console.error('Erro ao obter usuário por email: ', err);
        throw err;
    }
};

const criarUsuario = async (dados) =>{
    try {
        return await create('usuarios', dados)
    } catch (err) {
        console.error('Erro ao criar usuario: ', err)
        throw err
    }
}

const atualizarUsuario = async (email, usuarioData) => {
    try {
        await update('usuarios', usuarioData, `email = '${email}'`);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }   
};

const excluirUsuario = async (email) => {
    try {
        await deleteRecord('usuarios', `email = '${email}'`);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
};

export { obterUsuario, atualizarUsuario, excluirUsuario, criarUsuario };
