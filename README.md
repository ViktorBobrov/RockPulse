# RockPulse

Веб-приложение для мониторинга строительной техники в режиме реального времени. Позволяет отслеживать статус машин, показатели двигателя, гидравлики, нагрузки и геолокацию на карте.

---

## Tech Stack

| Технология           | Версия |
| -------------------- | ------ |
| Next.js (App Router) | 16.1.6 |
| React                | 19     |
| TypeScript           | 5      |
| Tailwind CSS         | 4      |
| React Leaflet        | 5      |
| Leaflet              | 1.9    |
| Jest                 | 30     |

---

## Требования

- Node.js >= 18
- npm >= 9

---

## Установка и запуск

```bash
git clone https://github.com/ViktorBobrov/RockPulse.git
cd RockPulse/rockpulse
npm install
```

### Режимы запуска

```bash
npm run dev      # Разработка — http://localhost:3000
npm run build    # Сборка для продакшена
npm run start    # Запуск продакшен-сборки
npm run lint     # Проверка ESLint
npm test         # Тесты Jest
npm run format   # Форматирование Prettier
```

---

## Структура проекта

```
rockpulse/
├── app/
│   ├── (dashboard)/         # Защищённые маршруты (требуется авторизация)
│   │   ├── map/             # Страница карты с геолокацией машин
│   │   ├── layout.tsx
│   │   └── page.tsx         # Главная страница — монитор механика
│   ├── api/
│   │   └── machines/route.ts # GET, POST, PUT, DELETE списка машин
│   ├── components/
│   │   ├── Display.tsx      # Основной дашборд со списком и деталями машины
│   │   ├── ErrorBanner.tsx  # Баннер ошибки внутри формы
│   │   ├── ErrorScreen.tsx  # Экран, если список машин не загрузился
│   │   ├── Loader.tsx       # Индикатор загрузки
│   │   ├── MachineCard.tsx  # Карточка машины в списке
│   │   ├── MachineList.tsx  # Список всех машин
│   │   ├── MaschineModal.tsx # Модальное окно добавления и редактирования машины
│   │   ├── MashineMap.tsx   # Карта с маркерами машин (Leaflet)
│   │   ├── Navbar.tsx       # Навигационная панель
│   │   └── ProtectedRoute.tsx # HOC для защиты маршрутов
│   ├── hooks/
│   │   └── useFetch.ts      # Хук загрузки: data, error, loading
│   ├── login/               # Страница авторизации
│   ├── serverMock/          # Стартовые данные и функции запросов к /api
│   ├── types/               # TypeScript типы (Card, Status, UserRole и др.)
│   └── layout.tsx           # Корневой лейаут приложения
├── contexts/
│   ├── AuthContext.tsx      # Контекст авторизации и ролей пользователя
│   └── CardContext.tsx      # Контекст состояния списка машин
├── public/                  # Статические файлы
├── next.config.ts
├── tsconfig.json
├── jest.config.ts           # Настройка Jest
├── jest.setup.ts            # Подключение матчеров Testing Library
└── eslint.config.mjs
```

---

## Функциональность

- **Авторизация** — ролевая модель доступа (`UserRole`), сессия хранится в `localStorage`
- **Список машин** — просмотр статуса, температуры двигателя, гидравлики и нагрузки
- **Карта** — отображение геолокации выбранной машины через React Leaflet
- **Управление** — добавление, редактирование и удаление машин для роли `ADMIN`
- **Защищённые маршруты** — редирект на `/login` для неавторизованных пользователей
