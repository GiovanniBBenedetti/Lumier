import './tour.css';
import { Poppins } from 'next/font/google';
import SliderCategorias from '@/components/sliderSwitter/page';
import DiferenciaisEscola from '@/components/diferenciais/diferenciais';
const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export default function Tour() {
    return (
        <>
    <style>
      {`
body{
  background-color: var(--cor4)!important;
}`}
    </style>

            <div className="bannerTour">
                <img src="/bannerTour.png" alt="Banner" />
            </div>
            <div className='container'>
                <h1 className={`text-center mb-5 ${poppins.className}`}>Conheça nosso ambiente escolar</h1>



            </div>
            <div className='categoriasTour'>
    <SliderCategorias></SliderCategorias>
</div>



    <DiferenciaisEscola></DiferenciaisEscola>



        </> 
    );
}
