import Link from "next/link";

import "./CardTour.css"

export default function CardTour () {
    return (
        <div className="card cardTour">
            <div className="img imgCardTour">
                <img src="./Ambientes/auditorio1.jpg" alt="{titulo}" />
            </div>
            <div className="conteiner containerCardTour">
                <p>Título do Ambiente</p>
                <Link href="" className="botaoCardTour">
                    Ver mais!
                </Link>
            </div>
        </div>
    );
}
