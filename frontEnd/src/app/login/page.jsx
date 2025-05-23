"use client"
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token)
      alert('Sucesso no login');
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
