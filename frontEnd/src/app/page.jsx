'use client';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import './home.css'


const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Page() {
  const [eventos, setEventos] = useState([]);
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const [mesSelecionado, setMesSelecionado] = useState(meses[new Date().getMonth()]);

  useEffect(() => {
    const fetchEventos = async () => {
      const res = await fetch('http://localhost:3200/eventos');
      const data = await res.json();
      setEventos(data);
    };
    fetchEventos();
  }, []);

  const getMesExtenso = (dataStr) => {
    const data = new Date(dataStr);
    return meses[data.getMonth()];
  };

  const getIcone = (nome) => {
    const nomeLower = nome.toLowerCase();
    if (nomeLower.includes('entretenimento')) return <img className='logoEvento' src="./entretenimento.png" alt="" />;
    if (nomeLower.includes('escola')) return <img className='logoEvento' src="./escola.png" alt="" />;
    if (nomeLower.includes('esportes')) return <img className='logoEvento' src="./esportes.png" alt="" />;
    return '📅';
  };


  const eventosDoMes = eventos.filter(evento => getMesExtenso(evento.data_evento) === mesSelecionado);

  return (
    <>
      <div className="container my-5">


        <div className="row align-items-center mb-5">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h1 className={`${poppins.className} fw-bold text-purple`} >
              Ilumine sua organização com o calendario LUMIER
            </h1>
          </div>


          <div className="col-12 col-md-6">
            <div className="row">
              {meses.map((mes) => (
                <div
                  className={`col-6 col-md-4 mb-2 text-center ${poppins.className}`}
                  key={mes}
                >
                  <button
                    className={`${mes === mesSelecionado ? "btn-selecionado" : "btn-mes"}`}
                    onClick={() => setMesSelecionado(mes)}
                  >
                    {mes}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="row">
          {eventosDoMes.length > 0 ? (
            eventosDoMes.map(evento => (
              <div className="col-12 col-md-4 mb-4" key={evento.id}>
                <div className="cardEventos h-100">
                  <div className='d-flex align-items-center gap-3'>
                    <div className="container-iconeEvento">
                      {getIcone(evento.tipo)}
                    </div>

                    <div className='tituloEvento'>
                      <h4 className={`${poppins.className} gap-3 m-0`}>
                        <strong>{new Date(evento.data_evento).toLocaleDateString('pt-BR')}</strong>
                      </h4>
                      <h3 className={`${poppins.className}`}>{evento.evento}</h3>
                    </div>


                  </div>

                  <p className={`${poppins.className}my-5`}>{evento.descricao}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center fs-4">Não existe nenhum evento neste mês.</p>
            </div>
          )}
        </div>



      </div>

    </>
  );
}
