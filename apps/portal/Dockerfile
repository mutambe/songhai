# apps/portal — songhai-portal (Portal interno)

FROM node:22-bookworm-slim AS deps
WORKDIR /app
# better-sqlite3 compila um módulo nativo — precisa destas ferramentas de build.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Corre como root de propósito: a app escreve em /app/data (base de dados
# SQLite, sistemas, dashboards) e /app/public/{dashboards,previews}, montados
# como volumes persistentes — evita problemas de permissões entre o
# utilizador do container e o dono do volume no host.
RUN mkdir -p /app/data /app/public/dashboards /app/public/previews

EXPOSE 3000
CMD ["node", "server.js"]
