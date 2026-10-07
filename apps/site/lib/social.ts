// Perfis oficiais da SONGHAI. Usados nos ícones do rodapé e no `sameAs` do
// JSON-LD (layout.tsx), que diz ao Google que estes perfis são da empresa.
export type SocialNetwork = 'Instagram' | 'LinkedIn' | 'Facebook'

// Facebook retirado até a Página "Songhai, Lda" ter nome de utilizador próprio.
// Para o repor, basta voltar a acrescentar aqui:
// { name: 'Facebook', url: 'https://www.facebook.com/...' }
export const SOCIAL_PROFILES: { name: SocialNetwork; url: string }[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/songhai_lda/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/songhai-lda/' },
]
