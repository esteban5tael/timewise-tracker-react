# TimeWise Tracker - Migración a React

Este proyecto ha sido migrado de Next.js a React puro usando Vite, con json-server como backend para el almacenamiento de datos.

## Estructura del Proyecto

```
react/
├── front/          # Aplicación React con Vite
└── back/           # Backend con json-server
```

## Instalación y Configuración

### Backend (json-server)

1. Navega a la carpeta `back`:
```bash
cd react/back
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor json-server:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

### Frontend (React + Vite)

1. Navega a la carpeta `front`:
```bash
cd react/front
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:9002`

## Uso

1. **Inicia el backend primero**: Asegúrate de que json-server esté corriendo en el puerto 3001
2. **Luego inicia el frontend**: Ejecuta el servidor de desarrollo de Vite

## Endpoints de la API (json-server)

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
- `PUT /appData/:id` - Actualizar datos de la aplicación

## Características

- ✅ Migración completa de Next.js a React puro
- ✅ Uso de Vite como bundler
- ✅ json-server para persistencia de datos
- ✅ Todos los componentes UI migrados
- ✅ Context API para manejo de estado
- ✅ Tailwind CSS para estilos
- ✅ TypeScript para type safety

## Notas

- Los datos se guardan en `react/back/db.json`
- El proyecto original se mantiene intacto en la raíz del repositorio
- La estructura de datos se ha adaptado para funcionar con json-server
