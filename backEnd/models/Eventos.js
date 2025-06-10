import { read, readAll, create, update, deleteRecord } from "../config/database.js";


const listarEventos = async () => {
    try {

        return await readAll('eventos', null, 'data_evento ASC')
    } catch (err) {
        console.error('Erro ao listar eventos: ', err)
        throw err
    }
};

const obterEventoPorId = async (id) => {
    try {
        return await read('eventos', `id = ${id}`)
    } catch (err) {
        console.error('Erro ao obter evento por ID: ', err)
        throw err;
    }
}

const criarEvento = async (eventoData) => {
    try {
        return await create('eventos', eventoData);
    } catch (error) {
        console.error('Erro ao criar vento:', error);
        throw error;
    }
};

const atualizarEvento = async (id, eventoData) => {
    try {
        await update('eventos', eventoData, `id = ${id}`);
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        throw error;
    }
};


const excluirEvento = async (id) => {
    try {
        await deleteRecord('eventos', `id = ${id}`);
    } catch (error) {
        console.error('Erro ao excluir evento:', error);
        throw error;
    }
};


export { listarEventos, obterEventoPorId, criarEvento, atualizarEvento, excluirEvento }