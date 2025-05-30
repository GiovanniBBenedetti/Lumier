"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
export default function Home() {
    const [token, setToken] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [dataCriacao, setData] = useState('')
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
            setBlogs(response.data.blog)
            if (response.data.blog == '') {
                setBlogs('')
            }
            setUsuario(response.data.nome)
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleAtualizar = async (e) => {
        e.preventDefault();
        try {
            axios.get(`http://localhost:3000/auth/${email}`)
                .then(res => setData(res.data.usuario.dataCriacao))
            const response = await axios.put(`http://localhost:3000/auth/${email}`,
                { nome, email, senha, dataCriacao },
                { headers: { "Authorization": `Bearer ${token}` } })
        } catch (err) {
            alert('Login falhou, senha ou email estão incorretos ')
            console.log(err)
        }
    }
    return (
        <div className="d-flex flex-column">
            <form className="m-5" onSubmit={handleAtualizar}>
                <div >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        placeholder="email"
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        placeholder="senha"
                        onChange={e => setSenha(e.target.value)}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                    <input
                        placeholder="data"
                        onChange={e => setData(e.target.value)}
                        type="hidden"
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>
                <div >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Nome
                    </label>
                    <input
                        placeholder="nome"
                        onChange={e => setNome(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>

        </div>
    );
}