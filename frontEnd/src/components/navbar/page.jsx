'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import './navbar.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Navbar() {
  const [nomeUsuario, setNomeUsuario] = useState(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const nome = localStorage.getItem('nome');
      if (nome) setNomeUsuario(nome);
    }
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${poppins.className}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" href='/'>
          <img className='logo' src="/logo.png" alt="Logo" />
        </Link>

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
          <div className="icones-login order-1 order-lg-3">
            <div className="login-mobile d-flex d-lg-none">
              {nomeUsuario ? (
               <Link href='/usuario'> <span className="nomeUsuario"><i className="bi bi-person-circle"></i> Olá, {nomeUsuario}</span></Link>
              ) : (
                <Link href='/login'>
                  <i className="bi bi-person-fill"></i>
                  <span>Olá. Acesse sua conta</span>
                </Link>
              )}
            </div>
            <div className="login-desk d-none d-lg-flex">
              {nomeUsuario ? (
               <Link href='/usuario'> <span className="nomeUsuario nomeUsuarioDesk"><i className="bi bi-person-circle"></i> {nomeUsuario}</span></Link>
                
              ) : (
                <Link href='/login'>
                  <i className="bi bi-person-fill"></i>
                </Link>
              )}
            </div>
          </div>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className='nav-link' href='/blogs'>Noticias</Link></li>
            <li className="nav-item"><Link className='nav-link' href='/sobreNos'>Sobre Nós</Link></li>
            <li className="nav-item"><Link className='nav-link' href='/tour'>Tour</Link></li>
            <li className="nav-item"><Link className='nav-link' href='/suaNoticia'>Sua Notícia</Link></li>
          </ul>

          <form className="container-input">
            <input
              type="text"
              placeholder="Busque por uma Notícia ..."
              name="text"
              className="input"
              autoComplete="off"
            />
            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd" />
            </svg>
          </form>
        </div>
      </div>
    </nav>
  );
}
