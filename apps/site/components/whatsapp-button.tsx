'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { trackEvent } from '@/lib/track'

const BUBBLE_DELAY_MS = 8000
const BUBBLE_DISMISSED_KEY = 'songhai-wa-bubble-dismissed'

// Glifo oficial do WhatsApp (Simple Icons, CC0)
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '258848986002'
  const message = encodeURIComponent('Olá SONGHAI, gostaria de saber mais sobre as vossas soluções de IA e automação.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(BUBBLE_DISMISSED_KEY) === '1'
    } catch {}
    if (dismissed) return
    const id = window.setTimeout(() => setShowBubble(true), BUBBLE_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  const dismissBubble = () => {
    setShowBubble(false)
    try {
      sessionStorage.setItem(BUBBLE_DISMISSED_KEY, '1')
    } catch {}
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative mb-1 max-w-[14rem] rounded-2xl rounded-br-sm border border-line bg-paper py-3 pl-4 pr-8 text-sm text-foreground shadow-lg"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click')}>
              Tem uma dúvida? Fale connosco no WhatsApp — respondemos em minutos 👋
            </a>
            <button
              type="button"
              onClick={dismissBubble}
              aria-label="Fechar mensagem"
              className="absolute right-2 top-2 rounded-full p-1 text-ink-soft transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent('whatsapp_click')
          dismissBubble()
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-shadow duration-300 hover:bg-[#20ba58] hover:shadow-xl md:h-14 md:w-14"
        aria-label="Contactar via WhatsApp"
        title="Enviar mensagem via WhatsApp"
      >
        <WhatsAppGlyph className="h-6 w-6 md:h-7 md:w-7" />
      </motion.a>
    </div>
  )
}
