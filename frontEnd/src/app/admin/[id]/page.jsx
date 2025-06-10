import Botao from '../../../components/recomendacaoAuto/page'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});


export default async function DetalhesRecomendacao({ params }) {

    const { id } = await params;

    const response = await fetch(`http://localhost:3200/blog/recomendacaoEstado/${id}`);
    const data = await response.json()


    return (
        <div className="container">
            <h1 className={`${poppins.className}`}>{data[0].titulo}</h1>
            <p className='m-0'>Por: {data[0].autor}</p>
            <p>{new Date(data[0].data_publicacao).toLocaleString("pt-BR")}</p>
            <p></p>
            <div className="container-imagem">
                <img className="w-100" src={`http://localhost:3200${data[0].imagem1}`} />
            </div>
            <div className="descricao">
                <p>{data[0].conteudo}</p>
                <p>{data[0].previa}</p>
                <p>{data[0].topico}</p>
            </div>

            <div className="comentarios">
                <Botao blog={data[0]}></Botao>
            </div>
        </div>
    );
}