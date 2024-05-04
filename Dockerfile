FROM node:20.12.2-alpine

WORKDIR /SGP-2-Frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build