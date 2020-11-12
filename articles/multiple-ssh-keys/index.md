---
cover: cover.jpg
date: 2020-11-12
title: Использование нескольких SSH ключей
description: Настройки нескольких ключей SSH для разных учетных записей github
tags:
  - devops
  - github
  - ssh
---

### Создайте ssh ключ

Это можно сделать следующей командой
```shell script
$ ssh-keygen -t rsa -C "your_email@youremail.com"
```

для примера мы создадим 2 ключа
```shell script
~/.ssh/id_rsa_work_key
~/.ssh/id_rsa_private_key
```

затем добавить эти 2 ключа следующим образом
```shell script
$ ssh-add ~/.ssh/id_rsa_work_key
$ ssh-add ~/.ssh/id_rsa_private_key
```

вы можете удалить все кешированные ключи ранее
```shell script
$ ssh-add -D
```

чтобы проверить все сохраннённые ключи
```shell script
$ ssh-add -l
```


### Измените конфигурацию ssh
```shell script
$ cd ~/.ssh/
$ touch config
$ nano config # вместо nano используйте любой редактор
```

Добавьте в конфиг
```shell script
#work_key account
Host github.com-work_key
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa_work_key

#private_key account
Host github.com-private_key
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa_private_key
```

### Склонируйте репозиторий и измените конфигурацию Git
```shell script
git clone git@github.com:work/repo.git
```

Зайдите в директорию и отредактируйте свой git конфиг
```shell script
$ cd repo

$ git config user.name "private_key"
$ git config user.email "your_private_email@gmail.com" 

$ git config user.name "work_key"
$ git config user.email "your_work_email@gmail.com" 
```

также вы можете изменить глобальную конфигурацию git
```shell script
$ git config --global user.name "private_key" 
$ git config --global user.email "your_private_email@gmail.com"
```

затем используйте команды для push вашего кода
```shell script
$ git add .
$ git commit -m "your comments"
$ git push
```
