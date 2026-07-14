'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react'
import type { Dashboard } from '@/lib/systems-store'

export function DashboardViewer({ dashboard }: { dashboard: Dashboard }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await containerRef.current.requestFullscreen()
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h1 className="font-serif text-2xl font-semibold text-foreground">{dashboard.name}</h1>
        {dashboard.description && (
          <p className="mt-1 text-sm text-ink-soft">{dashboard.description}</p>
        )}
      </div>

      {/* A barra de ações fica dentro do elemento que entra em ecrã inteiro,
          para o botão de sair continuar visível enquanto maximizado. */}
      <div
        ref={containerRef}
        className="flex h-[75vh] flex-col overflow-hidden rounded-2xl border border-line bg-paper"
      >
        <div className="flex items-center justify-end gap-2 border-b border-line bg-paper px-4 py-2.5">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {isFullscreen ? 'Sair de ecrã inteiro' : 'Maximizar'}
          </button>
          <a
            href={dashboard.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir numa aba
          </a>
        </div>
        <iframe src={dashboard.href} title={dashboard.name} className="w-full flex-1" />
      </div>
    </div>
  )
}
