import Link from "next/link";
import styles from "./Card.module.css";

export default function CardHome({ titulo, imagem, subtitulo, nota, tipo, id }) {


  return (
    <div className={styles.card}>
      <div className={styles.tituloCard}>
        <h1>{titulo}</h1>
      </div>
      <div className={styles.imgCard}>
        <img src={imagem[0]} alt="" />
      </div>
      <div className={styles.textoCard}>
        <p>{subtitulo}</p>
      </div>
      <div className={styles.icons}>
        <div className={styles.score}>
          <p className={styles.nota}>{nota}</p>
          <img src="./estrela.png" className={styles.estrela} />
        </div>
        <div className={styles.botao}>
          <Link href={`/Tour/${id}`} className={styles.button}>
            Ver mais!
          </Link>
        </div>
        <img src="./seta.png" className={styles.seta} />
      </div>
    </div>
  );
}
