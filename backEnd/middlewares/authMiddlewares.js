import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ menssagem: "Não autorizado: Token não fornecido" })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.usuarioId = decoded.id
        req.usuarioNome = decoded.id.nome
        req.usuarioEmail = decoded.id.email
        req.usuarioTipo = decoded.id.tipo
        req.usuarioIdEspecifico = decoded.id.id
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(403).json({ menssagem: "Não autorizado: Token inválido" })
    }
}

export default authMiddleware