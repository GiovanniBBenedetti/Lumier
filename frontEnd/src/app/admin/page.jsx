"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    const [noticias, setNoticias] = useState('')
    const [token, setToken] = useState('')
    const [usuario, setUsuario] = useState('')
    const [tipo, setTipo] = useState('')
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
            setTipo(response.data.tipo)
            setUsuario(response.data.usuario)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function get() {
        try {
            if (usuario) {
                const response = await axios.get(`http://localhost:3000/admin/estudantes`, { headers: { "Authorization": `Bearer ${token}` } })
                setNoticias(response.data)
            }
        }
        catch (err) {

        }

    }
    useEffect(() => {
        get()
    }, [usuario])
    async function handleClick(noticia) {
        axios.post(`http://localhost:3000/admin/estudantes`, { noticia })
        setTimeout(() => {
            get()
        }, 100)
    }

    async function handleRejection(noticia) {
        axios.post(`http://localhost:3000/admin/estudantesRejeitar`, { noticia })
        setTimeout(() => {
            get()
        }, 100)
    }
    // useEffect(() => {
    //     if(tipo){
    //         if (tipo != 'admin') {
    //             redirect('/forbidden')
    //         }
    //     }
    // }, [tipo])


    return (
        <div className="d-flex flex-column">
            {noticias ? (
                <>
                    {noticias.map((item, index) => {
                        if (item.autorizacao == 'Aguardando') {
                            return (
                                <div className="card w-50 my-5 mx-auto" key={index}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
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
                    })}
                </>
            )
                : (
                    <>
                    </>
                )
            }
        </div>
    );
}