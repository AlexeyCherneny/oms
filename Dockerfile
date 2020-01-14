FROM node:12.14.1

WORKDIR /app

COPY package*.json ./
COPY public ./

# RUN npm install

# ENTRYPOINT ["npm", "start"]