'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../categorias.css'
import Sugo from 'next/font/local';
import CardNoticia from '@/components/cardNoticia/cardNoticia';

const Sugofont = Sugo({
    src: '../../fonts/Sugo.ttf',
});


export default function CulturaPage() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNoticias() {
            try {
                const res = await fetch('http://localhost:3200/blog');
                const data = await res.json();
                const culturaNoticias = data.filter(noticia => noticia.tipo === 'cultura');
                setNoticias(culturaNoticias);
            } catch (error) {
                console.error('Erro ao carregar notícias:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchNoticias();
    }, []);

    if (loading) {
        return <p className="text-center my-5">Carregando notícias de cultura...</p>;
    }

    if (noticias.length === 0) {
        return <p className="text-center my-5">Nenhuma notícia de cultura encontrada.</p>;
    }

    return (
        <>
            <style>
                {`
body{
  background-color: var(--cor4)!important;
}`}
            </style>

            <div className='bannerNoticias container mb-5'>
                <img src="/culturaCategoria.jpg" className="w-100" alt="" />
            </div>








            <div className='categoriaNoticias py-5'>
                <div className="container py-3">
                    <div className='títuloCategoria'>
                        <h1 className={`${Sugofont.className}`}>O CONHECIMENTO CULTURAL QUE VOCÊ MERECE </h1>
                    </div>

                    <div className="row">
                        {noticias.map((noticia) => (
                            <div className="col-12 col-lg-4 mb-4" key={noticia.id}>
                                <CardNoticia
                                    titulo={noticia.titulo}
                                    imagem={noticia.imagem1}
                                    conteudo={noticia.conteudo}
                                    data_publicacao={noticia.data_publicacao}
                                    id={noticia.id}
                                />

                            </div>

                        ))}
                    </div>
                </div>
            </div>









        </>

    );
}
