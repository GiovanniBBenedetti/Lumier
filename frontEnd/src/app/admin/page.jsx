'use client';

import { useEffect, useState } from 'react';
import './admin.css';
import Loading from '@/components/loader/loader';
import Link from 'next/link';
import Sugo from 'next/font/local';
import Horizon from 'next/font/local';
  

  
  const Sugofont = Sugo({
      src: '../fonts/Sugo.ttf',
  });
   const HorizonFont = Horizon({
      src: '../fonts/horizon.otf',
  });
export default function AdminPage() {
  const [authorized, setAuthorized] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem1, setImagem1] = useState(null);
  const [tipoNoticia, setTipoNoticia] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [evento, setEvento] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [token, setToken] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    fetch('http://localhost:3200/admin/dashboard', {
      headers: { Authorization: `Bearer ${t}` }
    }).then(async (res) => {
      if (res.status === 403 || res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
            localStorage.removeItem('tipo');
        window.location.href = '/login';
      } else {
        const data = await res.json();
        setAuthorized(true);
        setMensagem(data.mensagem);
      }
    });
  }, []);



  const adicionarBlog = async (e) => {
    e.preventDefault();
    if (!token) return alert('Token não encontrado. Faça login novamente.');

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('conteudo', conteudo);
      formData.append('tipo', tipoNoticia);
      formData.append('tags', tags.join(','));
      if (imagem1) formData.append('imagem1', imagem1);

      const res = await fetch('http://localhost:3200/blog', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        return alert('Erro: ' + (err.mensagem || res.statusText));
      }

      alert('📘 Publicação adicionada com sucesso!');
      setTitulo('');
      setConteudo('');
      setTipoNoticia('');
      setTags([]);
      setTagInput('');
      setImagem1(null);
    } catch (err) {
      alert('Erro ao adicionar publicação: ' + err.message);
    }
  };

  const removerTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const adicionarEventos = async (e) => {
    e.preventDefault();

    const novoEvento = {
      evento,
      data_evento: dataEvento,
      descricao,
      tipo,
    };

    try {
      const res = await fetch('http://localhost:3200/eventos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoEvento),
      });

      if (res.ok) {
        setMensagem('✅ Evento adicionado com sucesso!');
        setEvento('');
        setDataEvento('');
        setDescricao('');
        setTipo('');
      } else {
        setMensagem('❌ Erro ao adicionar o evento.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('❌ Erro ao conectar com o servidor.');
    }
  };

  const getRecomendacao = async () => {
    try {
      const response = await fetch('http://localhost:3200/blog/recomendacao', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setRecomendacoes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getRecomendacao();
    }
  }, [token]);

  if (authorized === null) return <Loading />;

  return (
    <div className="container py-5">
      <h1 className={`mb-5 tituloPainel ${Sugofont.className}`}>Gerenciamento de postagens administração</h1>

      <div className="row g-4">





















        <div className="col-12 col-md-6">
          <div className="shadow-sm p-4 admin-card h-100">
            <h4 className={`mb-3 ${HorizonFont.className}`}>NOVA PUBLICAÇÃO</h4>
            <form onSubmit={adicionarBlog} encType="multipart/form-data" className="formAdicionar">
              <div className="mb-3">
                <label className="labelAdm">Título:</label>
                <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="labelAdm">Conteúdo:</label>
                <textarea className="form-control" rows="6" value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="labelAdm">Tipo da Notícia:</label>
                <select className="form-select" value={tipoNoticia} onChange={(e) => setTipoNoticia(e.target.value)} required>
                  <option value="">Selecione o tipo</option>
                  <option value="esportes">Esportes</option>
                  <option value="educacao">Educação</option>
                  <option value="cultura">Cultura</option>
                  <option value="tecnologia">Tecnologia</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="labelAdm">Tags</label>
                <div className="mb-2 d-flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary px-3 py-2">
                      {tag} <button type="button" className="btn-close btn-close-white ms-2" aria-label="Remover" onClick={() => removerTag(index)}></button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite uma tag e pressione Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const novaTag = tagInput.trim();
                      if (novaTag && !tags.includes(novaTag)) {
                        setTags([...tags, novaTag]);
                      }
                      setTagInput('');
                    }
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="labelAdm">Imagem:</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => setImagem1(e.target.files[0])} />
              </div>

              <button type="submit" className="btnAdm w-100">Publicar</button>
            </form>
          </div>
        </div>





































        {/* Formulário de Evento */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4 admin-card h-100">
            <h4 className={`mb-3 ${HorizonFont.className}`}>NOVO EVENTO</h4>
            <form onSubmit={adicionarEventos} className="formAdicionar">
              <div className="mb-3">
                <label className="form-label">Nome do Evento</label>
                <input type="text" className="form-control" value={evento} onChange={(e) => setEvento(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Data</label>
                <input type="date" className="form-control" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea className="form-control" rows="4" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="esportes">Esportes</option>
                  <option value="escola">Escolar</option>
                  <option value="entretenimento">Entretenimento</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Adicionar Evento</button>
            </form>
          </div>
        </div>
      </div>

      <h1 className="my-5">Recomendações de alunos</h1>
      {recomendacoes.length > 0 ? (
        recomendacoes.map((recomendacao, index) => (
          recomendacao.estado === 'Aguardando' && (
            <div key={index}>
              <Link href={`admin/${recomendacao.id}`}>
                <div className="card my-5">
                  <div className="card-body">
                    <h5 className="card-title">{recomendacao.titulo}</h5>
                    <p className="card-text">{recomendacao.topico}</p>
                    <p className="card-text">Sugerido por: {recomendacao.autor}</p>
                  </div>
                </div>
              </Link>
            </div>
          )
        ))
      ) : (
        <p>Nenhum comentário neste blog</p>
      )}
    </div>
  );
}
