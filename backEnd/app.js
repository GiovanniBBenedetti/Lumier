import express from 'express'
import authRotas from './routes/authRotas.js'
import comumRotas from './routes/comumRotas.js'
import adminRotas from './routes/adminRotas.js'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/auth', authRotas)
app.use('/comum', comumRotas)
app.use('/admin', adminRotas)

app.get('/', (req, res) => {
    res.status(200).send('HOME')
})

app.options('/', (req, res) => {
    res.setHeader('Allow', 'GET', 'OPTIONS')
    res.status(204).send()
})

app.use((req, res) => {
    res.status(404).json({Mensagem: "Rota não encontrada"})
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`)
})