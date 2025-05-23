
'use client'
import { useState, useEffect } from "react"

export default function Adicionar() {

    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [imagem1, setImagem1] = useState("")
    const [imagem2, setImagem2] = useState("")
    const [imagem3, setImagem3] = useState("")
    const [autor, setAutor] = useState("")

  

    const handleAdicionar = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        if (!token) {
            alert("Token não encontrado.");
            return;
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
                    imagem1,
                    imagem2,
                    imagem3,
                    autor
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados.");
            }

            alert("Publicação adicionada com sucesso!");
        } catch (err) {
            alert('Erro ao adicionar publicação: ' + err.message);
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
        </>
    )
}
