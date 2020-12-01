---
cover: cover.jpg
date: 2020-12-01
title: null vs undefined
description: На первый взгляд null и undefined могут показаться одинаковыми, но это далеко не так. В этой статье мы рассмотрим различия и сходства между null и undefined в JavaScript.
tags:
  - javascript
---

### Начнём с того что такое `null`

- `null` - это пустое или несуществующее значение
- `null` должен быть присвоен

```javascript
let foo = null;

console.log(foo); // null
```


### А теперь поговорим об `undefined`
`undefined` чаще всего означает, что переменная была объявлена, но не определена.

```javascript
let foo;

console.log(foo); // undefined
```

Также при поиске несуществующих ключей в объекте мы также получим `undefined`:

```javascript
const foo = {};

console.log(foo.bar); // undefined
```


### Общее у `null` и `undefined`

В JavaScript всего шесть ложных значений. `null` и `undefined` - относятся к ложным.
Вот полный список:

- `false`
- `0` (ноль)
- `“”` (пустая строка)
- `null`
- `undefined`
- `NaN` (Not A Number)

Любое другое значение в JavaScript считается истинным.


Также в JavaScript есть семь примитивных значений. `null` и `undefined` являются примитивными значениями.
Вот полный список:

- `Boolean`
- `Null`
- `Undefined`
- `Number`
- `String`
- `Symbol`
- `BigInt`

Все остальные значения в JavaScript являются объектами (объектами, функциями, массивами и т.д.).

### Практические отличия `null` и `undefined`

1. При использовании `typeof` для проверки `null` он возвращает объект, `undefined` же возвращает `undefined`:

```javascript
let foo = null;
console.log(typeof foo); // object

let bar;
console.log(typeof bar); // undefined
```

То, что `typeof null` является объектом это произошло с самого начала JavaScript
и это считается ошибкой в исходной реализации JavaScript.


2. В функии с параметрами по умолчанию `undefined` будет использовать значение по умолчанию, а `null` - нет:

```javascript
function sayHi (name = 'Joe') {
  console.log(`Hi, ${name}`);
}

sayHi(); // Hi, Joe
sayHi('Doe'); // Hi, Doe

sayHi(undefined); // Hi, Joe
sayHi(null); // Hi, null
```

Тоже самое касается и объектов при установке значений по умолчании в момент деструктуризации:

```javascript
const { foo = 1 } = { foo: undefined }
const { bar = 1 } = { bar: null }

console.log(foo) // 1
console.log(bar) // null
```

3. `JSON` может обрабатывать только `null`, но не `undefined`:

```javascript
const foo = JSON.stringify(null) // "null"
JSON.parse(foo) // null
JSON.parse(null) // null


const bar = JSON.stringify(undefined) // undefined
JSON.parse(bar) // Uncaught SyntaxError: Unexpected token u in JSON at position 0
JSON.parse(undefined) // Uncaught SyntaxError: Unexpected token u in JSON at position 0
```


### Подведём итоги:
- `null` - это присвоенное значение. Оно означает пустое значение.
- `undefined` означает, что переменная была объявлена, но еще не определена.
- `null` и `undefined` - ложные значения.
- `null` и `undefined` являются примитивами.
- `typof null` является объектом и это ошибка JavaScript
- в функции и объекте значение по умолчанию с `undefined` будет использовать значение, а `null` - нет.
- `JSON` может обрабатывать только `null`, но не `undefined`
