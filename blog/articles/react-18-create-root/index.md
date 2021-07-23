---
cover: cover.jpeg
date: 2021-07-23
title: React 18. createRoot
description: В новой версии React был представлен новый корневой API. В данном посте разберём в чём разница от старого API и какие изменения были привнесены вместе с ним.
tags:
- react
- javascript
- createRoot
---

React 18 включает два корневых API, которые называются **Legacy Root API** и **New Root API**.

- **Legacy Root API** (Устаревший корневой API): это существующий API, вызываемый с помощью `ReactDOM.render`. 
  Этот метод создает корень приложения, работающий в «устаревшем» режиме, который работает точно так же, как в React 17. 
  Перед релизом будет добавлено предупреждение, указывающее, что метод устарел, и, что необходимо переключиться на **New Root API**. 

-  **New Root API** (Новый корневой API): новый корневой API вызывается с помощью `ReactDOM.createRoot`. Это создает корень приложения,
   работающий в React 18, который добавляет все улучшения React 18 и позволяет использовать параллельные функции. 
   Это будет основной корневой API в дальнейшем.

## Что такое корень приложения?

В React «корень» - это указатель на структуру данных верхнего уровня, которую React использует для отслеживания
дерева при рендеринге. В устаревшем API корень был непрозрачен для пользователя, потому что он был прикреплён к 
элементу DOM и доступ к нему был через узел DOM:

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

// Initial render.
ReactDOM.render(<App tab="home" />, container);

// During an update, React would access
// the root of the DOM element.
ReactDOM.render(<App tab="profile" />, container);
```

В New Root API сначала создаётся корень приложения, а затем вызывается его рендеринг:

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);

// During an update, there's no need to pass the container again.
root.render(<App tab="profile" />);
```

## В чём разница?

API бы изменён по нескольким причинам.

Во-первых, это исправляет некоторую эргономику API при запуске обновлений. Как показано выше, в устаревшем API
вам нужно продолжать передавать контейнер в рендер, даже если он никогда не изменится. Это также означает, что нам 
не нужно хранить корень на узле DOM, хотя мы все еще делаем это сегодня.

Во-вторых, это изменение позволяет нам удалить метод гидратации (`hydrate`) и заменить его методом корня; 
и удалите обратный вызов рендеринга, что не имеет смысла в мире с частичной гидратацией.

## А как насчет гидратации?

Функция `hydrate` была перенесена в API `hydrateRoot`.

До:

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

// Render with hydration.
ReactDOM.hydrate(<App tab="home" />, container);
```

После:

```jsx
import * as ReactDOM from 'react-dom';

import App from 'App';

const container = document.getElementById('app');

// Create *and* render a root with hydration.
const root = ReactDOM.hydrateRoot(container, <App tab="home" />);
// Unlike with createRoot, you don't need a separate root.render() call here
```

Обратите внимание, что в отличие от `createRoot`, **`hydrateRoot`** принимает обычный **JSX** в качестве второго аргумента.
Это связано с тем, что первоначальный рендер клиента является особенным и должен соответствовать дереву на сервере.

Если вы хотите снова обновить корень _после_ гидратации, вы можете сохранить его в переменной, как и в случае
с `createRoot`, и вызвать `root.render()`:

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

// Create *and* render a root with hydration.
const root = ReactDOM.hydrateRoot(container, <App tab="home" />);

// You can later update it.
root.render(<App tab="profile" />);
```

## А как насчет обратного вызова рендеринга?

В устаревшем корневом API вы можете передать обратный вызов `render`, который вызывается после рендеринга 
или обновления компонента:

```jsx
import * as ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

ReactDOM.render(container, <App tab="home" />, function() {
  // Called after inital render or any update.
  console.log('rendered');
});
```

В New Root API был удалён этот обратный вызов.

При частичной гидратации и прогрессивном SSR время для этого обратного вызова не будет соответствовать 
ожиданиям пользователя. Чтобы избежать путаницы, рекомендуется использовать `requestIdleCallback`, `setTimeout` 
или обратный вызов `ref` для корня.

Итак, вместо этого:

```jsx
import * as ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement, () => console.log("renderered"));
```

Вы можете сделать это:

```jsx
import * as ReactDOM from 'react-dom';

function App({ callback }) {
  // Callback will be called when the div is first created.
  return (
    <div ref={callback}>
      <h1>Hello World</h1>
    </div>
  );
}

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(<App callback={() => console.log("renderered")} />);
```

[Посмотреть в codesandbox](https://codesandbox.io/s/cold-pine-eyr62?file=/src/index.js)

## Зачем оставлены оба метода?

Это сделано по двум причинам:

- **Плавное обновление:** разработчики React хотели, чтобы пользователи при обновлении до 18-ой версии избежали 
  сломанного приложения, а видели предупреждение в консоли для устаревшего корневого API, в котором рекомендуется 
  использовать новый API.

- **Экспериментирование:** некоторые приложения могут выбрать запуск продакшн эксперимента для сравнения
  устаревшего корня с новым корнем, который включает улучшения производительности "из коробки". 
  Включив оба варианта, будет проще проводить эксперименты.
