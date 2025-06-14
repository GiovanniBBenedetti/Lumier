'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import './navbar.css';
import { Poppins } from 'next/font/google';
import BuscaBlog from "../barraBusca/barraBusca";
import ModalRecados from "../ModalRecados/ModalRecados";
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Navbar() {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [turma, setTurma] = useState(null);
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const nome = localStorage.getItem('nome');
    const tipo = localStorage.getItem('tipo');
    const turma = localStorage.getItem('turma');
    const token = localStorage.getItem('token');

    if (nome) setNomeUsuario(nome);
    if (tipo) setTipoUsuario(tipo);
    if (turma) setTurma(turma);
    if (token) setToken(token);
  }, []);

  if (!isClient) return null;

  const linkUsuario = tipoUsuario === 'admin' ? '/admin' : '/usuario';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${poppins.className}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" href='/'><img className='logo' src="/logo.png" alt="Logo" /></Link>

          <div className="hamburgers d-lg-none order-2">
            <label className="hamburger"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <input type="checkbox" />
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </label>
          </div>

          <div className="collapse navbar-collapse order-3 order-lg-2" id="navbarSupportedContent">
            <div className="icones-login order-1 order-lg-3 d-flex align-items-center gap-3">

              {/* Login Mobile */}
              <div className="login-mobile d-flex d-lg-none flex-row align-items-center gap-3">
                {nomeUsuario ? (
                  <>
                    <Link href={linkUsuario}>
                      <span className="nomeUsuario">
                        <i className="bi bi-person-circle"></i> Olá, {nomeUsuario}
                      </span>
                    </Link>

                    {tipoUsuario !== 'admin' && (
                      <div className="notificacao-barra mt-2" data-bs-toggle="modal" data-bs-target="#modalRecados">
                        <i className="bi bi-bell-fill text-white"></i>
                      </div>
                    )}

                    {tipoUsuario === 'admin' && (
                      <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    )}
                  </>
                ) : (
                  <Link href='/login'>
                    <i className="bi bi-person-fill"></i>
                    <span>Olá. Acesse sua conta</span>
                  </Link>
                )}
              </div>

              {/* Login Desktop */}
              <div className="login-desk d-none d-lg-flex align-items-center gap-3">
                {nomeUsuario ? (
                  <>
                    <Link href={linkUsuario}>
                      <span className="nomeUsuario nomeUsuarioDesk">
                        <i className="bi bi-person-circle"></i> {nomeUsuario}
                      </span>
                    </Link>

                    {tipoUsuario !== 'admin' && (
                      <div className="notificacao-barra" data-bs-toggle="modal" data-bs-target="#modalRecados">
                        <i className="bi bi-bell-fill text-white"></i>
                      </div>
                    )}

                    {tipoUsuario === 'admin' && (
                      <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                      </button>
                    )}
                  </>
                ) : (
                  <Link href='/login'>
                    <i className="bi bi-person-fill"></i>
                  </Link>
                )}
              </div>
            </div>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className='nav-link' href='/sobreNos'>Home</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Notícias
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="/categorias">Todas as Notícias</Link></li>
                  <li><Link className="dropdown-item" href="/categorias/educacao">Educação</Link></li>
                  <li><Link className="dropdown-item" href="/categorias/tecnologia">Tecnologia</Link></li>
                  <li><Link className="dropdown-item" href="/categorias/cultura">Cultura</Link></li>
                  <li><Link className="dropdown-item" href="/categorias/esportes">Esportes</Link></li>
                </ul>
              </li>

              <li className="nav-item"><Link className='nav-link' href='/sobreNos'>Sobre Nós</Link></li>
              <li className="nav-item"><Link className='nav-link' href='/suaNoticia'>Sua Notícia</Link></li>
            </ul>

            <BuscaBlog />
          </div>
        </div>
      </nav>


      {tipoUsuario !== 'admin' && turma && token && (
        <ModalRecados turma={turma} token={token} />
      )}
    </>
  );
}
