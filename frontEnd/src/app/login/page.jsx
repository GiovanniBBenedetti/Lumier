'use client'

import { useState } from 'react'
import './login.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        toast.error(data.error || 'Senha ou usuário incorretos')
        return
      }

      toast.success('Login realizado com sucesso!')

      localStorage.setItem('token', data.token)
      localStorage.setItem('nome', data.nome)
      localStorage.setItem('tipo', data.tipo)
      localStorage.setItem('email', data.email)
      localStorage.setItem('turma', data.turma)

      setTimeout(() => {
        if (data.tipo === 'admin') {
          window.location.href = '/admin'
        } else {
          window.location.href = '/'
        }
      }, 1500) // Aguarda um pouco para o toast aparecer
    } catch (err) {
      console.error('Erro no login:', err)
      toast.error('Erro ao conectar com o servidor')
    }
  }

  return (
    <>
      <style>
        {`body { background-color: var(--cor1)!important; }`}
      </style>

      <div className='login'>
        <div className='login-container'>
          <div className='login-titulo'>
            <h1>SEJA BEM VINDO!</h1>
          </div>
          <form className='login-informacoes' onSubmit={handleLogin}>
            <div className='login-caixa-input'>
              <span className='login-label'>Email</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='login-caixa-input'>
              <span className='login-label'>Senha</span>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
            </div>

            <div className='login-botao'>
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
