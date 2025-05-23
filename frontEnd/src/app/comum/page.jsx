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

    useEffect(()=>{
        if(token){
            handleToken()
        }
    }, [token])
    async function handleToken() {
        try{
            const response = await axios.get(`http://localhost:3000/comum`,
                { headers: { "Authorization": `Bearer ${token}` } }
            )
            setUsuario(response.data.usuario)
           
        }
        catch(err){
            console.log(token)
        }
    }
    
    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [email, setEmail] = useState('')
    const [foto, setFoto] = useState('')

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:3000/comum',
                {
                    titulo: titulo,
                    conteudo: conteudo,
                    email: email,
                    foto: foto
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
                    <>{usuario}</>
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
                    <input
                        value={"arthuryozhiyoka@gmail.com"}
                        onChange={e => setEmail(e.target.value)}
                        type="hidden"
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