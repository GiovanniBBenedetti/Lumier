import './cardNoticia.css';
import Link from 'next/link';

export default function CardNoticia({ titulo, imagem, conteudo, data_publicacao, id }) {
    return (
        <div className="custom-card">
            <h5 className="tituloCard">
                {titulo.length > 20 ? titulo.substring(0, 30) + '...' : titulo}
            </h5>


            <div className="img-container">
             {imagem ? (
  <img
    src={`http://localhost:3200${imagem}`}
    className="img-fluid"
    alt={titulo}
  />
) : (
  <div className="img-placeholder">Imagem não disponível</div>
)}

            </div>

            <p className="descricao">
                {conteudo.length > 120 ? conteudo.substring(0, 120) + '...' : conteudo}
            </p>

            <div className="footerCard">
                <p className="data-publicacao mb-0">
                    PUBLICADO {new Date(data_publicacao).toLocaleDateString("pt-BR")}
                </p>

                <Link href={`/blogs/${id}`} className="btn-saiba-mais">
                    Saiba mais
                </Link>
            </div>
        </div>
    );
}
