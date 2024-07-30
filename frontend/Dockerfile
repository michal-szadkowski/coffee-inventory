FROM node:lts-slim   AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build 

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env .
RUN chmod +x env.sh

COPY --from=build /app/build .
EXPOSE 80
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]