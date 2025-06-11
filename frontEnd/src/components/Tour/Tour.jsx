import "./Tour.css";
import SliderTour from "../SliderTour/SliderTour";

export default function TourHome() {
    return (
        <>
            <div className="container-fluid">
                <div className="">
                    <div className="row divTourHome d-flex">
                        <div className="tituloTourHome d-flex col-7">
                            <div className="linhaVerticalTourHome"></div>
                            <h1 className="Sugo">EXPLORE CADA DETALHE DO NOSSO AMBIENTE ESCOLAR</h1>
                        </div>
                        <div className="col-5 divBotaoTourHome">
                            <div className="botaoTourHome">
                                <button>Saiba mais</button>
                                <img src="./Elementos/setaRoxa.png" className="img-fluid setaTourHome" alt="seta" />
                            </div>
                        </div>
                    </div>
                    <div className="row carrosselTour">
                        <SliderTour></SliderTour>
                    </div>
                    <div className="row rowVantagensAmbientes">
                        <div className="col-10 d-flex divVantagensAmbientes">
                            <div className="d-flex divVantagensIcons">
                                <img src="./Ambientes/localIcon.png" className="img-fluid iconAmbiente" alt="seta" />
                                <p className="PoppinsBoldItalic">Localização de fácil acesso em Alphaville, SP</p>
                            </div>
                            <div className="d-flex divVantagensIcons">
                                <img src="./Ambientes/wifiIcon.png" className="img-fluid iconAmbiente" alt="seta" />
                                <p className="PoppinsBoldItalic">Mais de 5 salas com tecnologias embutidas</p>
                            </div>
                            <div className="d-flex divVantagensIcons">
                                <img src="./Ambientes/alunoIcon.png" className="img-fluid iconAmbiente" alt="seta" />
                                <p className="PoppinsBoldItalic">Estrutura para receber mais de 1000 alunos!</p>
                            </div>
                            <div className="d-flex divVantagensIcons">
                                <img src="./Ambientes/confIcon.png" className="img-fluid iconAmbiente" alt="seta" />
                                <p className="PoppinsBoldItalic">Ensino médio, fundamental
                                    e técnico</p>
                            </div>
                            <div className="d-flex divVantagensIcons">
                                <img src="./Ambientes/relogioIcon.png" className="img-fluid iconAmbiente" alt="seta" />
                                <p className="PoppinsBoldItalic">Período diurno, noturno, integral e vespertino</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}