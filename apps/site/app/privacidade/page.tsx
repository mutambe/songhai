import { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade e proteção de dados da SONGHAI',
  alternates: { canonical: '/privacidade' },
}

export default function PrivacyPage() {
  return (
    <main>
      <section className="px-5 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Última atualização: 14 de julho de 2026
          </p>
        </Reveal>
      </section>

      <section className="px-5 pb-24 lg:px-8">
        <Reveal className="mx-auto max-w-4xl space-y-8">
          {/* Introduction */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              1. Introdução
            </h2>
            <p className="text-ink-soft leading-relaxed">
              A SONGHAI ("nós", "nos", "nosso") respeita a privacidade dos nossos
              utilizadores ("utilizador", "você"). Esta Política de Privacidade
              explica como recolhemos, utilizamos, divulgamos e salvaguardamos as
              suas informações quando visita o nosso website e utiliza os nossos
              serviços.
            </p>
          </div>

          {/* Data Collection */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              2. Informações que Recolhemos
            </h2>
            <div className="space-y-3">
              <p className="text-ink-soft leading-relaxed">
                Recolhemos informações que você nos fornece voluntariamente:
              </p>
              <ul className="space-y-2 text-ink-soft leading-relaxed list-disc list-inside">
                <li>Nome, email e empresa quando preenche o formulário de contacto</li>
                <li>
                  Email quando se subscreve à nossa newsletter (com o seu consentimento
                  explícito)
                </li>
                <li>
                  Qualquer outra informação que escolha partilhar connosco via
                  formulários
                </li>
              </ul>
              <p className="text-ink-soft leading-relaxed">
                Além disso, recolhemos automaticamente informação técnica sobre cada
                visita ao website — endereço IP, tipo de navegador (user-agent) e as
                páginas visitadas — para fins de estatística interna (ex.: quantas
                pessoas visitam o site e quais as páginas mais vistas). Esta
                informação é tratada de forma agregada e não é utilizada para o
                identificar individualmente nem partilhada com terceiros para fins
                de publicidade.
              </p>
            </div>
          </div>

          {/* Data Usage */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              3. Como Utilizamos os Seus Dados
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Utilizamos as informações recolhidas para:
            </p>
            <ul className="space-y-2 text-ink-soft leading-relaxed list-disc list-inside">
              <li>Responder às suas questões e pedidos de contacto</li>
              <li>
                Enviar newsletters e comunicações de marketing (apenas com
                consentimento)
              </li>
              <li>Melhorar os nossos serviços e experiência do utilizador</li>
              <li>Cumprir com obrigações legais</li>
            </ul>
          </div>

          {/* Data Protection */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              4. Proteção de Dados
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Implementamos medidas técnicas e organizacionais apropriadas para
              proteger as suas informações pessoais contra acesso não autorizado,
              alteração, divulgação ou destruição. O seu acesso à nossa website é
              encriptado via HTTPS. No entanto, nenhum método de transmissão de
              internet é 100% seguro, pelo que não podemos garantir segurança
              absoluta.
            </p>
          </div>

          {/* User Rights */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              5. Os Seus Direitos
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Nos termos da legislação moçambicana aplicável à proteção de dados
              pessoais, você tem direito a:
            </p>
            <ul className="space-y-2 text-ink-soft leading-relaxed list-disc list-inside">
              <li>Aceder aos dados pessoais que temos sobre você</li>
              <li>Solicitar correção de dados imprecisos</li>
              <li>Solicitar eliminação dos seus dados</li>
              <li>Retirar o consentimento para processamento</li>
              <li>Obter uma cópia dos seus dados em formato portável</li>
            </ul>
            <p className="text-ink-soft leading-relaxed mt-3">
              Para exercer estes direitos, entre em contacto connosco através do
              formulário de contacto em{' '}
              <Link href="/contacto" className="text-teal hover:underline">
                /contacto
              </Link>
              .
            </p>
          </div>

          {/* Third Parties */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              6. Partilha com Terceiros
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Não vendemos, alugamos ou partilhamos as suas informações pessoais
              com terceiros para fins de marketing. Podemos partilhar dados com
              prestadores de serviços que nos ajudam a operar o website (ex:
              hospedagem, email) sob contratos de confidencialidade.
            </p>
          </div>

          {/* Cookies */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              7. Cookies e Tecnologias de Rastreamento
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Este website utiliza cookies funcionais apenas para melhorar a sua
              experiência. Não utilizamos cookies de rastreamento ou publicidade de
              terceiros. Utilizamos, no entanto, um sistema de estatísticas interno
              que regista o IP, o user-agent e as páginas visitadas por cada acesso
              (sem recurso a cookies), conforme descrito na Secção 2, exclusivamente
              para efeitos de análise agregada do tráfego do website. Você pode
              desativar cookies nas definições do seu navegador a qualquer momento.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              8. Contacto
            </h2>
            <p className="text-ink-soft leading-relaxed">
              Se tem questões sobre esta Política de Privacidade ou pretende
              exercer os seus direitos, entre em contacto connosco através do
              formulário disponível em{' '}
              <Link href="/contacto" className="text-teal hover:underline">
                songhai.cc/contacto
              </Link>
              . Responderemos no prazo de 30 dias.
            </p>
          </div>

          {/* Changes */}
          <div className="space-y-3 border-t border-line pt-8">
            <p className="text-xs text-ink-soft">
              Esta Política de Privacidade pode ser atualizada ocasionalmente.
              Qualquer alteração será publicada nesta página com a data de
              atualização. O uso continuado do website após alterações constitui
              aceitação da Política de Privacidade atualizada.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
