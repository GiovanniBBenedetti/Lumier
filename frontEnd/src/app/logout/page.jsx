'use client'

import { useEffect } from 'react'


export default function LogoutPage() {


  useEffect(() => {

    localStorage.removeItem('token')
    localStorage.removeItem('nome')
    window.location.href = '/';
  }, [])

  return (
    <p>Saindo...</p>
  )
}
