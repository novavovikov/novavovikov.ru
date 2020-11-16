## Personal blog

You can see [here](https://novavovikov.ru/) 

#### Run blog:
```shell script
cd ./blog
npm i
npm start
```

#### Run mail server:
```shell script
cd ./mail-server

export MAIL_HOST=<host> #default smtp.gmail.com
export MAIL_PORT=<host> #default 587
export MAIL_USER=<username>
export MAIL_PASS=<email password>
export MAIL_RECIPIENT=<email of recipent>

npm i
npm start
```

#### Run in docker:
```shell script
docker-compose build
docker-compose up
```

#### Write article:
You can do it [here](blog/articles)
