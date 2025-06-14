import { obterUsuario, excluirUsuario, atualizarUsuario, criarUsuario } from "../models/Usuario.js";
import { fileURLToPath } from 'url';
import path from 'path'
import { generateHashedPassword } from "../hashPassword.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postUsuario = async (req, res) => {
    try {
        const { email, senha, nome, tipo, turma } = req.body;
        const senhaHasheada = await generateHashedPassword(senha);
        const dataAtual = new Date();
        const usuarioData = {
            email: email,
            senha: senhaHasheada,
            nome: nome,
            tipo: tipo,
            turma: turma,
            dataCriacao: dataAtual,
            dataAtualizacao: dataAtual
        }
        await criarUsuario(usuarioData);
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
    }
    catch (err) {
        console.error('Erro criando usuário: ', err);
        res.status(500).json({ menssagem: "Erro ao criar usuário" })
    }
}

const getConflito = async (req, res) => {
    try {
        const email = req.params.email;
        const usuario = await obterUsuario(email);
        if (usuario == null) {
            return res.status(202).json({ mensagem: 'Não há ninguem com este email' });
        }
        res.status(200).json({ mensagem: 'Há um usuário com este email' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
};

const getUsuario = async (req, res) => {
    const email = req.usuario.email;
    try {
        const usuario = await obterUsuario(email);
        if (usuario.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
};

const putUsuario = async (req, res) => {
    try {
        const emailUsuario = req.usuario.email;
        const { nome } = req.body;
        let foto = null;

        if (req.file) {
            const rootDir = path.resolve(__dirname, '..');
            foto = path.relative(rootDir, req.file.path).replace(/\\/g, '/');
        }

        const usuarioData = {
            nome,
            fotoPerfil: foto
        };

        await atualizarUsuario(emailUsuario, usuarioData);
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
};


const deleteUsuario = async (req, res) => {
    const email = req.usuario.email;
    try {
        await excluirUsuario(email);
        res.json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir usuário' });
    }
};

export { getUsuario, putUsuario, deleteUsuario, postUsuario, getConflito };
