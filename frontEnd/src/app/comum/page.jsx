"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from 'next/link'
import Image from "next/image"

export default function Home() {
    const [token, setToken] = useState('')
    const [usuario, setUsuario] = useState('')
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = localStorage.getItem("token");
            if (storage) {
                setToken(storage)
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            handleToken()
        }
    }, [token])

    async function handleToken() {
        try {
            const response = await axios.get(`http://localhost:3000/comum`,
                { headers: { "Authorization": `Bearer ${token}` } }
            )
        }
        catch (err) {
            console.log(err)
        }
    }

    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [imagem, setImagem] = useState('')
    const [imagem2, setImagem2] = useState('')
    const [imagem3, setImagem3] = useState('')

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3000/comum',
                {
                    titulo: titulo,
                    conteudo: conteudo,
                    imagem1: imagem,
                    imagem2: imagem2,
                    imagem3, imagem3
                },
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            alert('Notícia enviada com sucesso')
        } catch (err) {
            alert('Houve um erro ao enviar a notícia ')
            console.log(err)
        }
    }
    return (
        <div className="d-flex flex-column">
            {usuario
                ? (
                    // <>{usuario.map((item, index) => {
                    //     return(
                    //         <div key={index} className="d-flex flex-column">
                    //             <h5>{item.usuario}</h5>
                    //             <h5>{item.email}</h5>
                    //             <h5>{item.id}</h5>
                    //             <h5>{item.tipo}</h5>
                    //         </div>
                    //     )
                    // })}</>
                    console.log(usuario)
                )
                : (
                    <>null</>
                )}
            <form className="m-5" onSubmit={handleCadastro}>
                <div >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Título
                    </label>
                    <input
                        placeholder="Titulo"
                        onChange={e => setTitulo(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Conteúdo
                    </label>
                    <input
                        placeholder="Conteudo"
                        onChange={e => setConteudo(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Imagem1
                    </label>
                    <input
                        placeholder="Conteudo"
                        onChange={e => setImagem(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Imagem2
                    </label>
                    <input
                        placeholder="Conteudo"
                        onChange={e => setImagem2(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Imagem3
                    </label>
                    <input
                        placeholder="Conteudo"
                        onChange={e => setImagem3(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    );
}