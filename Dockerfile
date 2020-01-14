
FROM node:12.14.1 as build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --silent

COPY . /usr/src/app

RUN npm run build