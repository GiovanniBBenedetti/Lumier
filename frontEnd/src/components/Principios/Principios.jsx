'use client';

import './Principios.css';
import { Poppins } from 'next/font/google';
import Horizon  from "next/font/local"

const HorizonFont = Horizon({
  src: '../fontes/horizon.otf'
})


const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Principios() {
  return (
    <section className={`principios-section ${poppins.className}`}>
      <div className="container ">
        <h1 className="tituloPrincipios">
        A VERDADE EM CADA NOTÍCIA LUMIER
        </h1>
        <div className="seloPrincipios">Nossos princípios</div>

        <div className="row mt-5">
          {/* MISSÃO */}
          <div className="col-12 col-md-4 mb-4 text-center">
            <div className="icone-circulo">
              <img src="/Missão.png" alt="Missão" />
            </div>
            <h4 className={`${HorizonFont.className} rotulo`}>MISSÃO</h4>
            <p className="descricao">
              Oferecer uma educação de excelência que estimule o desenvolvimento intelectual, emocional e social dos alunos, formando cidadãos conscientes, éticos e preparados para transformar o mundo com responsabilidade e autonomia.
            </p>
          </div>

          {/* VISÃO */}
          <div className="col-12 col-md-4 mb-4 text-center">
            <div className="icone-circulo">
              <img src="/Foco.png" alt="Visão" />
            </div>
            <h4 className={`${HorizonFont.className} rotulo`}>VISÃO</h4>
            <p className="descricao">
              Ser reconhecido como uma escola de referência na formação integral de estudantes, promovendo inovação, senso crítico e compromisso com a construção de uma sociedade mais justa, colaborativa e sustentável.
            </p>
          </div>

          {/* VALORES */}
          <div className="col-12 col-md-4 mb-4 text-center">
            <div className="icone-circulo">
              <img src="/Valores.png" alt="Valores" />
            </div>
            <h4 className={`${HorizonFont.className} rotulo`}>VALORES</h4>
            <p className="descricao">
              O Colégio Lumier fundamenta suas ações no respeito, na ética, na responsabilidade e na empatia. Valoriza o conhecimento, a criatividade, a diversidade e o trabalho coletivo como pilares para uma educação transformadora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
