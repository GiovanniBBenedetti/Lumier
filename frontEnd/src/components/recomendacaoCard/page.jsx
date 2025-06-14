import '@/components/cardNoticia/cardNoticia.css';
import Link from 'next/link';

export default function CardNoticia({ titulo, imagem, conteudo, data_publicacao, id, autor}) {

    const handleDelete = async (id) => {
        try {
            console.log("DAFDFSDFSD")
            const res = await fetch(`http://localhost:3200/blog/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                alert('✅ Blog exluido com sucesso!');
                window.location.href = '/admin';
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="custom-card">
            <h5 className="tituloRecomendação">
                {titulo.length > 80 ? titulo.substring(0, 80) + '...' : titulo}
            </h5>


            <div className="img-container">
                <img
                    src={`http://localhost:3200${imagem}`}
                    className="img-fluid"
                    alt={titulo}
                />
            </div>

            <p className="descricao">
                {conteudo.length > 120 ? conteudo.substring(0, 120) + '...' : conteudo}
            </p>
            {autor
                ? (
                    <>
                        <p className="descricao">
                            Enviado por: {autor}
                        </p>
                    </>
                ) : (
                    <></>
                )}


            <div className="footerCard">
                <p className="data-publicacao mb-0">
                    PUBLICADO {new Date(data_publicacao).toLocaleDateString("pt-BR")}
                </p>

                {autor
                    ? (
                        <>
                            <Link href={`/admin/${id}`} className="btn-saiba-mais">
                                Saiba mais
                            </Link>
                        </>
                    )
                    : (
                        <>
                            <button onClick={() => { handleDelete(id) }} className="btn-saiba-mais">
                                Excluir
                            </button>
                        </>
                    )}
            </div>
        </div>
    );
}
