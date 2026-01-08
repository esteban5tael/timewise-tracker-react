# TimeWise Tracker - Backend (JSON Server)

Este es el backend usando json-server para la aplicación TimeWise Tracker.

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## Endpoints disponibles

- `GET /projects` - Obtener todos los proyectos
- `POST /projects` - Crear un nuevo proyecto
- `GET /projects/:id` - Obtener un proyecto por ID
- `PUT /projects/:id` - Actualizar un proyecto
- `DELETE /projects/:id` - Eliminar un proyecto

- `GET /timeLogs` - Obtener todos los registros de tiempo
- `POST /timeLogs` - Crear un nuevo registro de tiempo
- `GET /timeLogs/:id` - Obtener un registro por ID
- `PUT /timeLogs/:id` - Actualizar un registro
- `DELETE /timeLogs/:id` - Eliminar un registro

- `GET /appData` - Obtener datos de la aplicación (incluye activeProjectId)
- `PUT /appData` - Actualizar datos de la aplicación
