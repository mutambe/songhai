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

const LIGHT_COLORS = ['#c89b3c', '#2f6e62', '#1b3a4b']
// Cores mais claras no escuro — as do modo claro (ex.: o azul-marinho)
// ficam quase invisíveis sobre um fundo quase preto.
const DARK_COLORS = ['#d4b066', '#5dd9c1', '#a8d5ee']

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
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark'
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

      const colors = isDark ? DARK_COLORS : LIGHT_COLORS
      const count = Math.min(Math.floor((width * height) / 11000), 90)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 1,
        speed: Math.random() * 0.35 + 0.12,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.02 + 0.008,
      }))
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const alphaBase = isDark ? 0.45 : 0.35
      const alphaAmp = isDark ? 0.5 : 0.45
      for (const p of particles) {
        p.y -= p.speed
        p.phase += p.twinkle
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        const alpha = alphaBase + Math.abs(Math.sin(p.phase)) * alphaAmp
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

    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.getAttribute('data-theme') === 'dark'
      if (nowDark !== isDark) {
        isDark = nowDark
        build()
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
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
