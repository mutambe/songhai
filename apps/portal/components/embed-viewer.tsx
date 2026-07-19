'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react'

export function EmbedViewer({
  title,
  description,
  href,
}: {
  title: string
  description?: string
  href: string
}) {
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
        <h1 className="font-serif text-2xl font-semibold text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
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
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir numa aba
          </a>
        </div>
        <iframe
          src={href}
          title={title}
          className="w-full flex-1"
          // Ficheiros HTML carregados no painel (/dashboards/*.html) correm no
          // mesmo domínio do Portal — sandbox sem "allow-same-origin" impede
          // que esse conteúdo leia cookies/localStorage do Portal, mesmo que
          // uma conta de admin seja comprometida. Embeds externos (ex.:
          // PowerBI) precisam do próprio contexto de origem para funcionar,
          // por isso ficam sem sandbox.
          sandbox={href.startsWith('/') ? 'allow-scripts allow-popups' : undefined}
        />
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        Se o conteúdo não aparecer aqui, esta ferramenta pode bloquear a incorporação por
        segurança própria — nesse caso, usa "Abrir numa aba".
      </p>
    </div>
  )
}
