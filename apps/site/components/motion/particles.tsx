'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  size: number
  speed: number
  color: string
  phase: number
  twinkle: number
}

const COLORS = ['#c89b3c', '#2f6e62', '#1b3a4b']

export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(Math.floor((width * height) / 11000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speed: Math.random() * 0.35 + 0.12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.02 + 0.008,
      }))
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.speed
        p.phase += p.twinkle
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        const alpha = 0.22 + Math.abs(Math.sin(p.phase)) * 0.33
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }

    build()
    render()

    const onResize = () => build()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
