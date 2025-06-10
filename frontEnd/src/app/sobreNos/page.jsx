'use client';

import './sobre.css';
import { Poppins } from 'next/font/google';
import LinhaDoTempo from '@/components/linhadoTempo/linhadoTempo';
import Principios from '@/components/Principios/Principios';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap',
});

export default function SobreNos() {
    return (
        <>
            <style>
      {`
body{
  background-color: var(--cor4)!important;
}`}
    </style>
<LinhaDoTempo></LinhaDoTempo>
<Principios></Principios>
        </>

    );
}
