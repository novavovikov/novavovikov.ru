FROM node:14.15.0

WORKDIR /server

COPY package*.json ./
RUN npm i

COPY . .

CMD ["node", "server.js"]
