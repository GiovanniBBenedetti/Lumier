import "./IntroHome.css";
import Horizon  from "next/font/local"
import Link from "next/link";
const font = Horizon({
  src: '../fontes/horizon.otf'
})



export default function IntroHome() {
    return (
        <div className="">
            <div className="bannerUmHome">
                <div className="col-md-12">
                    <h1 className={`tituloBannerUmHome ${font.className}`}>NOTÍCIAS</h1>
                    <h2 className="tituloBannerUmHome">COLÉGIO LUMIER</h2>

                    <div className="botoesBannerHomeUm">
                        <div className="botaoIntroHome">
                           <Link href='/categorias'>
                              <button>
                               Confira nossas notícias
                            </button>
                            </Link>
                          
                            <img src="./seta.png" className="img-fluid setaHome" alt="seta" />
                        </div>

                        <div className="botaoIntroHome">
                            <Link href='/suaNoticia'>
                              <button>
                                Envie a sua própria notícia
                            </button>
                            </Link>
                          
                            <img src="./seta.png" className="img-fluid setaHome" alt="seta" />
                        </div>

                        <div className="botaoIntroHome">
                             <Link href='/tour'>
                              <button>
                                Faça um tour na escola
                            </button>
                            </Link>
                          
                            <img src="./seta.png" className="img-fluid setaHome" alt="seta" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}