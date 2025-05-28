'use client'
import { useState } from "react"

export default function Adicionar() {

    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [imagem1, setImagem1] = useState("")
    const [imagem2, setImagem2] = useState("")
    const [imagem3, setImagem3] = useState("")
    const [autor, setAutor] = useState("")
    const [idParaRemover, setIdParaRemover] = useState("")
    const [blog,setBlog] = useState()
     const token = localStorage.getItem('token')


    const handleAdicionar = async (e) => {
        e.preventDefault()

   
        if (!token) {
            alert("Token não encontrado.")
            return
        }

        try {
            const response = await fetch(`http://localhost:3200/blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    titulo,
                    conteudo,
                    autor,
                    imagem1,
                    imagem2,
                    imagem3,
                
                })
            })

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados.")
            }

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
            alert('Erro ao remover publicação' )
        }

    }


    return (
        <>
            <form id="blogForm" onSubmit={handleAdicionar}>
                <label htmlFor="titulo">Título:</label>
                <input type="text" id="titulo" name="titulo" onChange={e => setTitulo(e.target.value)} />

                <label htmlFor="conteudo">Conteúdo:</label>
                <input type="text" id="conteudo" name="conteudo" onChange={e => setConteudo(e.target.value)} />

                <label htmlFor="autor">Autor:</label>
                <input type="text" id="autor" name="autor" onChange={e => setAutor(e.target.value)} />

                <label htmlFor="Imagem1">Imagem 1:</label>
                <input type="text" id="Imagem1" name="Imagem1" onChange={e => setImagem1(e.target.value)} />

                <label htmlFor="Imagem2">Imagem 2:</label>
                <input type="text" id="Imagem2" name="Imagem2" onChange={e => setImagem2(e.target.value)} />

                <label htmlFor="Imagem3">Imagem 3:</label>
                <input type="text" id="Imagem3" name="Imagem3" onChange={e => setImagem3(e.target.value)} />

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
