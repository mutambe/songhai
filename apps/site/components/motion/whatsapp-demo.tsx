'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Bot, Camera, CheckCheck, MessageCircle, Mic, Phone, Search, Smile } from 'lucide-react'

type Message = { from: 'client' | 'agent'; text: string; time: string }

// Conversa ilustrativa (não é de um cliente real) — mostra em segundos o que
// um agente faz: responde fora de horas, dá preço, fecha a venda com M-Pesa.
const MESSAGES: Message[] = [
  { from: 'client', text: 'Boa noite, têm cimento de 50kg? Quanto custa?', time: '21:47' },
  {
    from: 'agent',
    text: 'Boa noite! Temos sim, em stock.\nCimento 50kg: 650 MZN/saco.\nQuantos sacos precisa?',
    time: '21:47',
  },
  { from: 'client', text: '20 sacos. Entregam na Matola?', time: '21:48' },
  {
    from: 'agent',
    text: 'Entregamos.\nTotal: 13.000 MZN + 500 MZN de entrega.\nEnvio a referência M-Pesa para confirmar?',
    time: '21:48',
  },
  { from: 'client', text: 'Pode enviar.', time: '21:48' },
  {
    from: 'agent',
    text: 'Enviada! Assim que o pagamento entrar, a entrega fica marcada para amanhã às 9h.',
    time: '21:49',
  },
]

const STEP_MS = 1600

// Os tamanhos estão em cqw (largura da imagem) para a conversa escalar com os aparelhos.
function Bubbles({
  messages,
  reduceMotion,
  typing,
  small,
}: {
  messages: Message[]
  reduceMotion: boolean | null
  typing: boolean
  small?: boolean
}) {
  return (
    <>
      {messages.map((m) => (
        <motion.div
          key={m.text}
          initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`shrink-0 whitespace-pre-line leading-snug ${
            small
              ? 'max-w-[92%] rounded-[0.7cqw] px-[0.8cqw] py-[0.6cqw] text-[1.15cqw]'
              : 'max-w-[74%] rounded-[1cqw] px-[1.4cqw] py-[1cqw] text-[1.85cqw]'
          } ${
            m.from === 'agent'
              ? 'self-end rounded-tr-none bg-[#5ccf6c] text-[#06210d] shadow-[0_0_2cqw_rgba(92,207,108,0.4)]'
              : 'self-start rounded-tl-none bg-[#d9dcdd] text-[#121516]'
          }`}
        >
          {m.text}
          <span
            className={`mt-[0.3cqw] flex items-center justify-end gap-[0.4cqw] opacity-70 ${small ? 'text-[0.75cqw]' : 'text-[1.1cqw]'}`}
          >
            {m.time}
            {m.from === 'agent' && (
              <CheckCheck className={small ? 'h-[0.9cqw] w-[0.9cqw]' : 'h-[1.3cqw] w-[1.3cqw]'} aria-hidden="true" />
            )}
          </span>
        </motion.div>
      ))}
      {typing && (
        <div
          className={`shrink-0 self-end rounded-tr-none bg-[#5ccf6c] ${
            small ? 'rounded-[0.7cqw] px-[0.8cqw] py-[0.6cqw]' : 'rounded-[1cqw] px-[1.4cqw] py-[1.2cqw]'
          }`}
          aria-hidden="true"
        >
          <span className="flex gap-[0.4cqw]">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className={`rounded-full bg-[#06210d]/70 ${small ? 'h-[0.6cqw] w-[0.6cqw]' : 'h-[0.9cqw] w-[0.9cqw]'}`}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
              />
            ))}
          </span>
        </div>
      )}
    </>
  )
}

export function WhatsAppDemo() {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(3)
  // Muda a cada recomeço, para as mensagens voltarem a entrar animadas
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    // Depois da última mensagem, espera um pouco e recomeça a conversa
    const delay = count >= MESSAGES.length ? STEP_MS * 3 : STEP_MS
    const id = window.setTimeout(() => {
      if (count >= MESSAGES.length) {
        setCycle((c) => c + 1)
        setCount(3)
      } else {
        setCount(count + 1)
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [count, reduceMotion])

  const visible = MESSAGES.slice(0, reduceMotion ? MESSAGES.length : count)
  const nextIsAgent = !reduceMotion && count < MESSAGES.length && MESSAGES[count].from === 'agent'

  return (
    <figure data-ui className="mx-auto w-full max-w-[760px] lg:-ml-[55%] lg:w-[155%] lg:max-w-none" aria-label="Conversa com um agente de IA no WhatsApp">
      {/* Imagem dos aparelhos com o ecrã em branco; a conversa é desenhada por cima. */}
      <div className="overflow-hidden sm:overflow-visible">
      {/* Em telemóvel mostra só o portátil, ampliado, para a conversa se ler. */}
      <div className="relative -ml-[60%] aspect-[1672/941] w-[175%] [container-type:inline-size] sm:ml-0 sm:w-full">
        {/* A imagem passa dos limites do ecrã e desvanece nas bordas, para ficar dentro da secção. */}
        <Image
          src="/mockup-dispositivos.webp"
          alt=""
          width={2072}
          height={1201}
          sizes="(min-width: 1024px) 48vw, 120vw"
          className="pointer-events-none absolute max-w-none"
          style={{ left: '-11.96%', top: '-13.82%', width: '123.92%', height: '127.63%' }}
        />

        {/* Ecrã do portátil */}
        <div
          className="absolute flex flex-col overflow-hidden bg-[#0b0e0f] text-white"
          style={{ left: '36.7%', top: '8.3%', width: '53.5%', height: '63.2%' }}
        >
          <div className="flex items-center gap-[1.2cqw] border-b border-white/5 bg-[#171b1c] px-[1.6cqw] py-[1cqw]">
            <ArrowLeft className="h-[1.8cqw] w-[1.8cqw] shrink-0" aria-hidden="true" />
            <span className="flex h-[3cqw] w-[3cqw] shrink-0 items-center justify-center rounded-full bg-[#5ccf6c] text-[#06210d]">
              <Bot className="h-[1.9cqw] w-[1.9cqw]" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[1.6cqw] font-semibold">Loja de Materiais</p>
              <p className="text-[1.1cqw] text-[#5ccf6c]">online · 21:47</p>
            </div>
            <span className="flex items-center gap-[0.6cqw] rounded-full bg-black/40 px-[1cqw] py-[0.5cqw] text-[1.1cqw] font-semibold ring-1 ring-[#5ccf6c]/40">
              <MessageCircle className="h-[1.4cqw] w-[1.4cqw] text-[#5ccf6c]" aria-hidden="true" />
              WhatsApp Business
            </span>
            <Search className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-white/70" aria-hidden="true" />
            <Phone className="h-[1.8cqw] w-[1.8cqw] shrink-0 text-white/70" aria-hidden="true" />
          </div>

          {/* key={cycle}: ao recomeçar, a conversa é remontada em vez de animar a saída */}
          <div
            key={cycle}
            className="flex min-h-0 flex-1 flex-col justify-end gap-[1cqw] overflow-hidden px-[1.8cqw] pb-[1cqw] pt-[2cqw] [mask-image:linear-gradient(to_bottom,transparent,black_6cqw)]"
            aria-live="off"
          >
            <span className="mb-[0.4cqw] self-center rounded-full bg-white/10 px-[1.2cqw] py-[0.2cqw] text-[1.1cqw] text-white/70">
              Hoje
            </span>
            <Bubbles messages={visible} reduceMotion={reduceMotion} typing={nextIsAgent} />
          </div>

          <div className="flex items-center gap-[1cqw] px-[1.4cqw] pb-[1.2cqw] text-white/60" aria-hidden="true">
            <div className="flex flex-1 items-center gap-[1cqw] rounded-full bg-[#1f2425] px-[1.4cqw] py-[0.9cqw] text-[1.3cqw]">
              <Smile className="h-[1.8cqw] w-[1.8cqw]" />
              <span className="flex-1">Mensagem</span>
              <Camera className="h-[1.8cqw] w-[1.8cqw]" />
            </div>
            <span className="flex h-[3.2cqw] w-[3.2cqw] items-center justify-center rounded-full bg-[#5ccf6c] text-[#06210d]">
              <Mic className="h-[1.8cqw] w-[1.8cqw]" />
            </span>
          </div>
        </div>

        {/* Ecrã do telemóvel */}
        <div
          className="absolute hidden flex-col overflow-hidden rounded-[2.4cqw] bg-[#0f1213] text-white sm:flex"
          style={{ left: '6.4%', top: '11.4%', width: '17%', height: '66.5%' }}
        >
          <div className="flex justify-center">
            <span className="h-[2.4cqw] w-[9.5cqw] rounded-b-[1.4cqw] bg-black" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-[0.6cqw] border-b border-white/5 px-[1cqw] pb-[0.7cqw] pt-[0.6cqw]">
            <ArrowLeft className="h-[1.1cqw] w-[1.1cqw]" aria-hidden="true" />
            <span className="flex h-[2cqw] w-[2cqw] items-center justify-center rounded-full bg-[#5ccf6c] text-[#06210d]">
              <Bot className="h-[1.2cqw] w-[1.2cqw]" aria-hidden="true" />
            </span>
            <span className="truncate text-[1cqw] font-semibold">Loja de Materiais</span>
          </div>
          <div
            key={cycle}
            className="flex min-h-0 flex-1 flex-col justify-end gap-[0.7cqw] overflow-hidden px-[0.8cqw] pb-[0.8cqw] pt-[1.5cqw] [mask-image:linear-gradient(to_bottom,transparent,black_3cqw)]"
            aria-hidden="true"
          >
            <Bubbles messages={visible.slice(-3)} reduceMotion={reduceMotion} typing={nextIsAgent} small />
          </div>
          <div className="flex items-center gap-[0.6cqw] px-[0.8cqw] pb-[1cqw] text-white/60" aria-hidden="true">
            <span className="flex-1 rounded-full bg-[#1f2425] px-[1cqw] py-[0.5cqw] text-[0.9cqw]">Mensagem</span>
            <span className="flex h-[2cqw] w-[2cqw] items-center justify-center rounded-full bg-[#5ccf6c] text-[#06210d]">
              <Mic className="h-[1.1cqw] w-[1.1cqw]" />
            </span>
          </div>
        </div>
      </div>
      </div>
      <figcaption className="mt-3 text-center text-sm">
        Agente a vender às 21h47, com a loja fechada
      </figcaption>
    </figure>
  )
}
