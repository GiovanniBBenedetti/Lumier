import "./SobreHome.css";

export default function SobreHome() {
    return (
        <>
            <div className="container-fluid sobrenos">
                <div className="sobreHome">
                    <div className="row divSobreHome d-flex">
                        <div className="tituloSobreHome d-flex col-7">
                            <div className="linhaVerticalSobreHome"></div>
                            <h1 className="Sugo">EXPLORE CADA DETALHE DO NOSSO AMBIENTE ESCOLAR</h1>
                        </div>
                        <div className="col-5 divBotaoSobreHome">
                            <div className="botaoSobreHome">
                                <button>Saiba mais</button>
                                <img src="./Elementos/setaRoxa.png" className="img-fluid setaSobreHome" alt="seta" />
                            </div>
                        </div>
                    </div>

                    <div className="row rowImgSobreHome">
                        <img src="./Banners/sobreBannerHome.png" className="img-fluid w-100" alt="imgSobreHome" />
                    </div>
                </div>
            </div>
        </>
    )
}