import "./Cardapio.css";

export default function Cardapio() {
    return (
        <>
            <div className="container-fluid">
                <div className="row divCardapio">
                    <div className="col-sm-12 col-lg-8 col-md-12 divCardapioEsquerda">
                        <div className="tituloCardapio d-flex">
                            <div className="linhaVerticalCardapio"></div>
                            <h1 className="Sugo">CARDÁPIO DA CANTINA LUMIER</h1>
                        </div>
                        <div className="diasCardapio">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="false"
                                            aria-controls="collapseOne"
                                        >
                                            Segunda-Feira
                                        </button>
                                    </h2>

                                    <div className="accordion-body">
                                        <p>Categoria ex.almoço</p>

                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-extra">
                                                <p>arroz</p>
                                                <p>feijão</p>
                                                <p>salada</p>
                                                <p>suco</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            Terça-feira
                                        </button>
                                    </h2>

                                    <div className="accordion-body">
                                        <p>Categoria ex.almoço</p>

                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-extra">
                                                <p>arroz</p>
                                                <p>feijão</p>
                                                <p>salada</p>
                                                <p>suco</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            Quarta-feira
                                        </button>
                                    </h2>

                                    <div className="accordion-body">
                                        <p>Categoria ex.almoço</p>

                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-extra">
                                                <p>arroz</p>
                                                <p>feijão</p>
                                                <p>salada</p>
                                                <p>suco</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            Quinta-feira
                                        </button>
                                    </h2>

                                    <div className="accordion-body">
                                        <p>Categoria ex.almoço</p>

                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-extra">
                                                <p>arroz</p>
                                                <p>feijão</p>
                                                <p>salada</p>
                                                <p>suco</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive"
                                            aria-expanded="false"
                                            aria-controls="collapseFive"
                                        >
                                            Sexta-feira
                                        </button>
                                    </h2>

                                    <div className="accordion-body">
                                        <p>Categoria ex.almoço</p>

                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-extra">
                                                <p>arroz</p>
                                                <p>feijão</p>
                                                <p>salada</p>
                                                <p>suco</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="botoesCardapio d-flex">
                            <div className="botaoOpcaoCardapio">
                                <button><img src="./Cardapio/cardapioLancheManha.png" className="img-fluid iconCardapio" alt="iconCardapio" /></button>
                                <p>Lanche da manhã</p>
                            </div>
                            <div className="botaoOpcaoCardapio">
                                <button><img src="./Cardapio/cardapioAlmoco.png" className="img-fluid iconCardapio" alt="iconCardapio" /></button>
                                <p>Almoço e sobremesa</p>
                            </div>
                            <div className="botaoOpcaoCardapio">
                                <button><img src="./Cardapio/cardapioAlmocoVeg.png" className="img-fluid iconCardapio" alt="iconCardapio" /></button>
                                <p>Almoço vegetariano</p>
                            </div>
                            <div className="botaoOpcaoCardapio">
                                <button><img src="./Cardapio/cardapioLancheTarde.png" className="img-fluid iconCardapio" alt="iconCardapio" /></button>
                                <p>Lanche da tarde</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 imgCardapioUm">
                        <img src="./Cardapio/cardapioImgUm.png" className="img-fluid cardapioImgPratoUm d-none d-md-flex" alt="cardapio" />
                        <img src="./Cardapio/cardapioImgDois.png" className="img-fluid cardapioImgPratoDois d-flex d-md-none" alt="cardapio" />
                    </div>
                </div>
            </div>
        </>
    )
}