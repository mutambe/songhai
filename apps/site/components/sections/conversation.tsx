import { Reveal } from '@/components/motion/reveal'
import { WhatsAppDemo } from '@/components/motion/whatsapp-demo'

// Prova da ideia da página: a conversa de uma loja de materiais às 21h47.
export function Conversation() {
  return (
    <section id="conversa" className="scroll-mt-16 overflow-hidden bg-[var(--field-teal)] text-white">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="poster text-[clamp(2.4rem,6.4vw,7.5rem)]">
              <span className="block">Vendido às</span>
              <span className="block text-[var(--field-gold)]">21h47.</span>
            </h2>
            <p className="mt-8 max-w-[40ch] text-xl leading-snug sm:text-2xl">
              O cliente pergunta o preço de 20 sacos de cimento. O agente
              responde, calcula a entrega na Matola e envia a referência
              M-Pesa. Ninguém da loja teve de estar acordado.
            </p>
          </Reveal>

          <figure className="relative mt-12 max-w-xl rotate-[2.5deg]">
            <video
              className="aspect-[16/10] w-full object-cover"
              src="/video/conversa-2147.mp4"
              poster="/video/conversa-2147.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Relógio a marcar 21:47 e os passos da venda: pedido, preço, entrega e M-Pesa, até aos 13.500 MZN vendidos"
            />
          </figure>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <WhatsAppDemo />
        </Reveal>
      </div>
    </section>
  )
}
