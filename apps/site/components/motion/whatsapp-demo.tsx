'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCheck, Bot } from 'lucide-react'

type Message = { from: 'client' | 'agent'; text: string; time: string }

// Conversa ilustrativa (não é de um cliente real) — mostra em segundos o que
// um agente faz: responde fora de horas, dá preço, fecha a venda com M-Pesa.
const MESSAGES: Message[] = [
  { from: 'client', text: 'Boa noite, têm cimento de 50kg? Quanto custa?', time: '21:47' },
  {
    from: 'agent',
    text: 'Boa noite! Temos sim, em stock ✅\nCimento 50kg: 650 MZN/saco.\nQuantos sacos precisa?',
    time: '21:47',
  },
  { from: 'client', text: '20 sacos. Entregam na Matola?', time: '21:48' },
  {
    from: 'agent',
    text: 'Entregamos 🚚\nTotal: 13.000 MZN + 500 MZN de entrega.\nEnvio a referência M-Pesa para confirmar?',
    time: '21:48',
  },
  { from: 'client', text: 'Pode enviar 👍', time: '21:48' },
  {
    from: 'agent',
    text: 'Enviada! Assim que o pagamento entrar, a entrega fica marcada para amanhã às 9h.',
    time: '21:49',
  },
]

const STEP_MS = 1600

export function WhatsAppDemo() {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(1)
  // Muda a cada recomeço, para as mensagens voltarem a entrar animadas
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    // Depois da última mensagem, espera um pouco e recomeça a conversa
    const delay = count >= MESSAGES.length ? STEP_MS * 3 : STEP_MS
    const id = window.setTimeout(() => {
      if (count >= MESSAGES.length) {
        setCycle((c) => c + 1)
        setCount(1)
      } else {
        setCount(count + 1)
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [count, reduceMotion])

  const visible = MESSAGES.slice(0, reduceMotion ? MESSAGES.length : count)
  const nextIsAgent = !reduceMotion && count < MESSAGES.length && MESSAGES[count].from === 'agent'

  return (
    <figure className="mx-auto w-full max-w-sm" aria-label="Exemplo de conversa com um agente de IA no WhatsApp">
      <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#1f2c34] bg-[#1f2c34] shadow-2xl shadow-ink/20">
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Ferragem Exemplo</p>
            <p className="text-xs text-white/75">Agente IA · online</p>
          </div>
        </div>

        {/* key={cycle}: ao recomeçar, a conversa é remontada em vez de animar a saída */}
        <div
          key={cycle}
          className="flex h-[27rem] flex-col justify-end gap-2 overflow-hidden bg-[#efeae2] px-3 py-4"
          aria-live="off"
        >
          {visible.map((m, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[85%] shrink-0 whitespace-pre-line rounded-lg px-3 py-2 text-[13px] leading-snug text-[#111b21] shadow-sm ${
                m.from === 'agent' ? 'self-end rounded-tr-none bg-[#d9fdd3]' : 'self-start rounded-tl-none bg-white'
              }`}
            >
              {m.text}
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#54656f]">
                {m.time}
                {m.from === 'agent' && <CheckCheck className="h-3 w-3 text-[#53bdeb]" aria-hidden="true" />}
              </span>
            </motion.div>
          ))}

          {nextIsAgent && (
            <div className="shrink-0 self-end rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 py-2.5 shadow-sm" aria-hidden="true">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-[#667781]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-soft">
        Exemplo ilustrativo · agente a vender às 21h47, com a loja fechada
      </figcaption>
    </figure>
  )
}
