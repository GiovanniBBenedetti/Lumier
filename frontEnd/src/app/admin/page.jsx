"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    const [authorized, setAuthorized] = useState(null);
    const [noticias, setNoticias] = useState('')
    const [token, setToken] = useState('')
    const [usuario, setUsuario] = useState('')
    const [tipo, setTipo] = useState('')

    useEffect(() => {
        const t = localStorage.getItem('token');
        setToken(t);

        fetch('http://localhost:3000/admin/estudantes', {
            headers: { Authorization: `Bearer ${t}` }
        })
            .then(async (res) => {
                if (res.status === 403 || res.status === 401) {
                    window.location.href = '/login';
                } else {
                    const data = await res.json();
                    setAuthorized(true);
                    setNoticias(data);
                }
            })
            .catch((err) => {
                window.location.href = '/login';
            });
    }, []);

    async function handleClick(noticia) {
        axios.post(`http://localhost:3000/admin/estudantes`, { noticia }, { headers: { "Authorization": `Bearer ${token}` } })
        setTimeout(() => {
            fetch('http://localhost:3000/admin/estudantes', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(async (res) => {
                    if (res.status === 403 || res.status === 401) {
                        window.location.href = '/login';
                    } else {
                        const data = await res.json();
                        setNoticias(data);
                    }
                })
                .catch((err) => {
                    window.location.href = '/login';
                });
        }, 100)
    }

    async function handleRejection(noticia) {
        fetch('http://localhost:3000/admin/estudantesRejeitar', {
            headers: { Authorization: `Bearer ${token}` }
        })
        setTimeout(() => {
            fetch('http://localhost:3000/admin/estudantes', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(async (res) => {
                    if (res.status === 403 || res.status === 401) {
                        window.location.href = '/login';
                    } else {
                        const data = await res.json();
                        setNoticias(data);
                    }
                })
                .catch((err) => {
                    window.location.href = '/login';
                });
        }, 100)
    }

    return (
        < div className="d-flex flex-column" >
            {
                noticias ? (
                    <>
                        {
                            noticias.map((item, index) => {
                                if (item.autorizacao == 'Aguardando') {
                                    return (
                                        <div className="card w-50 my-5 mx-auto" key={index}>
                                            <div className="card-body">
                                            <img className="card-img-top" src={`http://localhost:3000${item.imagem1}`} />
                                                <h5 className="card-title">{item.titulo}</h5>
                                                <p className="card-text">
                                                    {item.conteudo}
                                                </p>
                                                <p>
                                                    {item.autor}
                                                </p>
                                                <button onClick={() => handleClick({ item })} type="button" className="btn btn-secondary">Aprovar</button>
                                                <button onClick={() => handleRejection({ item })} type="button" className="btn btn-secondary">Rejeitar</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </>
                )
                    : (
                        <>
                        </>
                    )
            }
        </div >
    );
}