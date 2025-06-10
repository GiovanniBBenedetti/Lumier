'use client';

import './LinhaDoTempo.css';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function LinhaDoTempo() {
  const eventos = [
    {
      titulo: 'INAUGURAÇÃO',
      ano: '2000',
      descricao: 'Inauguração do Colégio Lumier com turmas da Educação Infantil e Ensino Fundamental I.',
      imagem: '/LinhaTempo1.png',
      cor: 'destaque-amarelo',
    },
    {
      titulo: 'NOVA SEDE',
      ano: '2010',
      descricao: 'Mudança para a nova sede, com infraestrutura ampliada e moderna.',
      imagem: '/LinhaTempo2.png',
      cor: 'destaque-roxo',
    },
    {
      titulo: 'FORMAÇÃO',
      ano: '2015',
      descricao: 'Início das turmas do Ensino Médio, completando a educação básica.',
      imagem: '/LinhaTempo3.png',
      cor: 'destaque-amarelo',
    },
    {
      titulo: 'QUALIDADE',
      ano: '2020',
      descricao: 'Colégio Lumier recebe selo de qualidade educacional em nível estadual.',
       imagem: '/LinhaTempo4.png',
      cor: 'destaque-amarelo',
    },
    {
      titulo: 'LUMIER NEWS',
      ano: '2025',
      descricao: 'Criação e publicação da nova plataforma de notícias Lumier News.',
       imagem: '/LinhaTempo5.png',
      cor: 'destaque-roxo',
    },
  ];

  return (
    <section className={`linha-tempo-section ${poppins.className}`}>
      <div className="container">
        <h1 className="titulo-linha">NOSSA TRAJETÓRIA ATE O LUMIER NEWS</h1>
        <div className="selo">Mais de 20 anos de legado</div>

        <div className="linha-horizontal mt-5 position-relative">
          {eventos.map((evento, i) => (
            <div className="evento" key={i}>
              <h5 className={`evento-titulo ${evento.cor}`}>{evento.titulo}</h5>
              <div className={`imagem-evento ${evento.cor}`}>
                <img src={evento.imagem} alt={evento.titulo} />
              </div>
              <h4 className={`evento-ano ${evento.cor}`}>{evento.ano}</h4>
              <p className="evento-descricao">{evento.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
