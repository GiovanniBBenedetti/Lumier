"use client"
 
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});

 
import "./Loading.css"
 
export default function Loading() {
    return (
        <>
            <div className={`container-fluid`}>
                <div className="row d-flex justify-content-center divLoadingBooks">
                    <div className="col-9">
                        <div className="loadingImg">
                            <DotLottieReact
                                src="https://lottie.host/a19648b8-5417-4c5e-bc5d-7a3f9025a9bc/9kGNrS19Lx.lottie"
                                loop
                                autoplay
                                className='imgLoading'
                            />
                        </div>
                        <div className={`${poppins.className} loadingTexto`}>
                            <h1 className='Sugo'>AGUARDE UM INSTANTE</h1>
                            <p className='PoppinsBold'>Carregando seu universo escolar...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};