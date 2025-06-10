import "./not-found.css";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <style>
                {`
body{
  background-color: var(--cor4)!important;
}`}
            </style>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center divNotFound">
                    <div className="col-sm-12 col-9">
                        <div className="notFoundImg">
                            <img className="img-fluid" src="/erro.png" alt="notFoundImg" />
                        </div>
                        <div className="notFoundTexto mb-0">
                            <h1 className='Sugo'>PÁGINA NÃO ENCONTRADA</h1>
                            <p className='PoppinsBold'>Parece que essa informação era fake news</p>
                            <div className="botaoNotFound mb-0">


                                <Link href="/">
                                    <button>
                                        Voltar
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

