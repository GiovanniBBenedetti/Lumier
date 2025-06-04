"use client"
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })
      
      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Erro ao fazer login')
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('nome', data.nome)

      console.log(data)
      if (data.tipo === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/comum';
      }

    } catch (err) {
      console.error('Erro no login:', err)
      alert('Erro ao conectar com o servidor')
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
