"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
    const [noticias, setNoticias] = useState('')
    async function get() {
        const response = await axios.get(`http://localhost:3000/admin/estudantes`)
        setNoticias(response.data)
    }
    useEffect(() => {
        get()
    }, [])


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
                                        {item.texto}
                                    </p>
                                    <p>
                                        {item.usuario}
                                    </p>
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