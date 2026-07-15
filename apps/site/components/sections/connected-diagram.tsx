'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  MessageCircle,
  Mail,
  Users,
  Database,
  Share2,
  Calendar,
  Receipt,
  Building2,
} from 'lucide-react'

interface Node {
  icon: React.ComponentType<{ className?: string }>
  label: string
  angle: number
}

const NODES: Node[] = [
  { icon: MessageCircle, label: 'WhatsApp', angle: -90 },
  { icon: Mail, label: 'E-mail', angle: -45 },
  { icon: Database, label: 'Dados', angle: 0 },
  { icon: Receipt, label: 'Faturação', angle: 45 },
  { icon: Users, label: 'CRM', angle: 90 },
  { icon: Building2, label: 'ERP', angle: 135 },
  { icon: Share2, label: 'Redes Sociais', angle: 180 },
  { icon: Calendar, label: 'Agenda', angle: -135 },
]

const RADIUS = 340

export function ConnectedDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[2rem] border border-line bg-paper-muted p-6 sm:p-10">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, color-mix(in srgb, var(--gold) 18%, transparent), transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* concentric rings */}
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={`ring-${i}`}
            cx="500"
            cy="500"
            r={90 + i * 70}
            fill="none"
            stroke="var(--ink-soft)"
            strokeOpacity={0.15}
            strokeWidth="1"
          />
        ))}

        {/* spokes: center -> node */}
        {NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const x = 500 + RADIUS * Math.cos(rad)
          const y = 500 + RADIUS * Math.sin(rad)
          return (
            <motion.line
              key={`spoke-${node.label}`}
              x1="500"
              y1="500"
              x2={x}
              y2={y}
              stroke="var(--gold)"
              strokeOpacity={0.6}
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: 'easeOut' }}
            />
          )
        })}

        {/* mesh: node -> adjacent node */}
        {NODES.map((node, i) => {
          const next = NODES[(i + 1) % NODES.length]
          const rad1 = (node.angle * Math.PI) / 180
          const rad2 = (next.angle * Math.PI) / 180
          const x1 = 500 + RADIUS * Math.cos(rad1)
          const y1 = 500 + RADIUS * Math.sin(rad1)
          const x2 = 500 + RADIUS * Math.cos(rad2)
          const y2 = 500 + RADIUS * Math.sin(rad2)
          return (
            <line
              key={`mesh-${node.label}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--teal)"
              strokeOpacity={0.25}
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          )
        })}

        {/* flowing pulses along spokes */}
        {NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const x = 500 + RADIUS * Math.cos(rad)
          const y = 500 + RADIUS * Math.sin(rad)
          return (
            <motion.circle
              key={`pulse-${node.label}`}
              r={6}
              fill="var(--teal)"
              initial={{ cx: x, cy: y, opacity: 0 }}
              animate={{ cx: [x, 500], cy: [y, 500], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.2,
                delay: i * 0.35,
                repeat: Infinity,
                repeatDelay: NODES.length * 0.35,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* decorative particles */}
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2 + i
          const dist = 120 + ((i * 37) % 380)
          const x = 500 + dist * Math.cos(angle)
          const y = 500 + dist * Math.sin(angle)
          const size = 1 + (i % 3)
          return (
            <circle
              key={`star-${i}`}
              cx={x}
              cy={y}
              r={size}
              fill="var(--ink-soft)"
              opacity={0.2 + (i % 5) * 0.05}
            />
          )
        })}
      </svg>

      {/* outer nodes */}
      {NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180
        const left = 50 + (RADIUS / 1000) * 100 * Math.cos(rad)
        const top = 50 + (RADIUS / 1000) * 100 * Math.sin(rad)
        const Icon = node.icon
        return (
          <motion.div
            key={node.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${left}%`, top: `${top}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, type: 'spring', stiffness: 90 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/25 blur-lg" />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-panel sm:h-16 sm:w-16"
                style={{
                  boxShadow:
                    '0 0 18px color-mix(in srgb, var(--gold) 35%, transparent)',
                }}
              >
                <Icon className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
              </motion.div>
            </div>
            <span className="text-[11px] font-medium text-foreground/80 sm:text-xs">
              {node.label}
            </span>
          </motion.div>
        )
      })}

      {/* center logo */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white ring-2 ring-gold/85 sm:h-28 sm:w-28"
          style={{
            boxShadow:
              '0 0 40px color-mix(in srgb, var(--gold) 45%, transparent)',
          }}
        >
          <Image
            src="/songhai-logo.png"
            alt="SONGHAI"
            width={112}
            height={112}
            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          />
        </div>
      </div>
    </div>
  )
}
