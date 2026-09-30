'use client'

import { useState, type ReactElement } from 'react'
import { Reveal } from '@/components/motion/reveal'

type Tool = {
  name: string
  slug?: string
  variant?: string
  /** brand color used for the monogram fallback */
  color?: string
  /** ícone é um traço monocromático branco — inverte para escuro no modo claro */
  invertOnLight?: boolean
  /** ícone renderizado inline em vez de carregado via CDN (para cor de marca fixa) */
  render?: () => ReactElement
}

function GeminiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover/chip:scale-110"
    >
      <path
        fill="#3186FF"
        fillRule="evenodd"
        d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
      />
    </svg>
  )
}

const CDN = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

// Só ferramentas que um dono de negócio reconhece. A infraestrutura
// (Docker, Postgres, etc.) fica nos bastidores — não ajuda a vender.
const TOOLS: Tool[] = [
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'OpenAI', slug: 'openai', invertOnLight: true },
  { name: 'Claude', slug: 'claude' },
  { name: 'Gemini', render: GeminiIcon },
  { name: 'M-Pesa', color: '#e60000' },
  { name: 'Google Calendar', slug: 'google-calendar' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Odoo', slug: 'odoo' },
  { name: 'ERPNext', slug: 'erpnext' },
]

function Monogram({ name, color }: { name: string; color?: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] text-[10px] font-bold text-white"
      style={{ backgroundColor: color ?? '#0f2a4a' }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function ToolIcon({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)

  if (tool.render) {
    return tool.render()
  }

  if (!tool.slug || failed) {
    return <Monogram name={tool.name} color={tool.color} />
  }

  return (
    <img
      src={`${CDN}/${tool.slug}/${tool.variant ?? 'default'}.svg`}
      alt=""
      aria-hidden="true"
      width={20}
      height={20}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-5 w-5 shrink-0 object-contain transition-transform duration-200 group-hover/chip:scale-110 ${
        tool.invertOnLight ? 'tool-icon-invert' : ''
      }`}
    />
  )
}

export function Tools() {
  return (
    <section className="border-y border-line bg-paper py-12">
      <Reveal className="mx-auto max-w-6xl px-5 text-center lg:px-8">
        <p className="text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
          Usamos os melhores modelos de IA do mercado e ligamos às ferramentas
          que o seu negócio já usa.
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {TOOLS.map((tool) => (
            <li
              key={tool.name}
              className="group/chip flex items-center gap-2 rounded-full border border-line bg-sand px-4 py-2 text-sm font-medium text-foreground"
            >
              <ToolIcon tool={tool} />
              {tool.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
