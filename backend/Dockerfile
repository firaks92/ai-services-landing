# Multi-stage Dockerfile for AI Services Backend & Telegram Bot
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root and backend packages
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm install --workspace=backend

# Copy backend source & prisma schema
COPY backend/ ./backend/

WORKDIR /app/backend
RUN npx prisma generate
RUN npm run build

# Runner Stage
FROM node:22-alpine AS runner

WORKDIR /app/backend
ENV NODE_ENV=production

COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]
