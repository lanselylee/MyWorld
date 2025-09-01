"use client"
import { useCallback, useEffect, useRef, useState } from 'react'

type Meteor = {
  id: number
  x: number
  y: number
  delay: number
  length: number
}

export default function MeteorShower() {
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const idRef = useRef(0)

  const spawn = useCallback(() => {
    const count = 6 + Math.floor(Math.random() * 6)
    const items: Meteor[] = Array.from({ length: count }).map(() => {
      idRef.current += 1
      return {
        id: idRef.current,
        x: Math.random() * window.innerWidth + window.innerWidth * 0.5,
        y: -Math.random() * window.innerHeight * 0.5,
        delay: Math.random() * 0.8,
        length: 80 + Math.random() * 120,
      }
    })
    setMeteors((prev) => [...prev, ...items])
    // Cleanup later
    window.setTimeout(() => {
      setMeteors((prev) => prev.filter((m) => items.findIndex((i) => i.id === m.id) === -1))
    }, 2500)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '*') {
        spawn()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [spawn])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="block absolute h-[2px] bg-black/70"
          style={{
            top: m.y,
            left: m.x,
            width: m.length,
            transform: 'rotate(45deg)',
            boxShadow: '0 0 0 2px #000',
            animation: `meteor 1.8s ${m.delay}s ease-out forwards`,
            background: 'linear-gradient(to right, rgba(124,58,237,0.9), rgba(0,0,0,0.6))',
          }}
        />
      ))}
    </div>
  )
}



