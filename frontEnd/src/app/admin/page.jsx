"use client"

import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import './admin.css';
import Loading from '@/components/loader/loader';

import Sugo from 'next/font/local';
import Horizon from 'next/font/local';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CardRecomendacao from "@/components/recomendacaoCard/page";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import 'swiper/css';
import 'swiper/css/pagination';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});



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
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('')
  const [emailC, setEmailC] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [usuario, setUsuario] = useState('');
  const [noticias, setNoticias] = useState('');
  const [turma, setTurma] = useState('');


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
        setUsuario(data.nome);
      }
    });



    getNoticias()
  }, []);



  const adicionarBlog = async (e) => {
    e.preventDefault();
    if (!token) return toast.error('Token não encontrado. Faça login novamente.');

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
        return toast.error('Erro: ' + (err.mensagem || res.statusText));
      }

      toast.success('📘 Publicação adicionada com sucesso!');
      setTitulo('');
      setConteudo('');
      setTipoNoticia('');
      setTags([]);
      setTagInput('');
      setImagem1(null);
    } catch (err) {
      toast.error('Erro ao adicionar publicação: ' + err.message);
    }
  };

  const removerTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const adicionarEventos = async (e) => {
    e.preventDefault();

    const novoEvento = { evento, data_evento: dataEvento, descricao, tipo };

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
        toast.success('✅ Evento adicionado com sucesso!');
        setEvento('');
        setDataEvento('');
        setDescricao('');
        setTipo('');
      } else {
        toast.error('❌ Erro ao adicionar o evento.');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('❌ Erro ao conectar com o servidor.');
    }
  };

  const getNoticias = async () => {
    const email = localStorage.getItem('email')
    try {
      const response = await fetch(`http://localhost:3200/blog/email/${email}`, {
      });

      const data = await response.json();


      setNoticias(data);
      console.log(data)
    } catch (err) {
      console.log(err);
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
  }





  const handleAdicionar = async (e) => {
    e.preventDefault();

    if (!turma || !titulo || !conteudo) {
      return toast.warning("Preencha todos os campos.");
    }

    const recado = { titulo, conteudo, turma };

    try {
      const res = await fetch('http://localhost:3200/recados', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recado),
      });

      if (res.ok) {
        toast.success("📢 Recado enviado com sucesso!");
        setTitulo('');
        setConteudo('');
        setTurma('');
      } else {
        toast.error("Erro ao enviar recado.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao conectar com o servidor.");
    }
  }

  useEffect(() => {
    if (usuario) {
      getNoticias();
    }
  }, [usuario])

  useEffect(() => {
    if (token) {
      getRecomendacao();
    }
  }, [token]);


  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const repetido = await fetch(`http://localhost:3200/usuario/${emailC}`, {
        method: 'GET'
      });
      if (repetido.status != 202) {
        return alert('Email em uso');
      }
      else {
        const response = await fetch('http://localhost:3200/usuario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailC,
            nome,
            senha,
            tipo: tipoUsuario,
            turma
          })
        });


        const data = await response.json();
        toast.success("Usuário cadastrado com Sucesso");

        setEmailC('');
        setSenha('');
        setNome('');
      }
    } catch (err) {
      console.log(err)
      toast.error("Erro ao criar usuario.");
    }
  };

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
                <label className="labelAdm">Nome do Evento</label>
                <input type="text" className="form-control" value={evento} onChange={(e) => setEvento(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="labelAdm">Data</label>
                <input type="date" className="form-control" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="labelAdm">Descrição</label>
                <textarea className="form-control" rows="10" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="labelAdm">Tipo</label>
                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="esportes">Esportes</option>
                  <option value="escola">Escolar</option>
                  <option value="entretenimento">Entretenimento</option>
                </select>
              </div>
              <button type="submit" className="btnAdm w-100">Adicionar evento</button>
            </form>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 admin-card h-100 my-5">
        <h2 className={`mb-3 ${HorizonFont.className} purple my-5 text-center`}>Recomendações de alunos</h2>
        <section className="blog-carousel-section mb-5" >
          <div className="container">


            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="blog-swiper"
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },

                992: {
                  slidesPerView: 3,
                }
              }}

            >

              {recomendacoes.map((recomendacao, index) => {
                if (recomendacao.estado == 'Aguardando') {
                  return (
                    <SwiperSlide key={index}>

                      <CardRecomendacao
                        autor={recomendacao.autor}
                        titulo={recomendacao.titulo}
                        imagem={recomendacao.imagem1}
                        conteudo={recomendacao.conteudo}
                        data_publicacao={recomendacao.data_publicacao}
                        id={recomendacao.id}
                      />



                    </SwiperSlide>

                  )
                }
              }
              )}

            </Swiper>

          </div >
        </section >
      </div>





      <div className="card shadow-sm p-4 admin-card h-100 my-5">
        <h2 className={`mb-3 ${HorizonFont.className} purple my-5 text-center`}>SUAS NOTÍCIAS</h2>
        <section className="blog-carousel-section mb-5" >
          <div className="container">


            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="blog-swiper"
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },

                992: {
                  slidesPerView: 3,
                }
              }}
            >

              {noticias
                ? (
                  <>
                    {noticias.map((noticia, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <CardRecomendacao
                            titulo={noticia.titulo}
                            imagem={noticia.imagem1}
                            conteudo={noticia.conteudo}
                            data_publicacao={noticia.data_publicacao}
                            id={noticia.id}
                          />



                        </SwiperSlide>

                      )
                    }
                    )}
                  </>
                )
                : (
                  <>
                    <h3>Você não tem notícias</h3>
                  </>
                )}

            </Swiper>

          </div >
        </section >
      </div>


      <div className="card shadow-sm p-4 admin-card h-100">
        <h4 className={`mb-3 ${HorizonFont.className}`}>NOVO USUÁRIO</h4>
        <form onSubmit={handleCadastro} className="formAdicionar">
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={emailC}
              onChange={(e) => setEmailC(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select
              className="form-select"
              value={tipoUsuario}
              onChange={(e) => {
                const tipo = e.target.value.trim().toLowerCase();
                setTipoUsuario(tipo);
                if (tipo === 'admin') setTurma('');
              }}
              required
            >
              <option value="">Selecione...</option>
              <option value="admin">Administrador</option>
              <option value="comum">Usuário</option>
            </select>
          </div>

          {tipoUsuario !== 'admin' && (
            <div className="mb-3">
              <label className="form-label">Turma</label>
              <select
                className="form-select"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                required
              >
                <option value="">Selecione a turma</option>

                <optgroup label="Ensino Fundamental">
                  <option value="Fundamental 6º ano A">Fundamental 6º ano A</option>
                  <option value="Fundamental 6º ano B">Fundamental 6º ano B</option>
                  <option value="Fundamental 7º ano A">Fundamental 7º ano A</option>
                  <option value="Fundamental 7º ano B">Fundamental 7º ano B</option>
                  <option value="Fundamental 8º ano A">Fundamental 8º ano A</option>
                  <option value="Fundamental 8º ano B">Fundamental 8º ano B</option>
                  <option value="Fundamental 9º ano A">Fundamental 9º ano A</option>
                  <option value="Fundamental 9º ano B">Fundamental 9º ano B</option>
                </optgroup>

                <optgroup label="Ensino Médio">
                  <option value="Ensino Médio 1º ano A">Ensino Médio 1º ano A</option>
                  <option value="Ensino Médio 1º ano B">Ensino Médio 1º ano B</option>
                  <option value="Ensino Médio 2º ano A">Ensino Médio 2º ano A</option>
                  <option value="Ensino Médio 2º ano B">Ensino Médio 2º ano B</option>
                  <option value="Ensino Médio 3º ano A">Ensino Médio 3º ano A</option>
                  <option value="Ensino Médio 3º ano B">Ensino Médio 3º ano B</option>
                  <option value="Ensino Médio 3º ano C">Ensino Médio 3º ano C</option>
                </optgroup>
              </select>
            </div>
          )}

          <button type="submit" className="btnAdm w-100">Cadastrar usuário</button>
        </form>
      </div>


      <div className="card shadow-sm p-4 admin-card h-100 my-5">
        <h4 className={`mb-3 ${HorizonFont.className}`}>NOVO RECADOS PARA TURMAS</h4>
        <form
          onSubmit={handleAdicionar}
          className="formAdicionar"
        >
          <div className="mb-3">
            <label className="form-label">Título do Recado</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mensagem</label>
            <textarea
              className="form-control"
              rows="6"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Turma Destinada</label>
            <select
              className="form-select"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              required
            >
              <option value="">Selecione a turma</option>

              <optgroup label="Ensino Fundamental">
                <option value="Fundamental 6º ano A">Fundamental 6º ano A</option>
                <option value="Fundamental 6º ano B">Fundamental 6º ano B</option>
                <option value="Fundamental 7º ano A">Fundamental 7º ano A</option>
                <option value="Fundamental 7º ano B">Fundamental 7º ano B</option>
                <option value="Fundamental 8º ano A">Fundamental 8º ano A</option>
                <option value="Fundamental 8º ano B">Fundamental 8º ano B</option>
                <option value="Fundamental 9º ano A">Fundamental 9º ano A</option>
                <option value="Fundamental 9º ano B">Fundamental 9º ano B</option>
              </optgroup>

              <optgroup label="Ensino Médio">
                <option value="Ensino Médio 1º ano A">Ensino Médio 1º ano A</option>
                <option value="Ensino Médio 1º ano B">Ensino Médio 1º ano B</option>
                <option value="Ensino Médio 2º ano A">Ensino Médio 2º ano A</option>
                <option value="Ensino Médio 2º ano B">Ensino Médio 2º ano B</option>
                <option value="Ensino Médio 3º ano A">Ensino Médio 3º ano A</option>
                <option value="Ensino Médio 3º ano B">Ensino Médio 3º ano B</option>
                <option value="Ensino Médio 3º ano C">Ensino Médio 3º ano C</option>
              </optgroup>
            </select>
          </div>

          <button type="submit" className="btnAdm w-100">Enviar Recado</button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}