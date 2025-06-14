import express from 'express'
import blogRotas from './routes/blogRotas.js'
import authRotas from './routes/authRotas.js'
import comentariosBlogRotas from './routes/comentarioBlog.js'
import adminRotas from './routes/adminRotas.js'
import usuariosRotas from './routes/usuariosRotas.js'
import eventosRotas from  './routes/eventoRotas.js'
import recadoRotas from './routes/recadoRotas.js'
import cors from 'cors'
const app = express()
const port = 3200;


app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));


app.use('/auth', authRotas)
app.use('/recados', recadoRotas);
app.use('/blog', blogRotas);
app.use('/admin', adminRotas);
app.use('/usuario', usuariosRotas )
app.use("/comentariosBlog", comentariosBlogRotas);
app.use("/eventos", eventosRotas)

app.get('/', (req,res) =>{
    res.status(200).json({mensagem: 'Bem vindo a Api Restful da Lumier'})
})
app.options('/', (req,res)=>{
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
})

app.use((req,res) =>{
    res.status(404).json({error: 'Rota não encontrada'})
})

app.listen(port , ()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})