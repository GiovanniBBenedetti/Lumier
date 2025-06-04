"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from 'next/link'
import Image from "next/image"

export default function Home() {
    const [authorized, setAuthorized] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [token, setToken] = useState('')
    const [blogs, setBlogs] = useState('')
    const [nome, setNome] = useState('')
    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [imagem, setImagem] = useState('')

    useEffect(() => {
        const t = localStorage.getItem('token');
        setToken(t);

        fetch('http://localhost:3000/comum', {
            headers: { Authorization: `Bearer ${t}` }
        })
            .then(async (res) => {
                if (res.status === 401) {
                    window.location.href = '/login';
                } else {
                    const data = await res.json();
                    setAuthorized(true);
                    if (data.blog == '') {
                        setBlogs('')
                    } else {
                        setBlogs(data.blog);
                    }
                    setNome(data.nome)
                }
            })
            .catch((err) => {
                window.location.href = '/login';
            });
    }, []);

    const handleAdicionar = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('Token não encontrado. Faça login novamente.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('conteudo', conteudo);
            if (imagem) formData.append('imagem', imagem);

            const response = await fetch('http://localhost:3000/comum', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();
            alert('Publicação adicionada com sucesso!');

            setTitulo('');
            setConteudo('');
            setImagem(null);

            fetch('http://localhost:3000/comum', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(async (res) => {
                    if (res.status === 401) {
                        window.location.href = '/login';
                    } else {
                        const data = await res.json();
                        setAuthorized(true);
                        if (data.blog == '') {
                            setBlogs('')
                        } else {
                            setBlogs(data.blog);
                        }
                        setNome(data.nome)
                    }
                })
                .catch((err) => {
                    window.location.href = '/login';
                });
        } catch (err) {
            alert('Erro ao adicionar publicação: ' + err.message);
        }
    };
    return (
        <div className="d-flex flex-column">
            <div className="text-center">
                <h1>{nome}</h1>
            </div>
            <form className="m-5" onSubmit={handleAdicionar} encType="multipart/form-data">
                <div >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Título
                    </label>
                    <input
                        placeholder="Titulo"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        type="text"
                        className="form-control"
                        id="titulo"
                        name="titulo"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Conteúdo
                    </label>
                    <input
                        placeholder="Conteudo"
                        value={conteudo}
                        onChange={e => setConteudo(e.target.value)}
                        className="form-control"
                        type="text"
                        id="conteudo"
                        name="conteudo"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        id="imagem1"
                        name="imagem1"
                        accept="image/*"
                        onChange={e => setImagem(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            <h2 className="text-center">Sua notícias</h2>
            {blogs ? (
                <>
                    {blogs.map((item, index) => {
                        return (
                            <div key={index} className="card m-5">
                                <div className="card-body">
                                    <img className="w-100" src={`http://localhost:3000${item.imagem1}`} />
                                    <h5 className="card-title">{item.titulo}</h5>
                                    <p className="card-text">
                                        {item.conteudo}
                                    </p>
                                    <p className="card-text">
                                        Estado: {item.autorizacao}
                                    </p>
                                </div>
                            </div>
                        )

                    })}
                </>
            )
                : (
                    <>
                        <div className="w-100 text-center">
                            <p>Não há nada aqui</p>
                        </div>

                    </>
                )
            }
        </div>
    );
}