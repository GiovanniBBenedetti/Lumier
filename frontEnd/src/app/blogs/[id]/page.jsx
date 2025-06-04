import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});


export default async function DetalhesBlog({ params }) {
    
    const { id } = await params;



 

    const response = await fetch(`http://localhost:3200/blog/${id}`);
    const data = await response.json()

    console.log(data)
    const commentsRes = await fetch(`http://localhost:3200/comentariosBlog/${id}`);
    const comments = await commentsRes.json();






    return (
        <div className="container">
            <h1 className={`${poppins.className}`}>{data.titulo}</h1>
            <p className='m-0'>Por: {data.autor}</p>
            <p>{new Date(data.data_publicacao).toLocaleString("pt-BR")}</p>
            <p></p>
            <div className="container-imagem">
                <img className="w-100" src={`http://localhost:3200${data.imagem1}`} />
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