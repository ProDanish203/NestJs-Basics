# FROM node:22.2.0-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm cache clean --force
# RUN npm install --legacy-peer-deps

# COPY . .

# COPY .env ./

# RUN npx prisma generate

# EXPOSE 8000

# CMD ["npm", "run", "start:migrate:prod"]


FROM node:22.2.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:22.2.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/dist ./dist

COPY .env ./

EXPOSE 8000

CMD ["npm", "run", "start:prod"]