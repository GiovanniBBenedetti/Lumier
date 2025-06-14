import { getRecado, postRecados, getAllRecados } from "../models/Recado.js";
import { fileURLToPath } from 'url';
import path from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postRecadoController = async (req, res) => {
    try {
        const { titulo, conteudo, turma } = req.body;

 ;

        const autor = req.usuario.nome

        const recadoData = {
            autor: autor,
            titulo: titulo,
            conteudo: conteudo,
            data_publicacao: new Date(),
 
            turma: turma
        };
        const recados = await postRecados(recadoData)
        res.status(200).json(recados)
    } catch (err) {
        console.error('Erro ao criar recado: ', err)
        res.status(500).json({ mensagem: 'Erro ao criar recado' })
    }
}

const getRecadoController = async (req, res) => {
    try {
        const turma = req.params.turma;
        const recados = await getRecado(turma)
        res.status(200).json(recados)[0]
    }
    catch (err) {
        console.error('Erro ao listar recado: ', err)
        res.status(500).json({ mensagem: 'Erro ao listar recado' })
    }
}

const getAllRecadosController = async (req, res) => {
    try {
        const recados = await getAllRecados()
        res.status(200).json(recados)
    }
    catch (err) {
        console.error('Erro ao listar recados: ', err)
        res.status(500).json({ mensagem: 'Erro ao listar recados' })
    }
}

export { postRecadoController, getAllRecadosController, getRecadoController }