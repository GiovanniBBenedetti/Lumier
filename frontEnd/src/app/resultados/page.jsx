'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/components/loader/loader';
import CardNoticia from '@/components/cardNoticia/cardNoticia';



export default function BuscaBlogs() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [blogsFiltrados, setBlogsFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:3200/blog');
        const data = await res.json();

        const filtrados = data.filter(blog => {
          const tituloMatch = blog.titulo.toLowerCase().includes(query);
          const tipoMatch = blog.tipo?.toLowerCase().includes(query);
          const tagsMatch = blog.tags?.toLowerCase().includes(query);
          return tituloMatch || tipoMatch || tagsMatch;
        });

        setBlogsFiltrados(filtrados);
      } catch (err) {
        console.error('Erro ao buscar blogs:', err);
        setBlogsFiltrados([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, [query]);

  return (
    <>
           <style>
          {`
    body{
      background-color: var(--cor1)!important;
    }`}
        </style>
   
    <div className="container py-5">
      {isLoading ? (
        <Loader />
      ) : blogsFiltrados.length === 0 ? (
        <div className="text-center mt-5">
          <h2>Nenhum resultado encontrado para "{query}"</h2>
          <Link href="/" className="btn btn-danger mt-3">Voltar</Link>
        </div>
      ) : (
        <>
          <h1 className="mb-4">Resultados da busca</h1>
          <p className="mb-5">Resultados encontrados para: <strong>{query}</strong></p>

          <div className="row">
            {blogsFiltrados.map(blog => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={blog.id}>
                       <CardNoticia
                                    titulo={blog.titulo}
                                    imagem={blog.imagem1}
                                    conteudo={blog.conteudo}
                                    data_publicacao={blog.data_publicacao}
                                    id={blog.id}
                                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
     </>
  );
}