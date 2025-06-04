import { obterUsuario, excluirUsuario, atualizarUsuario } from "../models/Usuario.js";
import { fileURLToPath } from 'url';
import path from 'path'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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

export { getUsuario, putUsuario, deleteUsuario };
