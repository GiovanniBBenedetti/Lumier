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
                <p>+00 00 00000–0000<br />+00 00 00000–0000</p>
              </div>
              <div className="col-12 col-md-4 text-center">
                <div className="icone"><i className="bi bi-envelope-fill"></i></div>
                <p>email@gmail.com<br />email@gmail.com</p>
              </div>
              <div className="col-12 col-md-4 text-center">
                <div className="icone"><i className="bi bi-geo-alt-fill"></i></div>
                <p>avenida senai cep<br />00000–000</p>
              </div>
            </div>
          </div>

          {/* Lado direito - Accordion Bootstrap */}
          <div className="col-12 col-lg-6">
            <div className="accordion" id="faqAccordion">
              {[...Array(5)].map((_, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                      Pergunta frequente escrita aqui
                    </button>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Aqui você pode escrever a resposta da pergunta frequente. Pode incluir explicações, orientações ou links úteis.
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
