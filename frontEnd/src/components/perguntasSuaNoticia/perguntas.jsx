'use client';

import { Poppins } from 'next/font/google';
import './FaleConosco.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function FaleConosco() {
  return (
    <div className={`fale-conosco-section ${poppins.className}`}>
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          {/* Lado esquerdo */}
          <div className="col-12 col-lg-6">
            <h1 className="titulo">SANE SUAS DÚVIDAS, <br />FALE CONOSCO!</h1>
            <p className="subtitulo">NÃO ENCONTROU UMA RESPOSTA PARA SUA DÚVIDA? CONTATE-NOS</p>

            <div className="row mt-4 contatos">
              <div className="col-12 col-md-4 text-center">
                <div className="icone"><i className="bi bi-telephone-fill"></i></div>
                <p>+55 11 99292–42345</p>
              </div>
              <div className="col-12 col-md-4 text-center">
                <div className="icone"><i className="bi bi-envelope-fill"></i></div>
                <p>Lumier@gmail.com</p>
              </div>
              <div className="col-12 col-md-4 text-center">
                <div className="icone"><i className="bi bi-geo-alt-fill"></i></div>
                <p>Avenida Lumier, CEP<br />00000–000</p>
              </div>
            </div>
          </div>

          {/* Lado direito - Accordion Bootstrap */}
          <div className="col-12 col-lg-6">
            <div className="accordion" id="faqAccordion">
              {[
                {
                  pergunta: 'Como posso enviar uma notícia estudantil?',
                  resposta: 'Para enviar uma notícia estudantil, vá até a seção "Envie sua Notícia", preencha o formulário com título, conteúdo, imagem e clique em "Publicar". É necessário estar logado.'
                },
                {
                  pergunta: 'Preciso estar cadastrado para comentar nas notícias?',
                  resposta: 'Sim. Apenas usuários autenticados podem comentar nas notícias, garantindo mais segurança e responsabilidade nas interações.'
                },
                {
                  pergunta: 'Quem aprova as notícias antes de serem publicadas?',
                  resposta: 'Todas as notícias enviadas passam por uma moderação da equipe responsável antes de serem publicadas no portal. Isso garante que o conteúdo siga as diretrizes da instituição.'
                },

                {
                  pergunta: 'Quais tipos de conteúdo posso publicar?',
                  resposta: 'Você pode publicar notícias, eventos escolares, projetos acadêmicos, conquistas estudantis e iniciativas culturais ou esportivas.'
                },
                {
                  pergunta: 'O site é apenas para estudantes da instituição?',
                  resposta: 'Embora o foco seja a comunidade escolar, pais, professores e colaboradores também podem participar, desde que respeitem as diretrizes da plataforma.'
                }
              ].map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                      {item.pergunta}
                    </button>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      {item.resposta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
