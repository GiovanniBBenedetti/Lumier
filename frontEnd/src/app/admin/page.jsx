'use client'
import { useState, useEffect } from "react"

export default function Adicionar() {
    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [imagem1, setImagem1] = useState(null)
    const [autor, setAutor] = useState("")
    const [idParaRemover, setIdParaRemover] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    const handleAdicionar = async (e) => {
        e.preventDefault()

        if (!token) {
            alert("Token não encontrado.")
            return
        }

        try {
            const formData = new FormData()
            formData.append("titulo", titulo)
            formData.append("conteudo", conteudo)
            formData.append("autor", autor)
            if (imagem1) formData.append("imagem1", imagem1)

            const response = await fetch(`http://localhost:3200/blog`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

        

            alert("Publicação adicionada com sucesso!")
        } catch (err) {
            alert('Erro ao adicionar publicação: ' + err.message)
        }
    }

    const handleRemover = async () => {
        if (!token) {
            alert("Token não encontrado.")
            return
        }

        if (!idParaRemover) {
            alert("Digite um ID para remover.")
            return
        }

        try {
            const response = await fetch(`http://localhost:3200/blog/${idParaRemover}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Erro ao remover publicação.")
            }

            alert("Publicação removida com sucesso!")
            setIdParaRemover("")
        } catch (err) {
            alert('Erro ao remover publicação')
        }
    }

    return (
        <>
            <form id="blogForm" onSubmit={handleAdicionar} encType="multipart/form-data">
                <label htmlFor="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" onChange={e => setTitulo(e.target.value)} />

                <label htmlFor="conteudo">Conteúdo:</label>
                <input type="text" id="conteudo" name="conteudo" onChange={e => setConteudo(e.target.value)} />

                <label htmlFor="autor">Autor:</label>
                <input type="text" id="autor" name="autor" onChange={e => setAutor(e.target.value)} />

                <label htmlFor="imagem1">Imagem:</label>
                <input
                    type="file"
                    id="imagem1"
                    name="imagem1"
                    accept="image/*"
                    onChange={e => setImagem1(e.target.files[0])}
                />

                <button type="submit">Adicionar Livro</button>
            </form>

            <hr />

            <div>
                <h3>Remover publicação</h3>
                <label htmlFor="idRemover">ID da publicação:</label>
                <input
                    type="text"
                    id="idRemover"
                    value={idParaRemover}
                    onChange={e => setIdParaRemover(e.target.value)}
                />
                <button onClick={handleRemover}>Remover por ID</button>
            </div>
        </>
    )
}
