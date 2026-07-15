# Documentação do sistema — Songhai

Documento de referência completo do monorepo. Para os passos de deploy em
produção, ver [DEPLOY.md](DEPLOY.md). Para arrancar em desenvolvimento
local, ver [README.md](README.md).

## 1. Visão geral

Duas aplicações Next.js (App Router) independentes, cada uma com o seu
próprio domínio, base de dados/ficheiros e deploy:

| | `apps/site` | `apps/portal` |
|---|---|---|
| Domínio | `songhai.cc` | `portal.songhai.cc` |
| Público | Visitantes do site, leitores do blog | Equipa interna Songhai |
| Dados | `data/posts.json`, `data/subscribers.json`, `data/blog-images/` | `data/portal.db` (SQLite), `data/systems.json`, uploads em `public/dashboards`, `public/previews` |
| Autenticação | Nenhuma para o público; painel `/admin/blog` protegido por SSO vindo do Portal | Contas próprias (e-mail `@songhai.cc` + senha), sessão por cookie assinado |

As duas apps comunicam de duas formas:
1. **Rastreio de visitas** — `apps/site` envia um pedido a
   `apps/portal/api/track` a cada mudança de página (ver `AnalyticsBeacon`),
   para alimentar o painel de Métricas do Portal.
2. **SSO para o painel do blog** — descrito na secção 4.

Nenhuma das duas apps partilha cookies entre domínios — a "sessão" no
painel do blog é criada localmente em `apps/site` depois de validar um
token de uso único vindo do Portal.

## 2. `apps/site` — site principal

### Páginas públicas
- `/` — página inicial (hero, calculadora de ROI, setores, método, FAQ, etc. — `components/sections/*`)
- `/blog` — listagem de artigos publicados, com filtro por categoria e por tag (`?tag=x`)
- `/blog/[slug]` — artigo individual
- `/contacto` — formulário de contacto (envia e-mail real via SMTP)
- `/privacidade` — política de privacidade
- `/feed.xml` — feed RSS dos artigos publicados
- `/sitemap.xml`, `/robots.txt` — gerados dinamicamente (`app/sitemap.ts`, `app/robots.ts`)

### Blog e painel de administração
O blog **não usa CMS externo** — os artigos vivem em `data/posts.json`
(`lib/blog-store.ts`), com o modelo de dados em `lib/blog.ts`:

```ts
type BlogPost = {
  slug, title, excerpt, category, tags: string[],
  status: 'draft' | 'published',
  publishedAt: string, // ISO — se "published" e no futuro, fica agendado
  readingTime, author, gradient, coverImage?, featured?,
  updatedBy?, updatedAt?, // autoria automática
  content: {
    lead: string,                                  // texto simples
    sections: { heading: string; body: string }[],  // body é HTML (Tiptap)
    quote?: string,
    callout?: { title: string; body: string },
  },
}
```

- **`listPublishedPosts()` / `getPublishedPost()`** — usados pelas páginas
  públicas; filtram por `status === 'published' && publishedAt <= agora`
  (agendamento sem cron, calculado no pedido)
- **`listPosts()` / `getPost()`** — sem filtro, usados só pelo painel de
  admin
- **Editor de texto rico** (`components/admin/rich-text-editor.tsx`,
  Tiptap) — negrito, itálico, títulos, listas, links, imagens inseridas no
  corpo de cada secção
- **Imagens** (capa do artigo e imagens dentro do corpo) — upload via
  `/api/admin/blog/upload-image`, guardadas em `data/blog-images/` e
  servidas por `app/blog-images/[filename]/route.ts` (rota própria que lê
  o disco a cada pedido — **não** usa a pasta `public/` estática, porque em
  produção (build *standalone*) o Next.js só serve ficheiros que já
  existiam em `public/` no arranque do servidor; um upload feito depois
  daria sempre 404)

**Acesso ao painel** (`/admin/blog`): só via SSO a partir do Portal (ver
secção 4) — não há login próprio nem senha partilhada.

### Formulário de contacto e newsletter
- `POST /api/contact` — valida, envia e-mail para `CONTACT_NOTIFY_EMAIL` e
  confirmação automática ao remetente; limitado por IP (`lib/rate-limit.ts`)
- `POST /api/newsletter` — guarda o e-mail em `data/subscribers.json`
  (nunca vai para o git), envia confirmação
- Ambos usam `lib/mailer.ts` (SMTP via Gmail — ver secção 5)

### SEO
- `app/layout.tsx` — `metadataBase`, título com template, Open Graph,
  Twitter Card, dados estruturados JSON-LD (`ProfessionalService`,
  localidade Maputo/MZ), `lang="pt-MZ"`
- Cada página define `alternates.canonical`
- `/sitemap.xml` inclui todas as páginas estáticas + todos os artigos
  publicados

## 3. `apps/portal` — Portal interno

### Autenticação
- **Registo** (`/registo`) — só e-mails `@songhai.cc`; o primeiro
  utilizador registado na base de dados torna-se admin automaticamente e
  aprovado; os seguintes ficam "pending" até um admin aprovar
  (`/portal/utilizadores`)
- **Login** (`/login`) — sessão cria-se logo após validar a senha
- **2FA (TOTP + e-mail)** — código completo e funcional
  (`lib/two-factor.ts`, `/api/auth/2fa/*`), mas **está desativado por
  decisão explícita** — `login/route.ts` e
  `force-change-password/route.ts` não chamam o passo de 2FA. Para
  reativar, é preciso voltar a ligar o `step: '2fa-enroll' | '2fa-verify'`
  nesses dois ficheiros.
- **Recuperação de senha** (`/recuperar`, `/repor-senha`) — token de uso
  único, válido 1h, enviado por e-mail real
- **Sessão** — JWT assinado (`AUTH_SECRET`, `jose`), cookie `HttpOnly`,
  válido 7 dias

### Gestão de utilizadores (`/portal/utilizadores`, admin only)
Aprovar/recusar pedidos, mudar papel (admin/membro), ativar/desativar
acesso por painel (`canViewMetrics`, `canViewSystems`,
`canViewDashboards` — por utilizador, aplicado em `lib/session.ts
hasPermission()`), repor senha (gera senha temporária, força troca no
próximo login), remover conta. Proteções: não é possível remover o
próprio acesso de admin nem ficar sem nenhum admin no sistema.

### Sistemas internos e Dashboards de clientes
Duas secções quase idênticas (`lib/systems-store.ts`, `data/systems.json`):
- **Sistemas internos** (`/portal/sistemas`) — links para ferramentas
  usadas pela equipa (CRM, ERP, etc.)
- **Dashboards** (`/portal/dashboards`) — links PowerBI ("Publicar na
  Web", por natureza já públicos) ou ficheiros HTML enviados por upload

Ambos abrem num **visualizador interno** (`components/embed-viewer.tsx`)
em vez de navegar para fora do site: iframe embutido, botão "Maximizar"
(Fullscreen API real, com a barra de ações incluída na área maximizada) e
"Abrir numa aba" para quando a ferramenta bloqueia incorporação (comum em
CRMs/ERPs de terceiros — fora do nosso controlo).

Ficheiros HTML e imagens de pré-visualização enviados por upload são
servidos por rotas próprias (`app/dashboards/[filename]`,
`app/previews/[scope]/[filename]`), pelo mesmo motivo do site (evitar
404 em produção para ficheiros adicionados depois do arranque).

### Métricas (`/portal/metricas`)
Mostra visitas dos últimos 7/30 dias enviadas pelo `apps/site` via
`/api/track` (`lib/analytics-store.ts` — ficheiro JSON simples, sem
serviço externo).

## 4. Integração entre as apps: SSO para o painel do blog

1. Admin clica em "Blog" no hub do Portal → `GET /api/blog-sso` (Portal)
2. Portal confirma sessão + `role === 'admin'`, cria um token assinado de
   **60 segundos**, uso único (`lib/sso.ts`, segredo partilhado
   `SSO_SHARED_SECRET`)
3. Redireciona para `${NEXT_PUBLIC_MAIN_SITE_URL}/admin/blog/sso?token=...`
4. O site valida o token com o mesmo segredo, cria uma sessão local
   própria (`lib/admin-auth.ts`, 24h, segredo `BLOG_ADMIN_SECRET`,
   diferente do `SSO_SHARED_SECRET`) e regista a identidade (nome/e-mail)
   — por isso cada artigo criado/editado fica com `updatedBy` correto

Importante: os redirecionamentos desta cadeia **não podem** usar
`request.url` como base (ver secção 6) — usam sempre variáveis de
ambiente explícitas (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PORTAL_URL`).

## 5. Variáveis de ambiente (referência)

Ver `.env.example` na raiz e em cada app para a lista completa com
comentários. Resumo por categoria:

| Variável | App | Uso |
|---|---|---|
| `AUTH_SECRET` | portal | Assina os cookies de sessão do Portal |
| `BLOG_ADMIN_SECRET` | site | Assina a sessão local do painel do blog |
| `SSO_SHARED_SECRET` | ambas | **Tem de ser igual nas duas** — handoff de SSO |
| `NEXT_PUBLIC_SITE_URL` | site | Auto-referência (redirecionamentos seguros) |
| `NEXT_PUBLIC_PORTAL_URL` | ambas | URL pública do Portal |
| `NEXT_PUBLIC_MAIN_SITE_URL` | portal | URL pública do site |
| `NEXT_PUBLIC_SITE_ORIGIN` | portal | CORS do endpoint `/api/track` |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | site | Número do botão WhatsApp (build-time!) |
| `SMTP_*`, `MAIL_FROM` | ambas | Envio de e-mail (Gmail SMTP) |
| `CONTACT_NOTIFY_EMAIL` | site | Destino das notificações do formulário/newsletter |

**Atenção — variáveis `NEXT_PUBLIC_*` usadas em componentes de cliente**
(`'use client'`, ex. `analytics-beacon.tsx`, `whatsapp-button.tsx`,
`site-header.tsx`) **ficam gravadas no bundle no momento do `next
build`**, não em runtime. Por isso o `Dockerfile` de `apps/site` recebe
`NEXT_PUBLIC_PORTAL_URL` e `NEXT_PUBLIC_WHATSAPP_PHONE` como *build-args*
(ver workflow do GitHub Actions), não só como variáveis de ambiente do
container. Variáveis `NEXT_PUBLIC_*` usadas só em ficheiros server-side
(rotas de API, middleware) funcionam normalmente em runtime.

## 6. Segurança — decisões e armadilhas já resolvidas

- **SSRF/host confusion atrás do Traefik**: nunca construir URLs
  absolutas de redirecionamento a partir de `request.url` — atrás de um
  proxy reverso, isto pode refletir o endereço interno do container
  Docker em vez do domínio público (já aconteceu, corrigido em vários
  sítios — ver commits "Corrigir redirecionamentos..."). Usar sempre
  `NEXT_PUBLIC_SITE_URL`/`NEXT_PUBLIC_PORTAL_URL` explícitas.
- **`X-Frame-Options`**: por defeito `DENY` em todas as rotas do Portal
  (`next.config.ts`); rotas que servem conteúdo pensado para o
  visualizador interno (`/dashboards/*`, `/previews/*`) têm `SAMEORIGIN`
  em vez de `DENY`.
- **Ficheiros enviados por upload**: nunca depender da pasta `public/`
  estática para servir ficheiros escritos em runtime — usar sempre uma
  rota própria que lê o disco a cada pedido (ver secções 2 e 3).
- **SQLite + build paralelo**: `lib/db.ts` do Portal usa
  `busy_timeout` (definido *antes* de qualquer outra pragma) e tolera
  `duplicate column name` — o `next build` avalia módulos em vários
  workers em paralelo, e numa base de dados nova isso causava
  `SQLITE_BUSY`/erros de migração.
- **Autorização por rota de API**: todas as rotas de escrita (`/api/systems`,
  `/api/dashboards`, `/api/auth/users/*`, `/api/admin/blog/*`) verificam
  sessão + permissão explicitamente — não há nenhuma rota de mutação sem
  verificação (já existiu esta falha, corrigida).
- **Rate limiting**: login do Portal, contacto e newsletter do site têm
  limite de tentativas por IP/e-mail (`lib/rate-limit.ts` em cada app,
  em memória — reinicia se o processo reiniciar).

## 7. Desenvolvimento local

```bash
cd apps/site && cp .env.example .env.local && npm install && npm run dev   # :3001
cd apps/portal && cp .env.example .env.local && npm install && npm run dev # :3002
```

`SSO_SHARED_SECRET` tem de ser **exatamente igual** nos dois
`.env.local`. As bases de dados/ficheiros (`data/`) são criados
automaticamente no primeiro arranque.

## 8. Limitações conhecidas / possíveis próximos passos

- **2FA desativado** (secção 3) — infraestrutura pronta, só falta religar
- **Newsletter**: guarda só o e-mail localmente, sem ferramenta de
  campanhas (Brevo/Mailchimp recomendado se o volume crescer)
- **Pesquisa no blog**: não existe — com poucos artigos não é prioritário
- **Contagem de vistas por artigo**: existe analytics geral, não por
  artigo individual
- **Rede/certresolver do Traefik**: assumidos como `traefik_public` /
  `letsencrypt`, confirmados a partir do stack real (ver DEPLOY.md) — se
  a VPS mudar, ajustar `docker-stack.yml`
