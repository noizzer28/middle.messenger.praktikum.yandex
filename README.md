# Чат-приложение на собственном фреймворке

Веб-приложение для обмена сообщениями с использованием кастомного компонентного подхода и роутинга.  
За основу был взят макет с применением кастомных стилей:  
👉 [Figma-дизайн](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&node-type=canvas&t=hp8rXYnGtQ6uKWOt-0)

---

## 🌟 Особенности

- 🔧 Кастомная компонентная система на классах
- 🌐 Собственный роутер с поддержкой history API
- 🔐 Авторизация/регистрация пользователей
- 👤 Редактирование профиля
- 💬 Чат с WebSocket-интеграцией
- ✅ Валидация форм
- 📦 Глобальный стор состояний
- 🔁 Перерендер с помощью EventBus

## 🛠 Технологии

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?logo=sass&logoColor=white)
![Handlebars](https://img.shields.io/badge/-Handlebars-000000?logo=handlebars.js&logoColor=white)

Стартовой страницей является страница логина: [Login](https://yandex-talk-noizzer.netlify.app/login)
Страница регистрации: [Register](https://yandex-talk-noizzer.netlify.app/register)
Страница профиля: [Profile](https://yandex-talk-noizzer.netlify.app/profile)
Страница чатов: [Chats](https://yandex-talk-noizzer.netlify.app/chat)
404: [404](https://yandex-talk-noizzer.netlify.app/404)
500:[500](https://yandex-talk-noizzer.netlify.app/500)

## 🧪 Тесты

Для проверки корректной работы ключевых модулей в проекте используются **юнит-тесты** с `Mocha`, `Chai`, `Sinon` и `jsdom`.  
Тестируются следующие части приложения:

- ✅ **EventBus** — подписка, отписка, вызов событий, логирование
- ✅ **HTTPTransport** — методы `get`, `post`, `put`, `delete`, обработка ошибок
- ✅ **Block** — отображение, скрытие, установка событий и props, ререндер

## Запуск и настройка

- Запустить сервер разработки:
  npm run dev

- Собрать production-версию:
  npm run build

- Запустить тесты:
  npm run test
