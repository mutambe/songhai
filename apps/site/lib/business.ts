// Dados oficiais da empresa. Usados no JSON-LD (layout.tsx), no rodapé e na
// página de contacto — manter iguais em todo o lado ajuda a pesquisa local.
export const BUSINESS = {
  legalName: 'Songhai, Lda',
  streetAddress: 'Praceta dos Namarais, nº 63',
  locality: 'Maputo',
  country: 'Moçambique',
  countryCode: 'MZ',
  email: 'info@songhai.cc',
  phone: '+258848986002',
  phoneDisplay: '+258 84 898 6002',
}

export const OPENING_HOURS = [
  { label: 'Segunda a sexta', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00', display: '9h – 17h' },
  { label: 'Sábado', days: ['Saturday'], opens: '09:00', closes: '14:00', display: '9h – 14h' },
]
