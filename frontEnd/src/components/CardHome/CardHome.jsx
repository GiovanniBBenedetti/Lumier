import "./CardHome.css";
import Link from "next/link";

export default function CardHome({ blog }) {
    if (!blog) return null; // evita erro caso blog seja undefined

    return (
        <div className="card cardHome">
            <div className="tituloCard">
                <h1 className="Sugo">
                    {blog.titulo?.length > 30
                        ? blog.titulo.substring(0, 30) + "..."
                        : blog.titulo}
                </h1>
            </div>
            <div className="imgCard">
                <img
                    src={`http://localhost:3200${blog.imagem1}` || "./CardHome/reuniao.jpg"}
                    className="noticiaHome"
                    alt={blog.titulo || "Notícia"}
                />

            </div>
            <div className="textoCard">
                <p>{blog.conteudo.length > 120 ? blog.conteudo.substring(0, 120) + '...' : blog.conteudo}</p>

            </div>
            <div className="icons">
                <div className="score">
                    <p className="nota Agrandir">
                        {new Date(blog.data_publicacao).toLocaleDateString("pt-BR")}
                    </p>
                </div>
                <div className="botao d-flex">
                    <Link href={`/blog/${blog.id}`} className="button">
                        Ver mais!
                    </Link>
                    <img src="./CardHome/seta.png" className="seta" alt="seta" />
                </div>
            </div>
        </div>
    );
}
