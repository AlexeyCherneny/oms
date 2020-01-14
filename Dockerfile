FROM node:12.14.1

WORKDIR /usr/src/app

COPY package*.json ./
COPY public ./

RUN npm install --silent

CMD ["npm", "start"]