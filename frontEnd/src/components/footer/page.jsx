import './footer.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});


export default function footer() {
    return (
        <>


            <footer className={`${poppins.className}`}>
                <div className="container-footer">
                    <div className="row-footer">

                        <div className="footer-col">
                            <h4>Empresa</h4>
                            <ul>
                                <li>
                                    <a href="#"> Quem somos </a>
                                </li>
                                <li>
                                    <a href=""> nossos serviços </a>
                                </li>
                                <li>
                                    <a href=""> política de privacidade </a>
                                </li>
                                <li>
                                    <a href=""> programa de afiliados</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Obter ajuda</h4>
                            <ul>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                                <li>
                                    <a href="#">Transporte</a>
                                </li>
                                <li>
                                    <a href="#">devoluções</a>
                                </li>
                                <li>
                                    <a href="#">Status De Pedido</a>
                                </li>
                                <li>
                                    <a href="#">Opções De Pagamento</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Loja online</h4>
                            <ul>
                                <li>
                                    <a href="#">Relógio</a>
                                </li>
                                <li>
                                    <a href="#">Saco</a>
                                </li>
                                <li>
                                    <a href="#">Calçado</a>
                                </li>
                                <li>
                                    <a href="#">Endereço</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Se subescreva!</h4>
                            <div className="form-sub">
                                <form>
                                    <input
                                        type="email"
                                        placeholder="Digite o seu e-mail"
                                        required=""
                                    />
                                    <button>subscrever</button>
                                </form>
                            </div>
                            <div className="medias-socias">
                                <a href="#">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                                <a href="#">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#">
                                    <i className="bi bi-youtube"></i>
                                </a>
                                <a href="#">
                                   <i className="bi bi-twitter-x"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>


    )
}