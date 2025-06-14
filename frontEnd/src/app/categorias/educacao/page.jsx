'use client';

import { useEffect, useState } from 'react';
import '../categorias.css';
import Sugo from 'next/font/local';
import CardNoticia from '@/components/cardNoticia/cardNoticia';
import Loading from '@/components/loader/loader';

const Sugofont = Sugo({
  src: '../../fonts/Sugo.ttf',
});

export default function CulturaPage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantidadeVisivel, setQuantidadeVisivel] = useState(6); // Mostra 6 inicialmente

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const res = await fetch('http://localhost:3200/blog');
        const data = await res.json();
        const culturaNoticias = data.filter(noticia => noticia.tipo === 'educacao'); // ← categoria correta
        setNoticias(culturaNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticias();
  }, []);

  const handleVerMais = () => setQuantidadeVisivel(prev => prev + 3); // Mostra +3 a cada clique

  if (loading) {
    return <Loading></Loading>;
  }

  if (noticias.length === 0) {
    return <p className="text-center my-5">Nenhuma notícia de educação encontrada.</p>;
  }

  return (
    <>
      <style>{`body { background-color: var(--cor4)!important; }`}</style>

      <div className='bannerNoticias container mb-5'>
        <img src="/educacaoCategoria.png" className="w-100" alt="Banner Educação" />
      </div>

      <div className='categoriaNoticias py-5'>
        <div className="container py-3">
          <div className='títuloCategoria'>
            <h1 className={`${Sugofont.className}`}>
              EDUCAÇÃO TRANSFORMA PESSOAS. PESSOAS TRANSFORMAM O MUNDO
            </h1>
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
