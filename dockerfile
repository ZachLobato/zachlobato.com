FROM node:lts-alpine3.19 as build
WORKDIR /app
RUN yarn global add @vue/cli
COPY package*.json .
RUN npm install
COPY . .
RUN chmod 755 public/*
RUN npm run build

FROM nginx:1.25
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html