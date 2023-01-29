FROM node:18-alpine AS base
ENV NODE_ENV development

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . ./

EXPOSE 3000
