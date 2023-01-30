FROM node:18-alpine AS base
ENV NODE_ENV development

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . ./
RUN chown -R node:node /app/node_modules

EXPOSE 3000