import './footer.css'
import { Poppins } from 'next/font/google';
import Link from 'next/link';

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
                            <img src="/LogoLumier2.png" alt="" />
                        </div>

                        <div className="footer-col">
                            <h4>Notícias</h4>
                            <ul>
                                <li>
                                    <Link href="/categoria/espotes">Esportes</Link>
                                </li>
                                <li>
                                    <Link href="/categoria/educacao">Educação</Link>
                                </li>
                                <li>
                                    <Link href="/categoria/cultura">Cultura</Link>
                                </li>
                                <li>
                                    <Link href="/categoria/tecnologia">Tecnologia</Link>
                                </li>
                                <li>
                                    <Link href="/categoria">Todas as Notícias</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Principal</h4>
                            <ul>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/suaNoticia">Sua Notícia</Link>
                                </li>
                                <li>
                                    <Link href="/tour">Tour</Link>
                                </li>
                                <li>
                                    <Link href="/login">Login</Link>
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
                                <Link href="#">
                                    <i className="bi bi-linkedin"></i>
                                </Link>
                                <Link href="#">
                                    <i className="bi bi-instagram"></i>
                                </Link>
                                <Link href="#">
                                    <i className="bi bi-facebook"></i>
                                </Link>
                                <Link href="#">
                                    <i className="bi bi-youtube"></i>
                                </Link>
                                <Link href="#">
                                    <i className="bi bi-twitter-x"></i>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>


    )
}