# API de alumnos

## Iniciar en Windows

Desde PowerShell, ejecuta:

```powershell
Set-Location .\backend
bundle install
bundle exec rails db:prepare
bundle exec rails server -p 3000
```

Deja ese terminal abierto mientras usas Angular. La API queda disponible en `http://localhost:3000/alumnos`; el backend permite solicitudes CORS desde `http://localhost:4200`.

## Rutas

- `GET /alumnos`: listar alumnos
- `GET /alumnos/:id`: consultar un alumno
- `POST /alumnos`: crear un alumno
- `PUT /alumnos/:id`: actualizar un alumno
- `DELETE /alumnos/:id`: eliminar un alumno

Las solicitudes de creación y actualización reciben los campos dentro de `alumno`, por ejemplo: `{ "alumno": { "nombre": "Ana", "apellido": "Perez", "edad": 15, "correo": "ana@example.com" } }`.
