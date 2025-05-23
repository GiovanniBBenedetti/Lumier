'use client'


import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3200/auth/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      console.log(localStorage)
      router.push('/login');
    } catch (err) {
      alert('Login falhou, senha ou email estão incorretos ');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}