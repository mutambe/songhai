'use client'

import { useState, type ReactElement } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Bot, Workflow, Server, LayoutGrid } from 'lucide-react'
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

type Category = {
  label: string
  description: string
  icon: typeof Bot
  tools: Tool[]
}

const CDN = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

const CATEGORIES: Category[] = [
  {
    label: 'Inteligência Artificial',
    description: 'Modelos e agentes que pensam, escrevem e decidem.',
    icon: Bot,
    tools: [
      { name: 'OpenAI', slug: 'openai', invertOnLight: true },
      { name: 'Anthropic / Claude', slug: 'claude' },
      { name: 'Gemini', render: GeminiIcon },
      { name: 'DeepSeek', slug: 'deepseek' },
      { name: 'Qwen', slug: 'qwen', invertOnLight: true },
      { name: 'Mistral', slug: 'mistral' },
    ],
  },
  {
    label: 'Automação & Mensagens',
    description: 'Fluxos seguros que ligam tudo automaticamente.',
    icon: Workflow,
    tools: [
      { name: 'n8n', slug: 'n8n' },
      { name: 'Make', slug: 'make' },
      { name: 'Node-RED', slug: 'node-red' },
    ],
  },
  {
    label: 'Infraestrutura & Servidores',
    description: 'Alojamento próprio, seguro e sob o seu controlo.',
    icon: Server,
    tools: [
      { name: 'Docker', slug: 'docker' },
      { name: 'Portainer', slug: 'portainer' },
      { name: 'Supabase', slug: 'supabase' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Coolify', slug: 'coolify' },
    ],
  },
  {
    label: 'Dados & Gestão',
    description: 'Ferramentas para gerir, documentar e decidir com confiança.',
    icon: LayoutGrid,
    tools: [
      { name: 'Metabase', slug: 'metabase' },
      { name: 'OpenProject', slug: 'openproject' },
      { name: 'OrangeHRM', color: '#f68b1f' },
      { name: 'Wiki.js', color: '#1976d2' },
      { name: 'Paperless-ngx', slug: 'paperless-ngx' },
      { name: 'ERPNext', slug: 'erpnext' },
    ],
  },
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

const chipList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
}

const chipItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div
      className="group/toolcard flex flex-col items-center justify-center rounded-xl border border-line bg-sand p-6 transition-all duration-300 hover:border-teal/50 hover:bg-indigo-deep/5 hover:shadow-lg"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-paper transition-transform group-hover/toolcard:scale-125 mb-3">
        <div className="scale-150">
          <ToolIcon tool={tool} />
        </div>
      </div>
      <h4 className="text-center text-sm font-medium text-foreground group-hover/toolcard:text-teal transition-colors">
        {tool.name}
      </h4>
    </motion.div>
  )
}

export function Tools() {
  const [activeTab, setActiveTab] = useState(0)
  const reduceMotion = useReducedMotion()
  const activeCategory = CATEGORIES[activeTab]

  return (
    <section className="border-y border-line bg-paper py-20 lg:py-24">
      <Reveal className="mx-auto mb-12 max-w-3xl px-5 text-center lg:px-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-teal">
          Ferramentas & tecnologias
        </p>
        <h2 className="text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl">
          Alta proficiência em ferramentas de IA e automação
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft sm:text-base">
          De agentes de IA a automações e infraestrutura própria — integramos e
          alojamos as ferramentas certas para cada operação.
        </p>
      </Reveal>

      {/* Tab Navigation */}
      <div className="mx-auto mb-10 max-w-6xl px-5 lg:px-8">
        <div className="flex gap-2 overflow-x-auto rounded-full border border-line bg-sand p-1 sm:gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeTab === i
                  ? 'bg-indigo-deep text-paper'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Category Header */}
          <Reveal className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-deep text-paper">
              {<activeCategory.icon className="h-5 w-5" aria-hidden="true" />}
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {activeCategory.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {activeCategory.description}
              </p>
            </div>
          </Reveal>

          {/* Grid */}
          <motion.div
            className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.06 },
                    },
                  }
            }
            initial={reduceMotion ? undefined : 'hidden'}
            animate={reduceMotion ? undefined : 'show'}
          >
            {activeCategory.tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 10 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { type: 'spring', stiffness: 300, damping: 30 },
                        },
                      }
                }
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
