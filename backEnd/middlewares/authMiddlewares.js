import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'
import { response } from 'express'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ menssagem: "Não autorizado: Token não fornecido" })
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.jwt = decoded
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(403).json({ menssagem: "Não autorizado: Token inválidooooo" })
    }
}

export default authMiddleware