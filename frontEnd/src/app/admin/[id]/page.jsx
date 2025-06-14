import Botao from '../../../components/recomendacaoAuto/page';
import { Poppins } from 'next/font/google';
import './detalhesBlog.css'
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default async function DetalhesRecomendacao({ params }) {
  const { id } = params;

  const response = await fetch(`http://localhost:3200/blog/recomendacaoEstado/${id}`);
  const data = await response.json();

  return (
    <div className={`container detalhes-blog-page ${poppins.className}`}>
      <div className="blog-container">
        <h1 className={`blog-title ${poppins.className}`}>
          {data[0].titulo.toUpperCase()}
        </h1>
        <div className="blog-meta">
          <p className="d-flex align-items-center gap-2">
            <i className="bi bi-person-circle"></i>
            Escrito por <strong>{data[0].autor}</strong>
          </p>
          <p className={`blog-date ${poppins.className}`}>
            PUBLICADO EM {new Date(data[0].data_publicacao).toLocaleDateString('pt-BR')}
          </p>
        </div>

        {data[0].imagem1 && (
          <div className="blog-image">
            <img
              src={`http://localhost:3200${data[0].imagem1}`}
              alt={data[0].titulo}
            />
          </div>
        )}

        <div className="blog-content">
          {data[0].conteudo.split('\n').map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>

          <div className="bo">
                                            <Botao blog={data[0]}></Botao>
                                        </div>
      </div>
    </div>
  );
}
