'use client';

import { useEffect, useState } from 'react';
import './Modal.css';

export default function ModalRecados({ turma, token }) {
  const [recados, setRecados] = useState([]);

  useEffect(() => {
    if (turma && token) {
      fetch(`http://localhost:3200/recados/${turma}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRecados(data);
          }
        })
        .catch(err => console.error('Erro ao buscar recados:', err));
    }
  }, [turma, token]);

  return (
    <div className="modal fade" id="modalRecados" tabIndex="-1" aria-labelledby="modalRecadosLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalRecadosLabel">Recados da sua turma</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            {recados.length > 0 ? (
              <ul className="list-unstyled">
                {recados.slice(0, 6).map((recado, idx) => (
                  <li key={idx} className="mb-3 border-bottom pb-2">
                    <strong>{recado.titulo}</strong><br />
                    <small>{new Date(recado.data_publicacao).toLocaleDateString('pt-BR')}</small><br />
                    <span>{recado.conteudo}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Sem notificações no momento.</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btnFechar" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
