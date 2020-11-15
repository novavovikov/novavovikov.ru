---
cover: cover.jpg
date: 2020-05-03
title: Композиция функций в JavaScript
description: Функциональное программирование - это взятие небольших простых функций и их объединение для выполнения более сложных задач
tags:
  - fp
  - javascript
---

Функциональное программирование - это взятие небольших простых функций и их объединение для выполнения более сложных задач.

Композиция функций - это точечное приложение одной функции к результату другой. Разработчики делают это вручную каждый день, когда использует вложенные функции:

```javascript
compose = (fn1, fn2) => (value) => fn2(fn1(value))
```

Но это трудно читать. Существует лучший способ использования композицию функций. Вместо того, чтобы читать их изнутри:

```javascript
add2AndSquare = (n) => square(add2(n))
```

Мы можем использовать функцию высшего порядка (higher order function), чтобы упорядочить их.

```javascript
add2AndSquare = compose(add2, square)
```

Простая реализация `compose` будет выглядеть так:

```javascript
compose = (f1, f2) => (value) => f2(f1(value))
```

Чтобы получить большую гибкость, мы можем использовать функцию `reduceRight`:

```javascript
compose = (...fns) => (initialVal) =>
  fns.reduceRight((val, fn) => fn(val), initialVal)
```

Примеры из разработки - добавления аутентификации, логирования или свойств контекста.

Вот несколько примеров, как можно использовать:

```javascript
// example
const add2 = (n) => n + 2
const times2 = (n) => n * 2

const times2add2 = compose(add2, times2)
const add6 = compose(add2, add2, add2)

times2add2(2) // 6
add2tiems2(2) // 8
add6(2) // 8
```

Вы можете подумать, что это не относится к фронтенду, но это также полезно в SPA (single page application). Например, вы можете добавить поведение к компоненту React, используя функции высшего порядка:

```javascript
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function (nextProps) {
    console.log('Current props: ', this.props)
    console.log('Next props: ', nextProps)
  }
  return InputComponent
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent)
```

#### Заключение

Композиция функций повышает читаемость кода. Вместо вложения функций вы можете связать функции в цепочку и создать функции высшего порядка со значимыми именами.

Реализация `compose` присутствует во многих служебных библиотеках JavaScript (`lodash`, `rambda` и т. Д.).
