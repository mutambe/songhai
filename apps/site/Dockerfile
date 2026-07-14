# apps/site — songhai-limitada (site principal)

FROM node:22-bookworm-slim AS deps
WORKDIR /app
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

# Corre como root de propósito: a app escreve em /app/data (artigos do blog),
# que fica montado como volume persistente — evita problemas de permissões
# entre o utilizador do container e o dono do volume no host.
RUN mkdir -p /app/data

EXPOSE 3000
CMD ["node", "server.js"]
