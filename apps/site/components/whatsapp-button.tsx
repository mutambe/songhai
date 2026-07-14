'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '258848986002'
  const message = encodeURIComponent('Olá SONGHAI, gostaria de saber mais sobre vossas soluções de IA e automação.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-[#20ba58] md:bottom-8 md:right-8"
      aria-label="Contactar via WhatsApp"
      title="Enviar mensagem via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  )
}
