FROM nginx:1.19.1

COPY public/ /var/www/novavovikov.ru/
COPY nginx/ /etc/nginx/
