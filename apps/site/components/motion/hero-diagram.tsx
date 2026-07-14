'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [@media(prefers-reduced-motion:reduce)]:static"
    >
      <svg
        viewBox="0 0 1000 800"
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid of connection points */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c89b3c" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#2f6e62" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#c89b3c" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient
            id="flowGradient2"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2f6e62" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#c89b3c" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2f6e62" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Top left to center flow */}
        <path
          d="M 150 100 Q 300 200 400 250"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Center to right flow */}
        <path
          d="M 450 280 Q 600 350 750 400"
          stroke="url(#flowGradient2)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right to bottom flow */}
        <path
          d="M 800 420 Q 700 520 600 600"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Connection nodes */}
        <circle cx="150" cy="100" r="6" fill="#c89b3c" opacity="0.4" />
        <circle cx="400" cy="250" r="6" fill="#2f6e62" opacity="0.4" />
        <circle cx="750" cy="400" r="6" fill="#c89b3c" opacity="0.4" />
        <circle cx="600" cy="600" r="6" fill="#2f6e62" opacity="0.4" />

        {/* Subtle secondary paths */}
        <path
          d="M 250 180 L 350 300"
          stroke="#c89b3c"
          strokeWidth="1.5"
          opacity="0.15"
          fill="none"
          strokeDasharray="5,5"
        />
        <path
          d="M 700 350 L 850 500"
          stroke="#2f6e62"
          strokeWidth="1.5"
          opacity="0.15"
          fill="none"
          strokeDasharray="5,5"
        />
      </svg>
    </motion.div>
  )
}
