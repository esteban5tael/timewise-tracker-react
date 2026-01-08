# TimeWise Tracker - Frontend

Aplicación React para rastreo de tiempo de proyectos, migrada de Next.js a React puro con Vite.

## Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes UI accesibles
- **json-server** - Backend API (ver carpeta `../back`)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se ejecutará en `http://localhost:9002`

**Importante**: Asegúrate de que el backend json-server esté corriendo en `http://localhost:3001` antes de iniciar el frontend.

## Build

```bash
npm run build
```

## Estructura

```
src/
├── components/      # Componentes React
│   ├── ui/          # Componentes UI reutilizables
│   └── ...          # Componentes de la aplicación
├── context/         # Context API para estado global
├── hooks/           # Custom hooks
├── lib/             # Utilidades y tipos
└── App.tsx          # Componente principal
```

## Características

- ⏱️ Timer para rastrear tiempo de trabajo
- 📊 Reportes de tiempo por proyecto
- 📁 Gestión de proyectos
- 💾 Persistencia de datos con json-server
- 🎨 UI moderna con Tailwind CSS
