'use client';

import { useState, useEffect } from 'react';
import './comentariosBlog.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});

export default function ComentariosBlog({ id }) {
  const [comments, setComments] = useState([]);
  const [comentario, setComentario] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);

    fetch(`http://localhost:3200/comentariosBlog/${id}`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    if (!token) {
      setMensagem('⚠️ É necessário estar logado para comentar.');
      return;
    }

    const novoComentario = {
      post_id: id,
      comentario,
    };

    const res = await fetch(`http://localhost:3200/comentariosBlog`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoComentario),
    });

    if (res.ok) {
      const atualizados = await fetch(`http://localhost:3200/comentariosBlog/${id}`).then(r => r.json());
      setComments(atualizados);
      setComentario('');
    } else {
      setMensagem('❌ Erro ao enviar comentário.');
    }
  };

  return (
    <div className="blog-comentarios">

      <form onSubmit={enviarComentario} className="mb-4p-3 rounded">
        {mensagem && <div className="alert alert-info">{mensagem}</div>}

        {/* Campo oculto com ID do post */}
        <input type="hidden" name="post_id" value={id} />

<div className='inputbtn'>
       <textarea
          className="form-control shadow-sm comentario-textarea"
          placeholder="Compartilhe sua opinião..."
          rows="3"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        ></textarea>
        <div className="mt-3">
          <button className="btn-comentar" type="submit">
           Enviar
          </button>
        </div>
</div>
 

      </form>

      <div className={`lista-comentarios ${poppins.className}`}>
        {comments.length > 0 ? (
          comments.map((comentario) => (
            <div key={comentario.id} className="comentario-item border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center mb-1">
                <div className="avatar-comentario me-2">
                  {(comentario.user_name)[0]}
                </div>
                <div>
                  <strong>{comentario.user_name}</strong>
                  <div className="text-muted small">
                    {new Date(comentario.data_publicacao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              <p className="mb-2">{comentario.comentario}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">Nenhum comentário ainda.</p>
        )}
      </div>
    </div>
  );
}
