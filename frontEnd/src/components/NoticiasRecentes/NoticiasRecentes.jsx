'use client'

import { useState, useEffect } from "react";
import "./NoticiasRecentes.css";
import CardHome from "../CardHome/CardHome";

export default function NoticiasRecentes() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3200/blog")
      .then((res) => res.json())
      .then((data) => {
        // Ordenar da notícia mais recente para a mais antiga
        const noticiasOrdenadas = data.sort((a, b) => new Date(b.data) - new Date(a.data));
        setBlogs(noticiasOrdenadas);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container-fluid">
      <div className="row noticiasRecentesDiv d-flex">
        <div className="col-5">
          <div className="tituloNoticiasRecentes d-flex">
            <div className="linhaVerticalNoticiasRecentes"></div>
            <h1 className="Sugo">NOTÍCIAS MAIS RECENTES</h1>
          </div>
          <img
            src="./Imagens/celularNoticias.png"
            className="img-fluid imgCelularNoticiasRecentes"
            alt="notícias"
          />
        </div>

        <div className="col-6 divDireitaNoticiasRecentes">
          <h1 className="Agrandir newsNoticiasRecentes">NEWS</h1>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
            {blogs.slice(0, 5).map((blog, index) => (

                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={blog.id || index}
                >
                  <CardHome blog={blog} />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Próximo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
