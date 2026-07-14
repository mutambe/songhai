# Songhai — monorepo

Duas aplicações Next.js independentes, uma stack Docker Swarm partilhada.

- **[apps/site](apps/site)** — site principal (songhai.cc), inclui o painel
  de gestão do blog em `/admin/blog`
- **[apps/portal](apps/portal)** — Portal interno da equipa (portal.songhai.cc)

## Desenvolvimento local

Cada app corre de forma independente:

```bash
cd apps/site && cp .env.example .env.local && npm install && npm run dev   # http://localhost:3001
cd apps/portal && cp .env.example .env.local && npm install && npm run dev # http://localhost:3002
```

Preenche os `.env.local` com valores reais (segredos, credenciais SMTP) —
ver comentários em cada `.env.example`. `SSO_SHARED_SECRET` tem de ser
**exatamente igual** nas duas apps.

## Deploy em produção

Ver [DEPLOY.md](DEPLOY.md) — Docker Swarm + Traefik + Portainer.

## Arquitetura

- `apps/site` gere o blog público via um ficheiro de dados
  (`apps/site/data/posts.json`) e um painel de administração protegido por
  SSO vindo do Portal (só admins do Portal conseguem entrar)
- `apps/portal` gere utilizadores, sistemas internos e dashboards de
  clientes, com sessão própria (cookie assinado) e permissões por painel
- As duas apps comunicam via um segredo partilhado (`SSO_SHARED_SECRET`)
  para o handoff de autenticação — sem depender de cookies partilhados entre
  domínios
