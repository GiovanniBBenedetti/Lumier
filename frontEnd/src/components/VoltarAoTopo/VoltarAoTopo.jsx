'use client';

import { useEffect, useState } from 'react';
 import './VoltarAoTopo.css';

export default function BotBread() {
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setVisivel(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const irParaTopo = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        visivel && (
            <button
                onClick={irParaTopo}
                className="btn-voltar-topo rounded-circle "
            >
                <i className="bi bi-arrow-up-short fs-3"></i>
            </button>
        )
)
}