# apps/site — songhai-limitada (site principal)

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variáveis NEXT_PUBLIC_* são usadas em componentes de cliente (browser) e
# por isso têm de estar disponíveis já no momento do build — o Next.js
# grava o valor diretamente no bundle JavaScript. Definidas em runtime
# (docker-stack.yml) não chegam a este código, que já corre no browser do
# visitante, não no servidor.
ARG NEXT_PUBLIC_PORTAL_URL
ARG NEXT_PUBLIC_WHATSAPP_PHONE
ENV NEXT_PUBLIC_PORTAL_URL=${NEXT_PUBLIC_PORTAL_URL}
ENV NEXT_PUBLIC_WHATSAPP_PHONE=${NEXT_PUBLIC_WHATSAPP_PHONE}

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
