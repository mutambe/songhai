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

### Rede do Traefik
Confirma o nome da rede overlay que o teu Traefik já usa (normalmente
`traefik-public` ou `proxy`). Se for diferente, ajusta em `docker-stack.yml`
(`networks:` no topo e a label `traefik.docker.network` em cada serviço).

### Resolver de certificados TLS
Confirma o nome do `certresolver` já configurado no teu Traefik (ex.:
`letsencrypt`). Ajusta as labels `traefik.http.routers.*.tls.certresolver`
em `docker-stack.yml` se for diferente.

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

Docker Swarm **não constrói imagens no deploy** — têm de existir antes.

### Opção A — construir diretamente na VPS (mais simples para começar)

Numa VPS de um nó só, não precisas de nenhum registo — a imagem só precisa
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
`PORTAL_IMAGE` no `.env` da VPS para apontarem para essas imagens, e troca
`docker build` por `docker pull` antes do deploy.

## 3. Configurar as variáveis de ambiente na VPS

```bash
cd /caminho/para/o/monorepo
cp .env.example .env
nano .env   # preenche os valores reais (segredos, domínios, SMTP)
```

O ficheiro `.env` **nunca** deve ir para o git (já está no `.gitignore`).

Se preferires gerir isto pelo Portainer em vez de um ficheiro `.env` na
VPS: ao publicar a stack, cola o conteúdo do `.env.example` (preenchido)
no campo "Environment variables" do Portainer — funciona da mesma forma.

## 4. Publicar a stack

```bash
docker stack deploy -c docker-stack.yml songhai
```

Confirma no Portainer (ou `docker service ls`) que os dois serviços
(`songhai_site`, `songhai_portal`) ficam com réplicas a correr.

## 5. Primeira verificação

- `https://songhai.cc` — site principal deve carregar, com certificado válido
- `https://songhai.cc/contacto` — testa o formulário; confirma que chega o
  e-mail a `CONTACT_NOTIFY_EMAIL`
- `https://portal.songhai.cc` — deve pedir login; usa uma conta existente ou
  regista a primeira (torna-se admin automaticamente)
- No Portal, cria o primeiro utilizador admin e usa o cartão **Blog** no hub
  para confirmar que o SSO para `/admin/blog` funciona

## 6. Dados persistentes

Os volumes nomeados (`site_data`, `portal_data`,
`portal_public_dashboards`, `portal_public_previews`) guardam:

- `site_data` — artigos do blog (`posts.json`) e subscritores da newsletter
- `portal_data` — base de dados SQLite (utilizadores, sistemas, dashboards)
- `portal_public_dashboards` / `portal_public_previews` — ficheiros HTML e
  imagens enviados pelo Portal

Fazer cópia de segurança destes volumes regularmente (ex.:
`docker run --rm -v portal_data:/data -v $(pwd):/backup alpine tar czf /backup/portal_data.tar.gz /data`).

## 7. Atualizar depois de mudanças no código

```bash
git pull
docker build -t songhai-site:latest ./apps/site      # se mudou o site
docker build -t songhai-portal:latest ./apps/portal  # se mudou o portal
docker service update --force songhai_site
docker service update --force songhai_portal
```
