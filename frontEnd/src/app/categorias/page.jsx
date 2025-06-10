'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import './blogs.css';
import { Poppins } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CardNoticia from "@/components/cardNoticia/cardNoticia";
import Sugo from 'next/font/local';

const Sugofont = Sugo({
    src: '/../fonts/Sugo.ttf',
});

import 'swiper/css';
import 'swiper/css/pagination';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function BlogHome() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3200/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <section className="selecao-categorias text-center mb-5">
        <h1 className="titulo-categorias">SOBRE O QUE VOCÊ QUER LER HOJE?</h1>

        <div className="categoriasBlog d-flex justify-content-center flex-wrap gap-4 mt-4">
          <Link href="/categorias/educacao" className="categoria-item text-decoration-none">
            <img src="/categoriaEducação.png" className="categoria-img" alt="Cursos" />
            <p className="categoria-label amarelo">Educação</p>
          </Link>

          <Link href="/categorias/tecnologia" className="categoria-item  text-decoration-none">
            <img src="/categoriaTecnologia.png" className="categoria-img" alt="Em Alta" />
            <p className="categoria-label lilas">Tecnologia</p>
          </Link>

          <Link href="/categorias/esportes" className="categoria-item text-decoration-none">
            <img src="/categoriaEsportes.png" className="categoria-img" alt="Recentes" />
            <p className="categoria-label amarelo">Esportes</p>
          </Link>

          <Link href="/categorias/cultura" className="categoria-item text-decoration-none">
            <img src="/categoriaCultura.png" className="categoria-img" alt="Esportes" />
            <p className="categoria-label lilas">Cultura</p>
          </Link>
        </div>
      </section>

      {/* Seção do Carrossel */}
      <section className="blog-carousel-section mb-5">
        <div className="container">
          <h2 className={`${Sugofont.className} maisRecentes mb-5`}>VEJA OS BLOGS MAIS RESCENTES</h2>


          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="blog-swiper"
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              
              992: {
                slidesPerView: 3,
              }
            }}
          >
         
              {blogs.map((blog, index) => (
                <SwiperSlide key={index}>

                  <CardNoticia
                    titulo={blog.titulo}
                    imagem={blog.imagem1}
                    conteudo={blog.conteudo}
                    data_publicacao={blog.data_publicacao}
                    id={blog.id}
                  />



                </SwiperSlide>

              ))}
          
          </Swiper>

        </div >
      </section >
    </>
  );
}