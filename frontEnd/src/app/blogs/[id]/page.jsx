

export default async function DetalhesBlog({ params }) {
    const { id } = await params;



 

    const response = await fetch(`http://localhost:3200/blog/${id}`);
    const data = await response.json();


    const commentsRes = await fetch(`http://localhost:3200/comentariosBlog/${id}`);
    const comments = await commentsRes.json();






    return (
        <div className="container">
            <h1>{data.titulo}</h1>
            <div className="container-imagem">

                <img className="" src={`http://localhost:3200${data.imagem1}`} />
            </div>
            <div className="descricao">
                <p>{data.conteudo}</p>
            </div>

            <div className="comentarios">
                <h2>Comentários dos leitores</h2>

            


                {comments.length > 0 ? (
                    comments.map((comentario) => (
                        <div key={comentario.id} className="comentario">
                            <strong>{comentario.user_name}:</strong> {comentario.comentario}
                        </div>
                    ))
                ) : (
                    <p>Nenhum comentario neste blog</p>
                )}
            </div>
        </div>
    );
}