FROM node:15 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN ["npm", "run", "build"]

FROM nginx:1.19.1
EXPOSE 80
EXPOSE 443
COPY --from=builder /app/public /var/www/novavovikov.ru/
COPY nginx /etc/nginx/
