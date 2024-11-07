Приветствую!

# React + MobX + SASS Project

  Этот проект является примером приложения, написанного на React с использованием MobX для управления состоянием и SASS для стилей. Он настроен для работы с Webpack.

## Установка

**Склонируйте репозиторий**    
  git clone https://github.com/YouAreNotHere/Apricode_Test.git
  cd my-app

**Установите зависимости**

  Убедитесь, что у вас установлены [Node.js](https://nodejs.org/en/) и [npm](https://www.npmjs.com/get-npm). 
  Затем выполните команду:    npm install


## Скрипты

В проекте определены следующие команды, которые можно использовать:

  - `npm run start` - Запускает приложение в режиме разработки.
  - `npm run build` - Создает оптимизированную сборку приложения для продакшн.
  - `npm test` - Запускает тесты.

## Настройка Webpack

  Проект использует Webpack для сборки. Основные конфигурационные файлы находятся в папке `node_modules/webpack/`:

  - **webpack.config.js** - Основной конфигурационный файл Webpack.
  - **webpack.dev.js** - Конфигурация для разработки.
  - **webpack.prod.js** - Конфигурация для продакшн.

### Основные зависимости

В проекте используются следующие зависимости:

- **React** - Основная UI библиотека.
- **MobX** - Менеджер состояния.
- **SASS** - Препроцессор CSS.
- **Webpack** - Сборщик модулей.

## Структура проекта

  Проект имеет следующую структуру:

  /my-app
  ├── /src
  │   ├── /components React компоненты
  │   ├── /stores - MobX store
  │   ├── /shared - Общеиспользуемые подкомпоненты 
  │   └── index.js - Основной файл приложения
  ├── /public - Статические файлы
  ├── /node-modules - библиотеки для работы приложения
  └── package.json - Зависимости и скрипты

## Запуск проекта

  После установки зависимостей вы можете запустить проект с помощью команды: `npm run start`.

  Автоматически откроется браузер с вкладкой по адресу [http://localhost:3000]

## Стилизация с помощью SASS

  Для работы с SASS создайте файлы с расширением `.scss` в папке `src/shared/styles`. 
  Например, `styles.scss`. 

## Использование MobX

  Создайте ваши MobX store'ы в папке `src/stores`. Пример базового store'a:
  
  javascript

    import { makeAutoObservable } from "mobx";

    class CounterStore {
    count = 0;

    constructor() {
      makeAutoObservable(this);
    }

    increment() {
      this.count++;
    }

    decrement() {
      this.count--;
    }
    }

    export const counterStore = new CounterStore();