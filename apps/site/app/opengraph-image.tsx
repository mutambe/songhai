import { readFile } from 'fs/promises'
import path from 'path'
import { ImageResponse } from 'next/og'
import { formatMZN, getPlan } from '@/lib/plans'

// Pré-visualização ao partilhar o link (WhatsApp, LinkedIn, Facebook, X).
export const alt = 'SONGHAI — Agentes de IA no WhatsApp para empresas em Moçambique'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const mark = await readFile(path.join(process.cwd(), 'public', 'songhai-mark-light.png'))
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0d212c 0%, #1e2158 100%)',
          color: '#f5f1e8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={86} height={64} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 6 }}>SONGHAI</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 960 }}>
            O seu WhatsApp a responder, qualificar e vender 24h por dia
          </span>
          <span style={{ marginTop: 28, fontSize: 30, color: '#d4b066' }}>
            {`Agentes de IA · A partir de ${formatMZN(getPlan('simples').monthly)}/mês · Pronto em 30 dias`}
          </span>
        </div>

        <span style={{ fontSize: 24, color: 'rgba(245,241,232,0.7)' }}>
          songhai.cc · Maputo, Moçambique
        </span>
      </div>
    ),
    size,
  )
}
