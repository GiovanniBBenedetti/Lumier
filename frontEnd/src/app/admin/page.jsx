'use client'
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem1, setImagem1] = useState(null);
  const [autor, setAutor] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    fetch('http://localhost:3200/admin/dashboard', {
      headers: { Authorization: `Bearer ${t}` }
    })
      .then(async (res) => {
        if (res.status === 403 || res.status === 401) {
          window.location.href = '/login';
        } else {
          const data = await res.json();
          setAuthorized(true);
          setMensagem(data.mensagem);
        }
      })
      .catch(() => {
        window.location.href = '/login';
      });
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
      formData.append('autor', autor);
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
      setAutor('');
      setImagem1(null);
    } catch (err) {
      alert('Erro ao adicionar publicação: ' + err.message);
    }
  };

  if (authorized === null) return <p>Verificando acesso...</p>;

  return (
    <>
      <div className='container vh-100'>


        <div>
          <h1>Painel do Admin</h1>
          <p>{mensagem}</p>
        </div>

        <form id="blogForm" onSubmit={handleAdicionar} encType="multipart/form-data">
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} />

          <label htmlFor="conteudo">Conteúdo:</label>
          <input type="text" id="conteudo" name="conteudo" value={conteudo} onChange={e => setConteudo(e.target.value)} />

          <label htmlFor="autor">Autor:</label>
          <input type="text" id="autor" name="autor" value={autor} onChange={e => setAutor(e.target.value)} />

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
