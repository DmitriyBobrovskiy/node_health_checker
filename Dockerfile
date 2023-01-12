# syntax=docker/dockerfile:1.3

FROM node:19 AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./config ./config
COPY ./src ./src

RUN npm ci --quiet \
  && npm run build

FROM build AS runtime
EXPOSE 80
WORKDIR /app

CMD ["node", "build/main.js"]
