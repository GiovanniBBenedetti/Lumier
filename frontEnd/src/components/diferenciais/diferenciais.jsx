import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './diferenciais.css';

export default function DiferenciaisEscola() {
  return (
    <section className="diferenciais-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="main-title">A LUZ QUE ILUMINA O FUTURO E O DIFERENCIAL</h1>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="diferencial-card h-100 p-4">
              <h2 className="diferencial-title">LOCALIZAÇÃO ESTRATÉGICA</h2>
              <p className="diferencial-text">
                Nossa escola está localizada em uma região privilegiada de Alphaville, SP, com fácil acesso pelos principais vias da cidade. Um endereço estratégico que garante comodidade e segurança para as famílias da região.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="diferencial-card h-100 p-4">
              <h2 className="diferencial-title">TECNOLOGIA ENRAIZADA</h2>
              <p className="diferencial-text">
                Nossa estrutura conta com mais de cinco salas equipadas com tecnologias integradas, como lousas digitais e recursos interativos. Tudo foi pensado para tornar as aulas mais envolventes e alinhadas às demandas da educação contemporânea.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="diferencial-card h-100 p-4">
              <h2 className="diferencial-title">INFRAESTRUTURA COMPLETA</h2>
              <p className="diferencial-text">
                Com uma infraestrutura ampla e moderna, nossa escola está preparada para receber mais de 1000 alunos com conforto, segurança e eficiência, garantindo um ambiente ideal para o aprendizado e o desenvolvimento.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="diferencial-card h-100 p-4">
              <h2 className="diferencial-title">FUNDAMENTAÇÃO CHAVE</h2>
              <p className="diferencial-text">
                Nossa escola oferece ensino Fundamental, Médio e Técnico, com uma abordagem pedagógica atual. Valorizamos o desenvolvimento completo dos alunos, preparando-os com excelência para os desafios acadêmicos e do mercado de trabalho.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="diferencial-card h-100 p-4">
              <h2 className="diferencial-title">HORÁRIOS FLEXÍVEIS</h2>
              <p className="diferencial-text">
                Pensando na rotina dos alunos e de suas famílias, a escola disponibiliza uma ampla variedade de turmas: diurno, noturno, integral e vespertino. Essa flexibilidade permite que cada estudante tenha equilíbrio entre estudo, trabalho e vida pessoal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}