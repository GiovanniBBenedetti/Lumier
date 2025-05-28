
const adminMiddleware = (req, res, next) => {
  if (req.usuario?.tipo !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado: apenas administradores podem fazer isso.' })
  }
  next()
}

export default adminMiddleware
