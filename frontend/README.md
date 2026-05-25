# Frontend — схема рабочего процесса

Единый FSD-проект: Vue (таблица) + React (диаграмма) + single-spa.

## Структура (FSD)

```
src/
  app/                 # shell, single-spa, глобальные стили
  pages/workflow/      # layout страницы (config, ui, tests)
  widgets/
    workflow-table/    # api, config, lib, ui, tests
    workflow-diagram/  # api, config, lib, ui, tests
  features/select-step/
  entities/workflow-step/
  shared/
```

## Запуск

```bash
# терминал 1 — backend
cd ../backend && npm i && npm run dev

# терминал 2 — frontend
npm i
npm run dev
```

Открыть http://localhost:5173

## Тесты

```bash
npm run test:unit    # vitest — все *.test.ts в src
npm run test:e2e     # cypress (нужен npm run dev или preview)
```
