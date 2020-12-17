FROM nginx:1.19.1

COPY ./blog/public /var/www/devarticles.space/
COPY ./nginx/ /etc/nginx/
