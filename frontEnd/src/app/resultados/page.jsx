'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './resultados.css'
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});



import Link from 'next/link';
import Loader from '@/components/loader/loader';
import CardNoticia from '@/components/cardNoticia/cardNoticia';

export default function BuscaBlogs() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [blogsFiltrados, setBlogsFiltrados] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:3200/blog');
        const data = await res.json();

        setBlogs(data);
        const filtrados = data.filter(blog => {
          const tituloMatch = blog.titulo.toLowerCase().includes(query);
          const tipoMatch = blog.tipo?.toLowerCase().includes(query);
          const tagsMatch = blog.tags?.toLowerCase().includes(query);
          return tituloMatch || tipoMatch || tagsMatch;
        });

        setBlogsFiltrados(filtrados);
      } catch (err) {
        console.error('Erro ao buscar blogs:', err);
        setBlogs([]);
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
          body {
            background-color: var(--cor1)!important;
          }
        `}
      </style>

      <div className="container py-5">
      {isLoading ? (
  <Loader />
) : blogsFiltrados.length === 0 ? (
  <div className={`text-center semBusca mt-5 ${poppins.className}`}>
    <img src="/semBusca.png" alt="Sem resultados"  />
    <h2 className="mt-4 text-muted">Nenhum resultado encontrado para <strong>"{query}"</strong></h2>
    <p className="text-secondary">Tente buscar por outra palavra-chave ou verifique se há erros de digitação.</p>
    <Link href="/" className="btn btn-outline-secondary mt-3 px-4">
      Voltar para a página inicial
    </Link>
  </div>
) : (
  <>
    <h1 className={`mb-4 ${poppins.className}`}>Resultados da busca</h1>
    <p className="mb-5">
      Exibindo resultados para: <strong className="text-primary">{query}</strong>
    </p>

    <div className="row animate__animated animate__fadeIn">
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
