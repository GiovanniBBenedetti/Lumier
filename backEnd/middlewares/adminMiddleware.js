
const adminMiddleware = (req, res, next) => {
  if (req.usuario.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado: apenas administradores' });
  }
};

export default adminMiddleware