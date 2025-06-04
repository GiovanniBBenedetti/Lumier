import { listarEventos, obterEventoPorId, criarEvento, atualizarEvento,excluirEvento } from "../models/Eventos.js";


const listarEventoController = async (req, res) => {
    try {
        const eventos = await listarEventos()
        res.status(200).json(eventos)
    } catch (err) {
        console.error('Erro ao listar eventos: ', err)
        res.status(500).json({ mensagem: 'Erro ao listar eventos' })
    }
}



const obterEventoPorIdController = async (req, res) => {
    try {
        const evento = await obterEventoPorId(req.params.id)
        if (evento) {
            res.json(evento)
        } else {
            res.status(404).json({mensagem: 'Nenhum evento encontrado com esse id'})
        }
    } catch (err) {
        console.error('Erro ao obter evento por ID: ', err)
        res.status(500).json({ mensagem: 'Erro ao obter blog por ID' })
    }
}



const criarEventoController = async (req, res) => {
    try {
        const { evento, data_evento, descricao } = req.body;

        const eventoData = {
            evento: evento,
            data_evento: data_evento,
            decricao: descricao

        };
        const eventoId  = await criarEvento(eventoData);
        res.status(201).json({ mensagem: 'evento criado com sucesso', eventoId });
    } catch (error) {
        console.error('Erro ao criar evento: ', error);
        res.status(500).json({ mensagem: 'Erro ao criar evento' });
    }
}


const atualizarEventoController = async (req, res) => {
    try {
        const eventoId = req.params.id;
        const { evento, data_evento, descricao } = req.body;
        const eventoData = {
            evento: evento,
            data_evento: data_evento,
            decricao: descricao

        };
        await atualizarBlog(eventoId, eventoData);
        res.status(200).json({ mensagem: 'Evento atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar evento' });
    }
};


const excluirEventoController = async (req, res) => {
    try {
        const eventoId = req.params.id;
        await excluirBlog(eventoId);
        res.status(200).json({ mensagem: 'evento excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir blog:', error);
        res.status(500).json({ mensagem: 'erro ao excluir evento' });
    }
};


export{listarEventoController, obterEventoPorIdController, criarEventoController, atualizarEventoController, excluirEventoController}
