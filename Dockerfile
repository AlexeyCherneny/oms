# ----------------------
# SETTING BUILD
FROM node:12.14.1 as build

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --silent

COPY . /usr/src/app

RUN npm run build

# ----------------------
# SETTING NGINX
FROM nginx:1.16.0-alpine

COPY --from=build /usr/src/app/build /usr/src/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]