
import { Poppins } from 'next/font/google';
import './home.css';
import EventosHome from '@/components/eventosHome/eventosHome'
import Categorias from "@/components/Categorias/Categorias";
import NoticiasRecentes from "@/components/NoticiasRecentes/NoticiasRecentes";

import Cardapio from "@/components/Cardapio/Cardapio";

import TourHome from "@/components/Tour/Tour";
import SobreHome from "@/components/SobreHome/SobreHome";



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

    <Categorias></Categorias>
    <NoticiasRecentes></NoticiasRecentes>
    <EventosHome/>
    <Cardapio></Cardapio>
    <SobreHome></SobreHome>



    
 






   
    </>
  );
}
