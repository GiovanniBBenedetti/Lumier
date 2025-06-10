'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import './navbar.css';
import { Poppins } from 'next/font/google';
import BuscaBlog from "../barraBusca/barraBusca";

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
            <Link href='/usuario'> 
              <span className="nomeUsuario"><i className="bi bi-person-circle"></i> Olá, {nomeUsuario}</span>
            </Link>
          ) : (
            <Link href='/login'>
              <i className="bi bi-person-fill"></i>
              <span>Olá. Acesse sua conta</span>
            </Link>
          )}
        </div>
        <div className="login-desk d-none d-lg-flex">
          {nomeUsuario ? (
            <Link href='/usuario'> 
              <span className="nomeUsuario nomeUsuarioDesk"><i className="bi bi-person-circle"></i> {nomeUsuario}</span>
            </Link>
          ) : (
            <Link href='/login'>
              <i className="bi bi-person-fill"></i>
            </Link>
          )}
        </div>
      </div>

  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
  <li className="nav-item"><Link className='nav-link' href='/tour'>Tour</Link></li>
  <li className="nav-item"><Link className='nav-link' href='/suaNoticia'>Sua Notícia</Link></li>
</ul>

      <BuscaBlog />
    </div>
  </div>
</nav>

  );
}
