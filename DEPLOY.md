# Deploy — Songhai (site + Portal)

Monorepo com duas apps Next.js independentes:

- `apps/site` — site principal (songhai-limitada), inclui o painel de gestão do blog em `/admin/blog`
- `apps/portal` — Portal interno (songhai-portal)

Assume-se uma VPS já com **Docker Swarm** inicializado, **Traefik** como proxy
reverso (com HTTPS automático) e **Portainer** para gerir stacks.

## 1. Antes do primeiro deploy

### DNS
Aponta estes registos para o IP da VPS:
- `songhai.cc` e `www.songhai.cc` → site principal
- `portal.songhai.cc` → Portal interno (ou o subdomínio que preferires — muda
  também em `docker-stack.yml`)

### Rede do Traefik e certificados TLS
Já confirmado a partir do stack.yml real do Traefik — `docker-stack.yml`
usa a rede `traefik_public` (externa) e o resolver `letsencrypt`. Não
precisas de mexer nisto, a menos que mudes a configuração do Traefik.

Nota: o teu Traefik já redireciona todo o tráfego de HTTP (porta 80) para
HTTPS automaticamente (`entryPoints.web.http.redirections`) — por isso os
serviços abaixo só definem routers em `websecure`, não precisam de um
router extra para o redirecionamento.

### Segredos
Gera valores **novos** para produção (nunca reaproveitar os de desenvolvimento):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Usa isto para `AUTH_SECRET`, `BLOG_ADMIN_SECRET` e `SSO_SHARED_SECRET`.
**`SSO_SHARED_SECRET` tem de ser exatamente o mesmo valor nas duas apps** —
é o que permite entrar no painel do blog a partir do Portal.

### 2FA no Portal
Está desativado de propósito (login vai direto para a sessão, sem pedir
código). Não precisas de configurar nenhuma app autenticadora para entrar.
Quando quiseres reativar o 2FA, é mexer em `app/api/auth/login/route.ts` e
`app/api/auth/force-change-password/route.ts` no `apps/portal`.

## 2. Construir e publicar as imagens

Importante: **o Portainer/Swarm não constrói as imagens a partir do
Dockerfile quando publicas a stack** — a imagem já tem de existir (localmente
no nó, ou num registo) antes de fazeres deploy/update da stack. Isto aplica-se
mesmo publicando a stack via "Git Repository" no Portainer.

### Opção A — construir por SSH na VPS (mais simples para começar, um nó só)

Numa VPS de um nó só não precisas de nenhum registo — a imagem só precisa
de existir localmente nesse nó:

```bash
# Na VPS, dentro da pasta do monorepo (depois de git clone / git pull)
docker build -t songhai-site:latest ./apps/site
docker build -t songhai-portal:latest ./apps/portal
```

### Opção B — GitHub Actions + GitHub Container Registry (quando quiseres CI/CD)

Depois de teres o repositório no GitHub, cria um workflow que corre
`docker build` + `docker push` para `ghcr.io/<o-teu-user>/songhai-site` e
`.../songhai-portal` a cada push em `main`. Nesse caso, muda `SITE_IMAGE` e
`PORTAL_IMAGE` para essas imagens (ver passo 3) — o Portainer só precisa de
fazer *pull*, não *build*.

## 3. Publicar a stack no Portainer

1. **Stacks → Add stack**
2. Nome da stack: `songhai` (ou o que preferires)
3. Método de publicação:
   - **Git Repository** (recomendado, já que vais ter isto no GitHub) —
     cola o URL do repositório, o branch (`main`), e o caminho
     `docker-stack.yml` na raiz. Podes ativar "GitOps updates" para o
     Portainer voltar a publicar sozinho quando fizeres push ao
     `docker-stack.yml` — mas isto **não reconstrói as imagens**, só relê
     o ficheiro da stack (ver passo 6).
   - ou **Web editor** — cola diretamente o conteúdo de `docker-stack.yml`.
4. Em **Environment variables**, adiciona cada variável do `.env.example`
   (raiz do monorepo) com o valor real — `SITE_IMAGE`, `PORTAL_IMAGE`,
   `SITE_PUBLIC_URL`, `PORTAL_PUBLIC_URL`, `WHATSAPP_PHONE`, `AUTH_SECRET`,
   `BLOG_ADMIN_SECRET`, `SSO_SHARED_SECRET`, `SMTP_*`, `MAIL_FROM`,
   `CONTACT_NOTIFY_EMAIL`. O Portainer tem um botão para colar tudo de
   uma vez no formato `.env` — usa isso e cola o `.env.example` já
   preenchido.
5. **Deploy the stack**

Confirma em **Stacks → songhai** que os dois serviços (`songhai_site`,
`songhai_portal`) ficam com réplicas a correr (verde).

## 4. Primeira verificação

- `https://songhai.cc` — site principal deve carregar, com certificado válido
- `https://songhai.cc/contacto` — testa o formulário; confirma que chega o
  e-mail a `CONTACT_NOTIFY_EMAIL`
- `https://portal.songhai.cc` — deve pedir login; usa uma conta existente ou
  regista a primeira (torna-se admin automaticamente)
- No Portal, cria o primeiro utilizador admin e usa o cartão **Blog** no hub
  para confirmar que o SSO para `/admin/blog` funciona

## 5. Dados persistentes

Os volumes nomeados (`site_data`, `portal_data`,
`portal_public_dashboards`, `portal_public_previews`) guardam:

- `site_data` — artigos do blog (`posts.json`) e subscritores da newsletter
- `portal_data` — base de dados SQLite (utilizadores, sistemas, dashboards)
- `portal_public_dashboards` / `portal_public_previews` — ficheiros HTML e
  imagens enviados pelo Portal

Fazer cópia de segurança destes volumes regularmente (ex.:
`docker run --rm -v portal_data:/data -v $(pwd):/backup alpine tar czf /backup/portal_data.tar.gz /data`).

## 6. Atualizar depois de mudanças no código

O Swarm só substitui um serviço quando a *imagem* muda — voltar a publicar a
mesma stack com a mesma tag (`:latest`) não é suficiente por si só.

**Por SSH na VPS:**
```bash
git pull
docker build -t songhai-site:latest ./apps/site      # se mudou o site
docker build -t songhai-portal:latest ./apps/portal  # se mudou o portal
docker service update --force songhai_site      # força o redeploy com a nova imagem
docker service update --force songhai_portal
```

**Pelo Portainer:** depois de reconstruíres a imagem (passo acima, ou via
CI/CD), vai a **Services**, escolhe `songhai_site` ou `songhai_portal`, e
usa **Update → Force update** para o forçar a puxar a imagem nova com a
mesma tag.

Dica: se usares tags únicas por build (ex. o SHA do commit, via GitHub
Actions) em vez de sempre `:latest`, o Portainer/Swarm deteta a mudança de
imagem sozinho ao publicares a stack de novo — não precisas do "force
update" manual.
