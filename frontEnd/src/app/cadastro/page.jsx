"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
export default function Home() {
     useEffect(() => {
        axios.get(`http://localhost:3000/auth/${email}`)
    }, [])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleCadastro = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/auth/${email}`)
            const double = response.data
            if (double.double == false) {
                axios.post('http://localhost:3000/auth/cadastro', { email, senha, nome })
                alert('Usuário criado com sucesso')
            }
            else {
                alert('Já existe um usário com este email')
            }
        } catch (err) {
            alert('Login falhou, senha ou email estão incorretos ')
            console.log(err)
        }
    }
    return (
        <div className="d-flex flex-column">
            <form className="m-5" onSubmit={handleCadastro}>
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