"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, senha)
      const res = await axios.post('http://localhost:3002/livros', {
        "email": email,
        "senha": senha,
    });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert('Login falhou, senha ou email estão incorretos ');
      console.log(err)
    }
  }

  return (
    <div className="d-flex">
      <form className="m-5" onSubmit={handleLogin}>
        <div >
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          placeholder="senha"
           onChange={e => setSenha(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

    </div>
  );
}
