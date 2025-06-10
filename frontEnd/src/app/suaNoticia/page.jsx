'use client';

import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './SuaNoticia.css';
import PerguntasSuaNoticia from '@/components/perguntasSuaNoticia/perguntas';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function SuaNoticia() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [tipoNoticia, setTipoNoticia] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
    fetch('http://localhost:3200/usuario/dashboard', {
      headers: { Authorization: `Bearer ${t}` },
    }).then(async (res) => {
      if (res.status === 403 || res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        window.location.href = '/login';
      } else {
        const data = await res.json();
        setEmail(data.email);
      }
    });
  }, []);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3200/usuario/${email}`)
        .then((res) => res.json())
        .then((data) => setNome(data.nome));
    }
  }, [email]);

  const getBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:3200/blog/recomendacao/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dados = await response.json();
      setBlogs(dados);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (email) getBlogs();
  }, [email]);

  const removerTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('conteudo', conteudo);
      formData.append('tipo', tipoNoticia);
      formData.append('email', email);
      formData.append('nome', nome);
      formData.append('tags', tags.join(','));
      if (imagem) formData.append('imagem1', imagem);

      await fetch('http://localhost:3200/blog/recomendacao', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      alert('Notícia enviada com sucesso!');
      setTitulo('');
      setConteudo('');
      setImagem('');
      setTipoNoticia('');
      setTags([]);
      setTagInput('');
      getBlogs();
    } catch {
      alert('Erro ao enviar notícia');
    }
  };

  return (
    <>
      <style>{`body { background-color: var(--cor4)!important; }`}</style>

      <div className={`py-5 text-white noticia-bg ${poppins.className}`}>
        <div className="container">
          <div className="row justify-content-center px-md-5">
            <div className="col-12 col-md-6 mb-5">
              <div className="tituloRecomendação">
                <h1>Solte a sua voz, escreva uma notícia! </h1>
                <button>Ver mais</button>
              </div>
              <p className="mt-4 fw-semibold">O que acontece na Lumier também é sua história — que tal contá-la?</p>
              <p>Este espaço é para você, estudante, compartilhar algo importante, curioso ou inspirador que tenha vivido ou visto na escola.</p>
              <p>Escreva com clareza, seja verdadeiro e use sua criatividade! Lembre-se: uma boa notícia responde o quê, quem, quando, onde e por quê.</p>
              <p className="tituloRecomendação">Sua voz tem poder. Vamos contar juntos o que faz da nossa escola um lugar tão único?</p>
              <img src="/meninasSugerirNoticia.png" className="img-fluid " alt="Crianças felizes" />
            </div>

            <div className="col-12 col-md-6">
              <form onSubmit={handleAdicionar} className="p-4 formRecomendaNoticia" encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Escreva o título aqui"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo da Notícia</label>
                  <select
                    value={tipoNoticia}
                    onChange={e => setTipoNoticia(e.target.value)}
                    className="form-select"
                    required
                  >
                    <option value="espotes">Esportes</option>
                    <option value="educação">Educação</option>
                    <option value="cultura">Cultura</option>
                    <option value="tecnologia">Tecnologia</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tags</label>
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
                  <label className="form-label">Imagem</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={e => setImagem(e.target.files[0])}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Notícia</label>
                  <textarea
                    value={conteudo}
                    onChange={e => setConteudo(e.target.value)}
                    className="form-control"
                    placeholder="Faça o relato da sua notícia nesse espaço"
                    rows={11}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn-eviarRecomendacao w-100 fw-bold">
                  Envie sua notícia clicando aqui
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <PerguntasSuaNoticia />
    </>
  );
}
