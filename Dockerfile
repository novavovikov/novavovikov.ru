FROM nginx:1.19.1

COPY ./app/public /var/www/novavovikov.ru/
COPY ./nginx/ /etc/nginx/
