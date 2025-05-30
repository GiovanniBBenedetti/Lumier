'use client'

import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'

export default function Nav() {
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUsuario(decoded)
            } catch (err) {
                console.error('Token inválido:', err)
                localStorage.removeItem('token')
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <nav className='d-flex gap-5'>
            <Link href='/'>Home</Link>
            <Link href='/blogs'>Blogs</Link>
            {usuario ? (
                <>
                    <span>Olá {usuario.nome ?? 'usuário'}</span>
                    <button onClick={handleLogout}>Sair</button>
                </>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </nav>
    )
}
