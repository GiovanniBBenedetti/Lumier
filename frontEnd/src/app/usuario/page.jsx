'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/loader/loader';
import './usuario.css'; 
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      window.location.href = '/login';
      return;
    }

    const buscarUsuarioERecomendacoes = async () => {
      try {
        // Busca dados do usuário
        const resposta = await fetch('http://localhost:3200/usuario', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resposta.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
          return;
        }

        if (!resposta.ok) throw new Error('Erro ao buscar dados do usuário');

        const dados = await resposta.json();
        setUsuario(dados);

        // Busca recomendações com token no header
        const recRes = await fetch(`http://localhost:3200/blog/recomendacao/${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!recRes.ok) throw new Error('Erro ao buscar recomendações');

        const recData = await recRes.json();
        setRecomendacoes(recData);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarioERecomendacoes();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (carregando) return <Loading />;
  if (erro) return <div className="container mt-5 text-danger">Erro: {erro}</div>;

  return (
    <div className={`${poppins.className} usuario-container`}>
      <div className="usuario-card shadow-lg">
        <h2 className="usuario-titulo">Perfil do Usuário</h2>

        <div className="usuario-info">
          <div className="usuario-item">
            <i className="bi bi-person-fill me-2"></i> <strong>Nome:</strong> {usuario.nome}
          </div>
          <div className="usuario-item">
            <i className="bi bi-envelope-fill me-2"></i> <strong>Email:</strong> {usuario.email}
          </div>
          <div className="usuario-item">
            <i className="bi bi-shield-lock-fill me-2"></i> <strong>Tipo:</strong> {usuario.tipo}
          </div>
        </div>

        <button className="btn-logout mt-4" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i> Sair da Conta
        </button>
      </div>

      {/* Notícias recomendadas */}
<div className="mt-5 container">
  <h3 className="usuario-titulo">Suas notícias Recomendadas</h3>
  <div className="row">
    {recomendacoes.length > 0 ? (
      recomendacoes.map((noticia) => (
        <div className="col-12 col-md-4 mt-3" key={noticia.id}>
          <div className="card h-100">
            <img
              src={`http://localhost:3200${noticia.imagem1}`}
              className="card-img-top"
              alt={noticia.titulo}
            />
            <div className="card-body">
              <h5 className="card-title">{noticia.titulo}</h5>
              <p className="card-text">{noticia.conteudo}</p>
              <p>Estado: {noticia.estado}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="mt-3">Nenhuma notícia recomendada até o momento.</p>
    )}
  </div>
</div>

    </div>
  );
}
