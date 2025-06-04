'use client'

import { useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' 

export default function HomePage() {
  const [date, setDate] = useState(new Date())

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Escolha uma data:</h1>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <p style={{ marginTop: '1rem' }}>
        Data selecionada: {date.toLocaleDateString('pt-BR')}
      </p>
    </div>
  )
}
