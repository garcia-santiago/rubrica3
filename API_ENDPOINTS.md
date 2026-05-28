# Rubrica3 API Reference

Base URL for local development:

```txt
http://localhost:3000
```

All request bodies are JSON. Send this header for requests with a body:

```txt
Content-Type: application/json
```

## Auth

### Register User

Creates a user account. The backend hashes `contrasena` with bcrypt before saving it.

```txt
POST /auth/registro
```

Request body:

```json
{
  "nombres": "Ana",
  "apellidos": "Garcia",
  "correo": "ana@example.com",
  "telefono": "3001234567",
  "zona_residencia": "Norte",
  "dias_disponibles": ["lunes", "miercoles"],
  "contrasena": "123456"
}
```

Success response: `201 Created`

```json
{
  "id": 1,
  "nombres": "Ana",
  "apellidos": "Garcia",
  "correo": "ana@example.com",
  "telefono": "3001234567",
  "zona_residencia": "Norte",
  "dias_disponibles": ["lunes", "miercoles"]
}
```

Frontend notes:

- Use this for a signup screen.
- Do not expect `contrasena` in the response.
- Store the returned user object if the app treats registration as a logged-in state.

### Login

Authenticates a user by `correo` and `contrasena`. The backend compares the submitted password against the stored bcrypt hash.

```txt
POST /auth/login
```

Request body:

```json
{
  "correo": "ana@example.com",
  "contrasena": "123456"
}
```

Success response: `200 OK`

```json
{
  "id": 1,
  "nombres": "Ana",
  "apellidos": "Garcia",
  "correo": "ana@example.com",
  "telefono": "3001234567",
  "zona_residencia": "Norte",
  "dias_disponibles": ["lunes", "miercoles"]
}
```

Error response: `401 Unauthorized`

```json
{
  "mensaje": "Credenciales invalidas"
}
```

Frontend notes:

- There is currently no JWT/session token returned.
- Use the returned user object for local UI state.
- Show the `mensaje` field on login failure.

## Usuarios

User records. Passwords are intentionally excluded from list/detail/update responses.

### List Users

```txt
GET /usuarios
```

Success response: `200 OK`

```json
[
  {
    "id": 1,
    "nombres": "Ana",
    "apellidos": "Garcia",
    "correo": "ana@example.com",
    "telefono": "3001234567",
    "zona_residencia": "Norte",
    "dias_disponibles": ["lunes", "miercoles"]
  }
]
```

Frontend notes:

- Use for user tables, dropdowns, assignment selectors, and admin lists.

### Get User By ID

```txt
GET /usuarios/:id
```

Example:

```txt
GET /usuarios/1
```

Success response: `200 OK`

```json
{
  "id": 1,
  "nombres": "Ana",
  "apellidos": "Garcia",
  "correo": "ana@example.com",
  "telefono": "3001234567",
  "zona_residencia": "Norte",
  "dias_disponibles": ["lunes", "miercoles"]
}
```

### Update User

Updates a user. Fields are optional; omitted fields keep their current value. If `contrasena` is sent, the backend hashes it before saving.

```txt
PUT /usuarios/:id
```

Example:

```txt
PUT /usuarios/1
```

Request body:

```json
{
  "nombres": "Ana Maria",
  "telefono": "3019998888",
  "zona_residencia": "Sur",
  "contrasena": "nueva123"
}
```

Success response: `200 OK`

```json
{
  "id": 1,
  "nombres": "Ana Maria",
  "apellidos": "Garcia",
  "correo": "ana@example.com",
  "telefono": "3019998888",
  "zona_residencia": "Sur",
  "dias_disponibles": ["lunes", "miercoles"]
}
```

Error response: `404 Not Found`

```json
{
  "mensaje": "Usuario no encontrado"
}
```

### Delete User

```txt
DELETE /usuarios/:id
```

Example:

```txt
DELETE /usuarios/1
```

Success response: `200 OK`

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

Error response: `404 Not Found`

```json
{
  "mensaje": "Usuario no encontrado"
}
```

## Zonas de Cultivo

Cultivation zones managed by the system.

### List Zones

```txt
GET /zonas-cultivo
```

Success response: `200 OK`

```json
[
  {
    "id": 1,
    "nombre": "Huerta Norte",
    "tamano": 120,
    "tipo_cultivo": "Tomate",
    "estado": "Activa",
    "id_responsable": 1
  }
]
```

Frontend notes:

- Use for zone dashboards, lists, cards, and task creation forms.
- `id_responsable` references a user.

### Create Zone

```txt
POST /zonas-cultivo
```

Request body:

```json
{
  "nombre": "Huerta Norte",
  "tamano": 120,
  "tipo_cultivo": "Tomate",
  "estado": "Activa",
  "id_responsable": 1
}
```

Success response: `201 Created`

```json
{
  "id": 1,
  "nombre": "Huerta Norte",
  "tamano": 120,
  "tipo_cultivo": "Tomate",
  "estado": "Activa",
  "id_responsable": 1
}
```

### Update Zone

Fields are optional; omitted fields keep their current value.

```txt
PUT /zonas-cultivo/:id
```

Example:

```txt
PUT /zonas-cultivo/1
```

Request body:

```json
{
  "estado": "Mantenimiento",
  "tipo_cultivo": "Lechuga"
}
```

Success response: `200 OK`

```json
{
  "id": 1,
  "nombre": "Huerta Norte",
  "tamano": 120,
  "tipo_cultivo": "Lechuga",
  "estado": "Mantenimiento",
  "id_responsable": 1
}
```

Error response: `404 Not Found`

```json
{
  "mensaje": "Zona no encontrada"
}
```

### Delete Zone

```txt
DELETE /zonas-cultivo/:id
```

Example:

```txt
DELETE /zonas-cultivo/1
```

Success response:

```json
{
  "mensaje": "Zona eliminada correctamente"
}
```

## Tareas

Tasks assigned to users and zones.

### List Tasks

```txt
GET /tareas
```

Success response: `200 OK`

```json
[
  {
    "id": 1,
    "id_zona": 1,
    "id_usuario_asignado": 1,
    "titulo": "Regar cultivo",
    "descripcion": "Regar la zona durante 30 minutos",
    "tipo_tarea": "Riego",
    "fecha_tarea": "2026-05-28T00:00:00.000Z"
  }
]
```

Frontend notes:

- Use `id_zona` to connect a task with `/zonas-cultivo`.
- Use `id_usuario_asignado` to connect a task with `/usuarios`.
- The API currently does not include a task `estado` field.

### Create Task

```txt
POST /tareas
```

Request body:

```json
{
  "id_zona": 1,
  "id_usuario_asignado": 1,
  "titulo": "Regar cultivo",
  "descripcion": "Regar la zona durante 30 minutos",
  "tipo_tarea": "Riego",
  "fecha_tarea": "2026-05-28"
}
```

Success response: `201 Created`

```json
{
  "id": 1,
  "id_zona": 1,
  "id_usuario_asignado": 1,
  "titulo": "Regar cultivo",
  "descripcion": "Regar la zona durante 30 minutos",
  "tipo_tarea": "Riego",
  "fecha_tarea": "2026-05-28T00:00:00.000Z"
}
```

### Update Task

Fields are optional; omitted fields keep their current value.

```txt
PUT /tareas/:id
```

Example:

```txt
PUT /tareas/1
```

Request body:

```json
{
  "titulo": "Regar cultivo actualizado",
  "descripcion": "Regar la zona durante 45 minutos",
  "fecha_tarea": "2026-05-29"
}
```

Success response: `200 OK`

```json
{
  "id": 1,
  "id_zona": 1,
  "id_usuario_asignado": 1,
  "titulo": "Regar cultivo actualizado",
  "descripcion": "Regar la zona durante 45 minutos",
  "tipo_tarea": "Riego",
  "fecha_tarea": "2026-05-29T00:00:00.000Z"
}
```

Error response: `404 Not Found`

```json
{
  "mensaje": "Tarea no encontrada"
}
```

### Delete Task

```txt
DELETE /tareas/:id
```

Example:

```txt
DELETE /tareas/1
```

Success response:

```json
{
  "mensaje": "Tarea eliminada correctamente"
}
```

## Participaciones

Participation records connect users to tasks and track worked hours.

### Create Participation

```txt
POST /participaciones
```

Request body:

```json
{
  "id_usuario": 1,
  "id_tarea": 1,
  "horas_trabajadas": 3
}
```

Success response: `201 Created`

```json
{
  "id": 1,
  "id_usuario": 1,
  "id_tarea": 1,
  "horas_trabajadas": 3
}
```

Frontend notes:

- Use this after a user completes work on a task.
- `id_usuario` references `/usuarios`.
- `id_tarea` references `/tareas`.

### Update Participation

Fields are optional; omitted fields keep their current value.

```txt
PUT /participaciones/:id
```

Example:

```txt
PUT /participaciones/1
```

Request body:

```json
{
  "horas_trabajadas": 4
}
```

Success response: `200 OK`

```json
{
  "id": 1,
  "id_usuario": 1,
  "id_tarea": 1,
  "horas_trabajadas": 4
}
```

Error response: `404 Not Found`

```json
{
  "mensaje": "Participacion no encontrada"
}
```

### Delete Participation

```txt
DELETE /participaciones/:id
```

Example:

```txt
DELETE /participaciones/1
```

Success response:

```json
{
  "mensaje": "Participacion eliminada correctamente"
}
```

## Estadisticas

Read-only aggregate endpoints for dashboard views.

### Total Hours

Returns the total worked hours from all participation records.

```txt
GET /estadisticas/horas
```

Success response: `200 OK`

```json
{
  "total_horas": "12"
}
```

Frontend notes:

- PostgreSQL may return aggregate numbers as strings.
- Convert `total_horas` to a number in the frontend if needed.

### Participation By Zone

Returns each cultivation zone with the number of tasks associated with it.

```txt
GET /estadisticas/zonas
```

Success response: `200 OK`

```json
[
  {
    "nombre": "Huerta Norte",
    "total_tareas": "3"
  },
  {
    "nombre": "Huerta Sur",
    "total_tareas": "1"
  }
]
```

Frontend notes:

- Useful for dashboard charts.
- `total_tareas` may arrive as a string; convert it to a number for charts.

## Bitacora

Read-only endpoints for showing the tasks completed or worked by each user. These endpoints are based on `participaciones`, which connects users with tasks and worked hours.

### User Task Log

Returns all task participation records for one user, including task and zone details.

```txt
GET /bitacora/usuarios/:id_usuario
```

Example:

```txt
GET /bitacora/usuarios/1
```

Success response: `200 OK`

```json
[
  {
    "id_participacion": 1,
    "id_usuario": 1,
    "id_tarea": 1,
    "horas_trabajadas": 3,
    "titulo": "Regar cultivo",
    "descripcion": "Regar la zona durante 30 minutos",
    "tipo_tarea": "Riego",
    "fecha_tarea": "2026-05-28T00:00:00.000Z",
    "id_zona": 1,
    "zona_nombre": "Huerta Norte"
  }
]
```

Frontend notes:

- Use this for a user's personal task history or bitacora screen.
- If the array is empty, show an empty state like "Aun no hay tareas registradas".
- `id_participacion` can be used to edit or delete the participation through `/participaciones/:id`.
- `horas_trabajadas` may arrive as a number or string depending on the database column type.

### User Task Log Summary

Returns totals for one user's bitacora.

```txt
GET /bitacora/usuarios/:id_usuario/resumen
```

Example:

```txt
GET /bitacora/usuarios/1/resumen
```

Success response: `200 OK`

```json
{
  "id_usuario": 1,
  "total_participaciones": "4",
  "total_horas": "12"
}
```

Frontend notes:

- Use this for cards like "Tareas realizadas" and "Horas trabajadas".
- PostgreSQL may return aggregate numbers as strings; convert them to numbers if needed for charts or calculations.

## Suggested Frontend Screens

Build the frontend around these views:

- Login screen: calls `POST /auth/login`.
- Register screen: calls `POST /auth/registro`.
- Dashboard screen: calls `GET /estadisticas/horas` and `GET /estadisticas/zonas`.
- Users screen: list, edit, and delete users using `/usuarios`.
- Zones screen: list, create, edit, and delete cultivation zones using `/zonas-cultivo`.
- Tasks screen: list, create, edit, and delete tasks using `/tareas`.
- Participation screen: create/edit/delete participation records using `/participaciones`.
- User bitacora screen: show task history and totals using `/bitacora/usuarios/:id_usuario` and `/bitacora/usuarios/:id_usuario/resumen`.

## Entity Relationships

- `zonas_cultivo.id_responsable` points to `usuarios.id`.
- `tareas.id_zona` points to `zonas_cultivo.id`.
- `tareas.id_usuario_asignado` points to `usuarios.id`.
- `participaciones.id_usuario` points to `usuarios.id`.
- `participaciones.id_tarea` points to `tareas.id`.

## Implementation Notes For Frontend AI

- No authentication token is currently implemented.
- Treat logged-in user state as local app state after login.
- Use forms with partial update support for `PUT` endpoints.
- Do not send empty strings for fields the user did not edit unless the app intentionally wants to overwrite the value with an empty string.
- For delete actions, show a confirmation dialog before calling `DELETE`.
- Use users and zones as lookup data when creating tasks.
- Use users and tasks as lookup data when creating participations.
Deployment URL https://rubrica3-production.up.railway.app/
