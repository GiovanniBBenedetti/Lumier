'use client';

import { useEffect, useState } from 'react';
import '../categorias.css';
import Sugo from 'next/font/local';
import CardNoticia from '@/components/cardNoticia/cardNoticia';

const Sugofont = Sugo({
  src: '../../fonts/Sugo.ttf',
});

export default function EsportesPage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(6); // Exibe inicialmente 6

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const res = await fetch('http://localhost:3200/blog');
        const data = await res.json();
        const esportesNoticias = data.filter(noticia => noticia.tipo === 'esportes');
        setNoticias(esportesNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, []);

  const handleVerMais = () => setQuantidadeVisivel(prev => prev + 3);

  if (loading) {
    return <p className="text-center my-5">Carregando notícias de esportes...</p>;
  }

  if (noticias.length === 0) {
    return <p className="text-center my-5">Nenhuma notícia de esportes encontrada.</p>;
  }

  return (
    <>
      <style>{`body { background-color: var(--cor4)!important; }`}</style>

      <div className='bannerNoticias container mb-5'>
        <img src="/esportesCategorias.png" className="w-100" alt="Banner Esportes" />
      </div>

      <div className='categoriaNoticias py-5'>
        <div className="container py-3">
          <div className='títuloCategoria'>
            <h1 className={`${Sugofont.className}`}>CADA TREINO É UM PASSO MAIS PERTO DA VITÓRIA</h1>
          </div>

          <div className="row">
            {noticias.slice(0, quantidadeVisivel).map((noticia) => (
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

          {quantidadeVisivel < noticias.length && (
            <div className="text-center mt-4">
              <button onClick={handleVerMais} className="btn-Vermais">
                Ver mais
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
