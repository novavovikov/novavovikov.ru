---
cover: cover.png
date: 2020-11-11
title: Список полезных docker команд
description: Полезные команды Docker и фрагменты кода
tags:
  - devops
  - docker
---

#### Общее

- **Удалить все** неиспользуемые контейнеры, сети, образы:
```shell script
docker container ls
```
___

### Контейнера

- **Показать** список всех запущенных контейнеров:
```shell script
docker system prune
```

- **Показать** список всех контейнеров, включая остановленные:
```shell script
docker container ls -a
```

- **Остановить** все контейнера:
```shell script
docker stop $(docker ps -a -q)
```

- **Остановить** все контейнера и **удалить** 
контейнеры, сети, тома и образы:
```shell script
docker stop $(docker ps -a -q)
```

- **Удалить** все контейнера:
```shell script
docker rm -f $(docker ps -a -q)
```

- **Удалить** все остановленные контейнера:
```shell script
docker conainer prune
```

- **Выполнить** внутри контейнера:
```shell script
docker exec -it <id_контейнера> sh
```

- **Показать логи** контейнера:
```shell script
docker logs <id_контейнера>
```
---

### Образы

- **Показать список** образов:
```shell script
docker image ls
```

- **Удалить** все неиспользуемые образы:
```shell script
docker image prune
```

- **Удалить** все образы:
```shell script
docker rmi -f $(docker images -q)
```
---

### Сеть и тома

- **Удалить** все неиспользуемые тома:
```shell script
docker image volume
```

- **Очистить** потерянные сети:
```shell script
docker network rm $(docker network ls -q)
```
