'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import './SliderCategorias.css';
import 'swiper/css/pagination';

export default function SliderCategorias() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={0}
      centeredSlides={true}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="Swiper swiperTour"
      breakpoints={{
        0: { slidesPerView: 1 },
        480: { slidesPerView: 1 },
        640: { slidesPerView: 2.2 },
        768: { slidesPerView: 2.5 },
        992: { slidesPerView: 3.5 },
        1200: { slidesPerView: 4 },
      }}
    >
      {/* Eventos */}
      <SwiperSlide>
        <Link href="#eventos" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/eventos.png" className="img-fluid rounded-start" alt="eventos" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/eventosImg.png" className="img-fluid rounded-start" alt="eventos" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>

      {/* Cultura */}
      <SwiperSlide>
        <Link href="/categorias/cultura" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/cultura.png" className="img-fluid rounded-start" alt="cultura" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/culturaImg.png" className="img-fluid rounded-start" alt="cultura" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>

      {/* Esporte */}
      <SwiperSlide>
        <Link href="/categorias/esporte" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/esporte.png" className="img-fluid rounded-start" alt="esporte" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/esporteImg.png" className="img-fluid rounded-start" alt="esporte" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>

      {/* Cursos */}
      <SwiperSlide>
        <Link href="/categorias/cursos" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/cursos.png" className="img-fluid rounded-start" alt="cursos" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/cursosImg.png" className="img-fluid rounded-start" alt="cursos" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>

      {/* Espaço */}
      <SwiperSlide>
        <Link href="#espacos" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/espaco.png" className="img-fluid rounded-start" alt="espaço" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/espacoImg.png" className="img-fluid rounded-start" alt="espaço" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>

      {/* Genéricas */}
      <SwiperSlide>
        <Link href="/categorias/genericas" className="text-decoration-none">
          <div className="card mb-3 cardSwiperCategorias">
            <div className="row g-0 centralizar">
              <div className="col-2 col-md-2">
                <img src="./Categorias/genericas.png" className="img-fluid rounded-start" alt="genéricas" />
              </div>
              <div className="col-10 col-md-10">
                <div className="card-body cardBodyCategorias">
                  <div className="botaoCategoriasCard">
                    <button>Saiba mais</button>
                    <img src="./Elementos/seta.png" className="img-fluid setaHome" alt="seta" />
                  </div>
                  <div className="infosImg">
                    <p className="card-text">Descrição sobre o tópico cultura, esporte, eventos, cursos, entre outros bem nessa área.</p>
                    <img src="./Categorias/genericasImg.png" className="img-fluid rounded-start" alt="genéricas" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
