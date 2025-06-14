'use client';

import React from 'react';
import './Categorias.css';
import SliderCategorias from '../SliderCategorias/SliderCategorias';

export default function Categorias() {
  return (
    <div className="container-fluid divCategorias">
      <div className="row divCategoriasTitulos">
        <div className="col-md-7 col-sm-7">
          <img className="img-fluid" src="/Logos/logoDois.png" alt="logo" />
        </div>
        <div className="col-md-4 col-sm-4 titulosDireitaCategorias">
          <h1 className="Agrandir newsCategoria">NEWS</h1>
          <div className="botaoCategorias">
            <button>Ver notícias</button>
            <img src="./Elementos/seta.png" className="img-fluid setaCategorias" alt="seta" />
          </div>
        </div>
      </div>
      <div className="row rowSlider">
        <SliderCategorias />
      </div>
    </div>
  );
}