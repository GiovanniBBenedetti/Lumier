"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    const [noticias, setNoticias] = useState('')
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
            setUsuario(response.data.usuario)
        }
        catch (err) {
            console.log(token)
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

    async function handleClick(noticiaId, titulo, conteudo, autor, imagem1, imagem2, imagem3) {
        axios.post(`http://localhost:3000/admin/estudantes`, {
            noticiaId: noticiaId,
            titulo: titulo,
            conteudo: conteudo,
            autor: autor,
            imagem1: imagem1,
            imagem2: imagem2,
            imagem3: imagem3,
        }, { headers: { "Authorization": `Bearer ${token}` } })
        console.log(imagem2)
    }


    return (
        <div className="d-flex flex-column">
            {noticias ? (
                <>
                    {noticias.map((item, index) => {
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
                                    <button onClick={() => handleClick({ noticiaId: item.id }, { titulo: item.titulo }, { conteudo: item.conteudo }, { autor: item.autor }, { imagem1: item.imagem1 }, { imagem2: item.imagem2 }, { imagem3: item.imagem3 })} type="button" className="btn btn-secondary">Aprovar</button>
                                </div>
                            </div>
                        )
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