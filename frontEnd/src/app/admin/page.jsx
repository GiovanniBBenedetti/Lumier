'use client'
import { useEffect, useState } from 'react';
import './admin.css'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem1, setImagem1] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    fetch('http://localhost:3200/admin/dashboard', {
      headers: { Authorization: `Bearer ${t}` }
    })
      .then(async (res) => {
        if (res.status === 403 ) {
          window.location.href = '/login';

        } else if(res.status === 401){
          window.location.href = '/login';

          localStorage.removeItem('token')
          localStorage.removeItem('nome')
        }else{
          const data = await res.json();
          setAuthorized(true);
          setMensagem(data.mensagem);
        }
      })
  }, []);

  const handleAdicionar = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('conteudo', conteudo);
      if (imagem1) formData.append('imagem1', imagem1);

      const response = await fetch('http://localhost:3200/blog', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        alert('Erro ao adicionar publicação: ' + (error.mensagem || response.statusText));
        return;
      }

      alert('Publicação adicionada com sucesso!');

      setTitulo('');
      setConteudo('');
      setImagem1(null);
    } catch (err) {
      alert('Erro ao adicionar publicação: ' + err.message);
    }
  };

  if (authorized === null) return <p>Verificando acesso...</p>;

  return (
    <>
      <div className='container'>


        <div>
          <h1>Painel do Admin</h1>
          <p>{mensagem}</p>
        </div>

        <form id="blogForm" className='formAdicionar' onSubmit={handleAdicionar} encType="multipart/form-data">
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />

          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea id="conteudo" cols="30" rows="5" name="conteudo" value={conteudo} onChange={e => setConteudo(e.target.value)} />

          <label htmlFor="imagem1">Imagem:</label>
          <input
            type="file"
            id="imagem1"
            name="imagem1"
            accept="image/*"
            onChange={e => setImagem1(e.target.files[0])}
          />

          <button type="submit">Adicionar Livro</button>
        </form>
      </div>
    </>
  );
}
