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

## Agregar un nuevo dato a la base de datos

Los cambios de base de datos deben hacerse mediante una migración de Rails. Desde la carpeta `backend`, por ejemplo, para agregar el campo `direccion` a los alumnos:

```powershell
cd D:\tarea\ruby\backend
bundle exec rails generate migration AddDireccionToAlumnos direccion:string
bundle exec rails db:migrate
```

Después de crear y aplicar la migración, actualiza los archivos necesarios para que el campo llegue desde Angular hasta Rails:

- [alumno.rb](backend/app/models/alumno.rb): agrega una validación si el dato será obligatorio.
- [alumnos_controller.rb](backend/app/controllers/alumnos_controller.rb): agrega el nombre del dato a `permit(...)`.
- [alumno.model.ts](frontend/src/app/models/alumno.model.ts): agrega el dato a la interfaz.
- [app.ts](frontend/src/app/app.ts): incluye el dato en el formulario y en el objeto enviado al backend.
- [app.html](frontend/src/app/app.html): agrega el dato a la tabla, a la vista de detalle y al formulario modal.

Ejemplo para el campo `direccion`:

```ruby
# backend/app/models/alumno.rb
validates :nombre, :apellido, :correo, :direccion, presence: true
```

```ruby
# backend/app/controllers/alumnos_controller.rb
params.require(:alumno).permit(
  :nombre, :apellido, :edad, :correo, :direccion
)
```

```typescript
// frontend/src/app/models/alumno.model.ts
export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  direccion: string;
}
```

Para aplicar las migraciones en otra base o entorno, ejecuta:

```powershell
bundle exec rails db:migrate
```

agregar una nueva linea  de base de datos

cd D:\tarea\ruby\backend
rails generate migration AddDireccionToAlumnos direccion:string
rails db:migrate

También debes actualizar:

alumno.rb: validación si la dirección será obligatoria.
alumnos_controller.rb: agregar :direccion a permit(...).
alumno.model.ts: agregar direccion: string.
app.ts: incluirla en el formulario y los datos enviados.
app.html: agregar el campo de dirección en la tabla y el modal.

