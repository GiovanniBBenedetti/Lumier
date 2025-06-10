
import { Poppins } from 'next/font/google';
import './home.css';
import EventosHome from '@/components/eventosHome/eventosHome'
import IntroHome from '@/components/IntroHome/IntroHome';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Page() {

  return (

    <>

      <IntroHome/>
      <EventosHome/>
 




      <div className='part2'>

      </div>



      <section className={`sobre-nos-section ${poppins.className}`}>

      </section>
   
    </>
  );
}
