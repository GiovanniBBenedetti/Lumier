'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderCategorias.css'

export default function SliderProdutos() {
    const produtos = [
        { id: 1, nome: 'Guitarra Elétrica', preco: 'R$ 1.200', img: 'https://source.unsplash.com/300x300/?guitar' },
        { id: 2, nome: 'Teclado', preco: 'R$ 950', img: 'https://source.unsplash.com/300x300/?keyboard' },
        { id: 3, nome: 'Microfone', preco: 'R$ 450', img: 'https://source.unsplash.com/300x300/?microphone' },
        { id: 4, nome: 'Fone de Ouvido', preco: 'R$ 300', img: 'https://source.unsplash.com/300x300/?headphones' },
        { id: 5, nome: 'Bateria', preco: 'R$ 2.000', img: 'https://source.unsplash.com/300x300/?drums' },
        { id: 6, nome: 'Amplificador', preco: 'R$ 1.500', img: 'https://source.unsplash.com/300x300/?amplifier' }
    ];

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="produto-swiper"
            breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 10 },
                480: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 }
            }}
        >
            {produtos.map((produto) => (
                <SwiperSlide key={produto.id}>
                    <div className="produto-card">
                        <img src={produto.img} alt={produto.nome} className="produto-img" />
                        <h5>{produto.nome}</h5>
                        <p className="preco">{produto.preco}</p>
                        <button className="btn-comprar">Comprar</button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
