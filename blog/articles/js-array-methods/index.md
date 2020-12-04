---
cover: cover.jpg
date: 2020-12-04
title: 10 методов массива JavaScript для упрощения кода
description: Часто используемые и полезные методы работы с массивом, которые облегчат жизнь Javascript разработчика
tags:
  - array
  - javascript
---

## 1. `filter()`

Метод `filter()` создает новый массив со всеми элементами,
которые проходят проверку, реализованную предоставленной функцией.

```javascript
const languages = ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'C++']

const longWords = languages.filter(word => word.length > 4)

console.log(longWords) // ["JavaScript", "Kotlin"]
```

## 2. `forEach()`

Метод `forEach()` выполняет заданную функцию один раз для каждого элемента массива.

```javascript
const languages = ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'C++']

languages.forEach(word => console.log(word))

// HTML
// CSS
// JavaScript
// Kotlin
// C++
```

## 3. `some()`

Метод `some()` проверяет, проходит ли хотя бы один элемент в массиве тест,
реализованный предоставленной функцией. Он возвращает логическое значение.

```javascript
const numbers = [1, 2, 3, 4, 5]

const eventExist = numbers.some(element => element % 2 === 0)

console.log(eventExist) // true
```

## 4. `every()`

Метод `every()` проверяет, все ли элементы в массиве проходят проверку,
реализованную предоставленной функцией. Он возвращает логическое значение.

```javascript
const numbers = [1, 2, 3, 4, 5]

const allEven = numbers.every(element => element % 2 === 0)

console.log(allEven) // false
```

## 5. `includes()`

Метод `includes()` определяет, включает ли массив определенное значение среди своих записей.
Он возвращает логическое значение.

```javascript
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.includes(2)) // true

console.log(numbers.includes(8)) // false
```

## 6. `map()`

Метод `map()` создает новый массив, заполненный результатами вызова предоставленной функции
для каждого элемента в вызывающем массиве.

```javascript
const numbers = [1, 2, 3, 4, 5]

const doubled = numbers.map(n => n * 2)

console.log(doubled) // [2, 4, 6, 8, 10]
```

## 7. `reduce()`

Метод `reduce()` выполняет функцию сокращения (которую вы предоставляете) для каждого элемента массива,
в результате чего получается одно выходное значение.

```javascript
const numbers = [1, 2, 3, 4, 5]

const sum = numbers.reduce((result, n) => result + n)

console.log(sum) // 15
```

## 8. `sort()`

Метод `sort()` сортирует элементы массива на месте и возвращает отсортированный массив.
По умолчанию используется возрастающий порядок сортировки, основанный на преобразовании элементов в строки
и последующем сравнении их последовательностей значений кодовых единиц UTF-16.

```javascript
const languages = ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'C++']
languages.sort()
console.log(languages) // ["C++", "CSS", "HTML", "JavaScript", "Kotlin"]

const numbers = [33, 6, 8, 12, 1]
numbers.sort((x, y) => x - y)
console.log(numbers) // [1, 6, 8, 12, 33]
```

## 9. `find()`

Метод `find()` возвращает значение первого элемента в предоставленном массиве, 
который удовлетворяет предоставленной функции тестирования.

```javascript
const languages = ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'C++']

const foundLanguage = languages.find(language => language === 'JavaScript')

console.log(foundLanguage) // JavaScript
```

## 10. `findIndex()`

Метод `findIndex()` возвращает индекс первого элемента в массиве, 
который удовлетворяет предоставленной функции тестирования.
В противном случае возвращается -1, указывая, что ни один элемент не прошел проверку.

```javascript
const languages = ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'C++']

const index = languages.findIndex(language => language === 'JavaScript')

console.log(index) // 2
```
