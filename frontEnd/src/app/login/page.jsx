'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')



  return (
    <form>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  )
}