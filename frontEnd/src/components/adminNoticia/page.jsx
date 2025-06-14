"use client"
import Link from 'next/link';
import Sugo from 'next/font/local';
const Sugofont = Sugo({
    src: '../fonts/Sugo.ttf',
});

export default function adminNoticia({ titulo, imagem, conteudo, id }) {
    return (
        <div className="rounded-5 p-4 card2 col-4">
            <div className='row gap-4 align-items-center'>
                <h1 className={`m-0  card-title text-center ${Sugofont.className}  `}>{titulo}</h1>
            </div>
            <div className="blog-image mt-2">
                <img
                    src={`http://localhost:3200${imagem}`}
                />
            </div>
            <h5 className='poppin cardConteudo text-break'>{conteudo.length > 120 ? conteudo.substring(0, 120) + '...' : conteudo}</h5>
            <Link className='text-decoration-none poppin' href={`admin/noticia/${id}`}>
                <button type="submit" className="btnAdm w-100 rounded-5 publicar mt-4">Saiba mais</button>
            </Link>
        </div>
    )
}