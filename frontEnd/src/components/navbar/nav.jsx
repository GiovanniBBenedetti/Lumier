'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <nav className='d-flex gap-5'>
            <Link href='/'>Home</Link>
            <Link href='/blogs'>Blogs</Link>
            <Link href={'/login'}>Login</Link>
        </nav>
    )
}
