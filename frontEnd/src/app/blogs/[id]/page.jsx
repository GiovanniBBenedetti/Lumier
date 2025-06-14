import { Poppins } from 'next/font/google';
import './detalhesBlog.css';
import ComentariosBlog from '@/components/comentarios/comentarios';
import BlogPlayer from '@/components/BlogPlayer/BlogPlayer';
import Sugo from 'next/font/local';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});

const Sugofont = Sugo({
    src: '../../fonts/Sugo.ttf',
});

export default async function DetalhesBlog({ params }) {
    const { id } = await params;

    const response = await fetch(`http://localhost:3200/blog/${id}`);
    const data = await response.json()
    return (
        <>
            <div className={`container detalhes-blog-page ${poppins.className}`}>
                <div className="blog-container">

                    <h1 className={`blog-title ${poppins.className}`}>
                        {data.titulo.toUpperCase()}
                    </h1>
                    <div className="blog-meta">
                        <p className="d-flex align-items-center gap-2">
                            <i className="bi bi-person-circle"></i>
                            Escrito por {data.autor}
                        </p>
                        <p className={`blog-date ${poppins.className}`}>
                            PUBLICADO EM {new Date(data.data_publicacao).toLocaleDateString('pt-BR')}
                        </p>
                    </div>


                    {data.imagem1 && (
                        <div className="blog-image">
                            <img
                                src={`http://localhost:3200${data.imagem1}`}
                                alt={data.titulo}
                            />
                        </div>
                    )}

                    <div className="blog-player">
                        <BlogPlayer texto={data.conteudo} />
                    </div>

                    <div className="blog-content">
                        {data.conteudo.split('\n').map((paragrafo, i) => (
                            <p key={i}>{paragrafo}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="comentarios">
                <div className="container">
                    <h2 className={` tituloComentario ${Sugofont.className}`}>DEIXE UM COMENTÁRIO AQUI !</h2>
                    <ComentariosBlog id={params.id} />
                </div>
            </div>
        </>
    );
}
