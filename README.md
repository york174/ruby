# CRUD de alumnos

Aplicación con frontend Angular y API Ruby on Rails.

## Iniciar el backend

En una terminal, desde la raíz del proyecto:

```powershell
Set-Location .\backend
bundle install
bundle exec rails db:prepare
bundle exec rails server -p 3000
```

## Iniciar el frontend

En otra terminal, desde la raíz del proyecto:

```powershell
Set-Location .\frontend
npm install
npm start
```

La aplicación estará disponible en `http://localhost:4200` y la API en `http://localhost:3000/alumnos`.
