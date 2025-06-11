'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CardTour from '../CardTour/CardTour';

import './SliderTour.css';
import 'swiper/css/pagination';
import 'swiper/css';

export default function SliderTour() {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={3}
            centeredSlides={true}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="Swiper swiperTour"
        >

            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
            <SwiperSlide>
                <CardTour></CardTour>
            </SwiperSlide>
        </Swiper>
    );
}