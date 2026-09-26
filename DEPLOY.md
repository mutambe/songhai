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

Nota: apesar de o Traefik global ter `entryPoints.web.http.redirections`
configurado, na prática isso não estava a apanhar os hosts deste serviço —
`http://songhai.cc/` devolvia 404 em vez de redirecionar, porque não havia
nenhum router deste stack na entrypoint `web`. Por isso o serviço `site` em
`docker-stack.yml` define explicitamente routers próprios para `web` (HTTP)
e para `www.songhai.cc`, com um middleware `redirectregex` que normaliza
tudo para `https://songhai.cc` — não depender só da config global do
Traefik para este domínio.

### Segredos
Gera valores **novos** para produção (nunca reaproveitar os de desenvolvimento):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Usa isto para `AUTH_SECRET`, `BLOG_ADMIN_SECRET` e `SSO_SHARED_SECRET`.
**`SSO_SHARED_SECRET` tem de ser exatamente o mesmo valor nas duas apps** —
é o que permite entrar no painel do blog a partir do Portal.

### 2FA no Portal
O 2FA é obrigatório no login para todas as contas, exceto as marcadas como
"conta raiz" no painel de **Utilizadores** (checkbox "Conta raiz — não
exigir 2FA no login" em cada utilizador aprovado). No primeiro login sem
2FA configurado, a pessoa é levada a escolher entre aplicação autenticadora
(TOTP) ou código por e-mail antes de entrar no Portal.

**Cuidado no primeiro deploy desta funcionalidade:** todas as contas
começam sem isenção (`two_factor_exempt = 0`). Depois de publicar a stack,
**sem fazer logout**, entra no Portal com a sessão atual e vai a
Utilizadores → marca a tua própria conta como "conta raiz" — caso
contrário, no próximo login vais cair na configuração obrigatória de 2FA
como qualquer outra conta.

## 2. Construir e publicar as imagens

Importante: **o Portainer/Swarm não constrói as imagens a partir do
Dockerfile quando publicas a stack** — a imagem já tem de existir (localmente
no nó, ou num registo) antes de fazeres deploy/update da stack.

**O cluster tem mais do que um nó** (confirmado — vmi2968866, vmi2974672),
por isso construir só por SSH num nó não chega: o Swarm pode agendar o
serviço noutro nó que não tem a imagem, e a tarefa fica "rejected". Por
isso este repositório já vem com **GitHub Actions + GitHub Container
Registry (GHCR)** configurado (`.github/workflows/docker-build.yml`):
a cada push em `main` que mude `apps/site` ou `apps/portal`, as imagens são
construídas e publicadas automaticamente em
`ghcr.io/mutambe/songhai-site` e `ghcr.io/mutambe/songhai-portal` — **qualquer
nó do Swarm consegue fazer pull sozinho**, sem build manual.

Depois do primeiro push com este workflow:
1. Confirma em **github.com/mutambe/songhai → Actions** que o workflow
   correu com sucesso
2. Vai a **github.com/mutambe → Packages**, abre `songhai-site` e
   `songhai-portal`, e em **Package settings → Change visibility** torna-os
   **públicos** (assim os nós do Swarm fazem *pull* sem precisar de
   autenticação nenhuma; se preferires manter privados, cada nó tem de
   fazer `docker login ghcr.io` com um token com permissão `read:packages`)
3. `SITE_IMAGE`/`PORTAL_IMAGE` já apontam para o GHCR no `.env.example` —
   usa esses valores nas variáveis de ambiente da stack (passo 3)

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

Com o GitHub Actions configurado, um `git push` para `main` já reconstrói e
publica as imagens novas no GHCR sozinho (vê em **Actions** no GitHub se
correu). O Swarm, no entanto, só substitui um serviço quando a *imagem*
muda — publicar a stack de novo com a mesma tag `:latest` não força
automaticamente o *pull* da versão nova.

**Pelo Portainer** (mais simples, já que usas a tag `:latest`): vai a
**Services**, escolhe `songhai_site` ou `songhai_portal`, e usa
**Update → Force update** — isto faz o nó puxar a imagem `:latest` mais
recente do GHCR.

**Por SSH na VPS** (alternativa):
```bash
docker service update --force --image ghcr.io/mutambe/songhai-site:latest songhai_site
docker service update --force --image ghcr.io/mutambe/songhai-portal:latest songhai_portal
```

Dica: cada build no GHCR também fica com uma tag única (o SHA do commit) —
se preferires um controlo mais preciso do que está em produção, usa essa
tag em vez de `:latest` no `SITE_IMAGE`/`PORTAL_IMAGE` da stack; nesse caso
o Swarm deteta a mudança de imagem sozinho, sem precisar de "force update".
