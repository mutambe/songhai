'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Workflow, Database, ClipboardCheck, GraduationCap, Handshake, PhoneCall, BarChart3 } from 'lucide-react'
import { Logo } from './logo'

interface Service {
  icon: React.ComponentType<{ className?: string }>
  label: string
  angle: number
}

const SERVICES: Service[] = [
  { icon: BarChart3, label: 'Automação ERP', angle: 0 },
  { icon: Workflow, label: 'Consultoria IA', angle: 45 },
  { icon: MessageSquare, label: 'Chatbot de IA', angle: 90 },
  { icon: Database, label: 'Agentes Autónomos', angle: 135 },
  { icon: ClipboardCheck, label: 'Processamento Docs', angle: 180 },
  { icon: Handshake, label: 'AI Partner Fracionado', angle: 225 },
  { icon: PhoneCall, label: 'Comunicação', angle: 270 },
  { icon: GraduationCap, label: 'Análise & Insights', angle: 315 },
]

const RADIUS = 280

export function SolutionsDiagram() {
  return (
    <div className="hidden lg:flex justify-center items-center py-16">
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: '1' }}>
        {/* SVG Background with concentric circles and connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="neon-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric circles */}
          {[1, 2, 3, 4, 5].map((i) => (
            <circle
              key={`circle-${i}`}
              cx="500"
              cy="500"
              r={60 + i * 65}
              fill="none"
              stroke="rgba(212, 165, 116, 0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Lines from center to each service */}
          {SERVICES.map((service, idx) => {
            const rad = (service.angle * Math.PI) / 180
            const x = 500 + RADIUS * Math.cos(rad)
            const y = 500 + RADIUS * Math.sin(rad)
            return (
              <line
                key={`line-${idx}`}
                x1="500"
                y1="500"
                x2={x}
                y2={y}
                stroke="rgba(212, 165, 116, 0.5)"
                strokeWidth="2"
                filter="url(#neon-glow)"
              />
            )
          })}

          {/* Mesh lines connecting adjacent services */}
          {SERVICES.map((service, idx) => {
            const nextService = SERVICES[(idx + 1) % SERVICES.length]
            const rad1 = (service.angle * Math.PI) / 180
            const rad2 = (nextService.angle * Math.PI) / 180
            const x1 = 500 + RADIUS * Math.cos(rad1)
            const y1 = 500 + RADIUS * Math.sin(rad1)
            const x2 = 500 + RADIUS * Math.cos(rad2)
            const y2 = 500 + RADIUS * Math.sin(rad2)
            return (
              <line
                key={`mesh-${idx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(212, 165, 116, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="5,5"
                filter="url(#neon-glow)"
              />
            )
          })}

          {/* Decorative particles/stars */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = Math.random() * Math.PI * 2
            const dist = 180 + Math.random() * 280
            const x = 500 + dist * Math.cos(angle)
            const y = 500 + dist * Math.sin(angle)
            const size = Math.random() * 2 + 0.5
            return (
              <circle
                key={`star-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill="rgba(212, 165, 116, 0.6)"
                opacity={Math.random() * 0.4 + 0.2}
              />
            )
          })}
        </svg>

        {/* Services - Neon circles */}
        {SERVICES.map((service, idx) => {
          const rad = (service.angle * Math.PI) / 180
          const x = RADIUS * Math.cos(rad)
          const y = RADIUS * Math.sin(rad)
          const Icon = service.icon

          return (
            <motion.div
              key={service.label}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.7, type: 'spring', stiffness: 80 }}
            >
              {/* Neon circle container */}
              <div className="relative group/service">
                {/* Outer glow layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold/30 to-gold/10 blur-xl opacity-0 group-hover/service:opacity-100 transition-opacity duration-300" />
                
                {/* Main neon circle */}
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/80 bg-indigo-deep/20 backdrop-blur-sm hover:border-gold hover:bg-indigo-deep/40 transition-all duration-300 group-hover/service:shadow-2xl"
                  style={{
                    boxShadow: '0 0 24px rgba(212, 165, 116, 0.5), inset 0 0 16px rgba(212, 165, 116, 0.15)',
                  }}
                >
                  <Icon className="h-10 w-10 text-gold group-hover/service:scale-110 transition-transform" />
                </div>
              </div>

              {/* Label */}
              <p className="mt-1 text-xs font-semibold text-center text-gold/90 w-28 leading-tight">
                {service.label}
              </p>
            </motion.div>
          )
        })}

        {/* Center Logo with premium glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 60, damping: 12 }}
            className="relative"
          >
            {/* Multiple glow layers for premium effect */}
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl animate-pulse" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
            <div className="absolute inset-0 rounded-full bg-gold/12 blur-2xl" />
            
            {/* Center circle with neon border */}
            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-gold/70 bg-indigo-deep/50 backdrop-blur-md hover:border-gold transition-all duration-300"
              style={{
                boxShadow: '0 0 60px rgba(212, 165, 116, 0.7), inset 0 0 30px rgba(212, 165, 116, 0.25), 0 0 120px rgba(212, 165, 116, 0.3)',
              }}
            >
              <Logo className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
