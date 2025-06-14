"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import './btnRecomendacao.css'


export default function CardHome({ blog }) {

  const [authorized, setAuthorized] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    fetch('http://localhost:3200/admin/dashboard', {
      headers: { Authorization: `Bearer ${t}` }
    })
      .then(async (res) => {
        if (res.status === 403) {
          window.location.href = '/login';

        } else if (res.status === 401) {
          window.location.href = '/login';

          localStorage.removeItem('token')
          localStorage.removeItem('nome')
        } else {
          const data = await res.json();
          setAuthorized(true);
          setMensagem(data.mensagem);
        }
      })
  }, []);

  const handleRecusar = async (blog) => {
    try {
      const response = await fetch(`http://localhost:3200/blog/recomendacao/${blog.id}`,
        {
          method: 'PUT',
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            estado: 'Recusado'
          })
        })
      const data = await response.json();
      if (!response.ok) {
        const error = await response.json();
        alert('Houve um erro, tente novamente');
        return;
      }
      alert("Blog recusado")
      window.location.href = '/admin';
    }
    catch (err) {
        alert('Erro ao definir blog')
    }
  }

  const handleAceitar = async (blog) => {
    try {
      const response = await fetch(`http://localhost:3200/blog/recomendacao/${blog.id}`,
        {
          method: 'PUT',
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            titulo: blog.titulo,
            conteudo: blog.conteudo,
            data_publicacao: blog.data_publicacao,
            topico: blog.topico,
            tags: blog.tags,
            tipo:blog.tipo,
            autor: blog.autor,
            imagem1: blog.imagem1,
            estado: 'Aceitado'
          })
        });
      const data = await response.json();
      alert("Blog Aceitado")
      window.location.href = '/admin';
    }
    catch (err) {
        alert('Erro ao definir blog')
    }
  }

  return (
    <div className="d-flex flex-column gap-3 my-5">
      <button onClick={() => { handleAceitar(blog) }} type="button" className="btnRecomendacao">Aceitar</button>
      <button onClick={() => { handleRecusar(blog) }} type="button" className="btnRecomendacao">Rejeitar</button>
    </div>
  );
}