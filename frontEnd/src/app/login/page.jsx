'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3200/auth/login', { email, senha })
      const { token } = res.data

      localStorage.setItem('token', token)

      const decoded = jwtDecode(token)

      if (decoded.tipo === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (err) {
      alert('Login falhou senha ou email estão incorretos !')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  )
}
