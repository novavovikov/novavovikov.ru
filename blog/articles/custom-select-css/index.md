---
cover: cover.png
date: 2019-08-20
title: Стилизация select на чистом CSS
description: Пример кроссбраузерной стилизации select на чистом CSS
tags:
  - css
  - html
---

Я данной статье я хочу рассказать о стилизации select на чистом CSS для Chrome, Safari, Firefox и IE9+ без добавления дополнительных элементов.

Вот весь css код:

```css
select {
    width: 160px;
    height: 26px;
    border-radius: 4px;
    line-height: 1em;

    background-image: url('/select-arrow.svg');
    background-position: right center;
    background-repeat: no-repeat;

    /*for WebKit*/
    -webkit-appearance: none;
    /* for FF */
    -moz-appearance: none;
    text-indent: 0.01px; 
    text-overflow: '';
    /* for IE */
    -ms-appearance: none;
    appearance: none !important;
}
 
select::-ms-expand {
    display: none;
}
```

**Теперь давайте разберём** его для полного понимания что происходит.

Первая часть кода отвечает за базовую стилизацию элемента.
Можно также добавить цвет фона background-color и цвет border.

```css
width: 160px;
height: 26px;
border-radius: 4px;
line-height: 1em;
```

Далее отменяем стандартное отображение select:

```css
/*for WebKit*/
-webkit-appearance: none;
/* for FF */
-moz-appearance: none;
text-indent: 0.01px; 
text-overflow: '';
/* for IE */
-ms-appearance: none;
appearance: none !important;
```

Теперь задаем вид стрелки, которая присутствует в каждом select.
Фон задан отдельными свойствами, чтобы можно было добавить фоновый цвет и не бояться, что он перекроет картинку.

```css
background-image: url('/select-arrow.svg');
background-position: right center;
background-repeat: no-repeat;
```

И осталось маленькое дополнение для IE:

```css
select::-ms-expand {
    display: none;
}
```
