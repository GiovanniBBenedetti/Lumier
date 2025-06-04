"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [usuario, setUsuario] = useState('')
  return (
    <div className="d-flex flex-column">
      <div className="container">
        <Link href="/login"><button type="button" className="btn btn-secondary w-100 rounded-0 mb-5">Login</button></Link>
      </div>
      <div className="container">
        <Link href="/noticias"><button type="button" className="btn btn-secondary w-100 rounded-0 mb-5">Noticias</button></Link>
      </div>
      <div className="container">
        <Link href="/cadastro"><button type="button" className="btn btn-secondary w-100 rounded-0 mb-5">Cadastro</button></Link>
      </div>
    </div>
  );
}
