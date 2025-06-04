'use client'

import { useState } from 'react'
import './login.css'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
 

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3200/auth/login', {
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

      if (data.tipo === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }

    } catch (err) {
      console.error('Erro no login:', err)
      alert('Erro ao conectar com o servidor')
    }
  }

  return (
    <form className='loginContainer' onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
