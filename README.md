# Hiramatsukai Internacional

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss)

> Plataforma web de gestión integral para escuelas de artes marciales tradicionales. Desarrollada para **Hiramatsukai Internacional**, escuela dedicada a la enseñanza de **Goju-Ryu Karate-Do**, **Kobudo Okinawense** y **Kendo Iaido**.

🌐 **Sitio web:** [hiramatsukai.com](https://hiramatsukai.com)

---

## Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [El Problema](#el-problema)
- [La Solución](#la-solución)
- [Impacto](#impacto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Despliegue](#despliegue)

---

## Sobre el Proyecto

**Hiramatsukai** es una plataforma web diseñada para digitalizar y optimizar la gestión operativa de escuelas de artes marciales. El proyecto nace de la necesidad de modernizar los processos administrativos de una escuela tradicional que imparte disciplinas marciales de origen okinawense, ofreciendo una experiencia moderna tanto para instructores como para estudiantes.

La plataforma cubre desde la presencia pública de la escuela (información, dojos afiliados, disciplinas) hasta un panel administrativo completo con gestión de alumnos, actividades, pagos, postulaciones a exámenes y configuración del dojo.

---

## El Problema

Las escuelas de artes marciales tradicionales enfrentan desafíos operativos significativos:

- **Gestión manual de alumnos:** Control de estudiantes en planillas físicas o hojas de cálculo, dificultando la búsqueda, actualización y consulta de información en tiempo real.
- **Pagos desorganizados:** Seguimiento de mensualidades sin un sistema centralizado, generando deudas no detectadas y falta de visibilidad financiera.
- **Processos de postulación lentos:** La inscripción a exámenes requería formularios en papel o comunicación manual, causando demoras y errores.
- **Comunicación fragmentada:** Información de horarios, actividades y novedades distribuida en múltiples canales sin una fuente única de verdad.
- **Sin presencia digital:** Ausencia de un sitio web profesional que refleje la identidad de la escuela y facilite el acceso a información pública.
- **Escalabilidad limitada:** Los processos manuales no escalan con el crecimiento del número de alumnos y dojos afiliados.

---

## La Solución

Se desarrolló una **aplicación web fullstack** compuesta por:

- **Frontend SPA** construido con React 19, TypeScript y Vite 7, desplegado en Vercel.
- **Backend API REST** desplegado en Render, consumido mediante Axios con interceptors personalizados.

### Decisiones Clave de Implementación

| Área | Solución | Justificación |
|------|----------|---------------|
| **Autenticación** | JWT + Google OAuth | Seguridad robusta con login social para reducir fricción |
| **Estado del servidor** | TanStack React Query v5 | Cache inteligente, sincronización y manejo de estados asíncronos |
| **Estado del cliente** | Zustand v5 | Estado global ligero con persistencia para auth |
| **Formularios** | react-hook-form + Zod | Validación type-safe con schemas declarativos |
| **UI** | shadcn/ui + Tailwind CSS v4 | Componentes accesibles, modernos y altamente customizables |
| **Build** | Vite + SWC | Compilación ultrarrápida (SWC en lugar de Babel) |
| **PWA** | vite-plugin-pwa | Instalable en dispositivos móviles con soporte offline |
| **SEO** | RouteSeo + JSON-LD | Posicionamiento en buscadores para el sitio público |

---

## Impacto

### Optimización Administrativa

- **Centralización de datos:** Toda la información de alumnos, actividades y pagos accesible desde una única plataforma.
- **Acceso en tiempo real:** Instructores y administradores pueden consultar y actualizar información desde cualquier dispositivo.
- **Automatización de processos:** La postulación a exámenes, el seguimiento de pagos y la gestión de actividades se realizan de forma digital.

### Experiencia del Usuario

- **Panel personalizado:** Cada rol (Administrador, Instructor, Estudiante) tiene una vista adaptada a sus necesidades.
- **Dashboard con métricas:** Visualización de asistencia, ingresos, cumpleanos próximos y actividad reciente.
- **PWA instalable:** Acceso rápido desde el celular como una aplicación nativa, sin necesidad de app store.

### Presencia Digital

- **SEO optimizado:** El sitio público está indexado en buscadores con metadatos dinámicos por ruta.
- **Sitio profesional:** Información estructurada sobre las disciplinas, dojos afiliados y la historia de la escuela.
- **Schema.org:** Datos estructurados para motores de búsqueda (Organization + WebSite).

### Escalabilidad

- **Arquitectura modular:** Componentes reutilizables, hooks personalizados y servicios desacoplados.
- **Roles y permisos:** Sistema de 5 roles con diferentes niveles de acceso, preparado para crecer.
- **API REST independiente:** El backend puede servir múltiples clientes (web, móvil, terceros).

---

## Funcionalidades

### Sitio Público

- **Página de inicio** con secciones: About Us, Goju-Ryu Karate-Do, Kobudo Okinawense, Kendo Iaido, Dojos afiliados.
- **Páginas de información** detallada por disciplina.
- **Detalle de dojos afiliados** con información, horarios, redes sociales, galería de imágenes y maestros.
- **Login** con usuario/password y Google OAuth.

### Panel Administrativo

| Módulo | Descripción | Roles |
|--------|-------------|-------|
| **Dashboard** | Métricas: estudiantes activos, cinturones avanzados, ingresos mensuales, asistencia, cumpleanos | Todos |
| **Yo** | Vista personal del perfil del usuario | Todos |
| **Alumnos** | CRUD de estudiantes con vista grid/lista, búsqueda en tiempo real, detalle con transiciones | Admin, Instructor |
| **Actividades** | Gestión de clases y exámenes con vista de tabla/tarjetas, calendario, filtros | Admin, Instructor |
| **Postulaciones** | Sistema de inscripción a exámenes, historial, sugerencias automáticas, guardado de resultados | Admin, Instructor |
| **Pagos** | Control de mensualidades, comprobantes, estadísticas (al día, deudores, morosos, recaudado) | Admin, Instructor |
| **Configuración** | Edición del dojo, horarios, métodos de pago, mensualidades | Admin, Instructor |
| **Perfil** | Edición de información personal, cambio de contraseña, avatar | Todos |

### Funcionalidades Transversales

- **PWA completa** con manifest, service worker y iconos maskables.
- **SEO dinámico** con actualización de title, meta description, canonical, OpenGraph y Twitter Card por ruta.
- **Schema.org JSON-LD** para datos estructurados.
- **Sitemap XML** y **robots.txt** configurados.
- **Animaciones** con Framer Motion (scroll reveal, transiciones slide entre vistas).
- **Tema dark/light** con next-themes.
- **Soporte de accesibilidad** con aria labels, HTML semántico y reduced motion.

---

## Stack Tecnológico

### Core

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.2.3 | Framework UI |
| TypeScript | 5.9.3 | Tipado estático |
| Vite | 7.3.1 | Build tool y dev server |
| @vitejs/plugin-react-swc | 4.2.2 | Compilación con SWC |

### UI y Estilos

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Tailwind CSS | 4.1.18 | Framework CSS (v4, config via `@theme`) |
| shadcn/ui | - | Componentes UI (30+ componentes) |
| Radix UI | Múltiples | Primitivas de UI (dialog, dropdown, tabs, select) |
| Framer Motion | 12.38.0 | Animaciones y transiciones |
| lucide-react | 0.562.0 | Iconografía |
| next-themes | 0.4.6 | Tema dark/light |

### Estado y Datos

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Zustand | 5.0.10 | Estado global (4 stores) |
| @tanstack/react-query | 5.90.19 | Server state y cache |
| Axios | 1.13.2 | Cliente HTTP con interceptors |

### Formularios y Validación

| Tecnología | Versión | Uso |
|------------|---------|-----|
| react-hook-form | 7.71.0 | Formularios |
| Zod | 4.3.5 | Validación de esquemas |

### Router

| Tecnología | Versión | Uso |
|------------|---------|-----|
| react-router | 7.12.0 | Enrutamiento SPA |

### Autenticación

| Tecnología | Versión | Uso |
|------------|---------|-----|
| @react-oauth/google | 0.13.4 | Login con Google OAuth |
| jwt-decode | 4.0.0 | Decodificación de JWT |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Vercel)                    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Pages    │  │Components│  │  Layouts │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │              │              │                    │
│       └──────────────┼──────────────┘                    │
│                      ▼                                   │
│              ┌──────────────┐                            │
│              │    Hooks     │                            │
│              │ (useStudents,│                            │
│              │ useActivities│                            │
│              │ useDojos)    │                            │
│              └──────┬───────┘                            │
│                     ▼                                   │
│         ┌───────────────────────┐                       │
│         │   TanStack React Query │                       │
│         │   + Zustand Stores     │                       │
│         └───────────┬───────────┘                       │
│                     ▼                                   │
│         ┌───────────────────────┐                       │
│         │    Services (Axios)   │                       │
│         │  + Interceptors       │                       │
│         └───────────┬───────────┘                       │
└─────────────────────┼───────────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND API REST (Render)                   │
│            https://hiramatsukai-api.onrender.com         │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **UI** renderiza componentes que consumen hooks personalizados.
2. **Hooks** encapsulan la lógica de negocio y exponen queries/mutations de React Query.
3. **Services** realizan llamadas HTTP a la API REST mediante Axios.
4. **Interceptors** manejan errores globalmente (logout en 401, toast notifications).
5. **Stores** de Zustand manejan estado del cliente con persistencia (auth en localStorage).

---

## Instalación

### Requisitos

- Node.js >= 18
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/hiramatsukai.git
cd hiramatsukai

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://hiramatsukai-api.onrender.com/api
VITE_GOOGLE_CLIENT_ID=tu-google-client-id
```

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API REST backend |
| `VITE_GOOGLE_CLIENT_ID` | Client ID de Google OAuth para login social |

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `npm run dev` | Inicia servidor de desarrollo con HMR |
| `build` | `npm run build` | Compila TypeScript y genera build de producción |
| `preview` | `npm run preview` | Vista previa del build de producción |
| `lint` | `npm run lint` | Ejecuta ESLint en todo el proyecto |

---

## Estructura del Proyecto

```
Hiramatsukai/
├── public/                    # Assets estáticos (imágenes, sitemap, robots.txt)
├── src/
│   ├── assets/                # Assets importados (SVGs)
│   ├── components/            # Componentes reutilizables
│   │   ├── animation/         # Animaciones (Framer Motion)
│   │   ├── calendar/          # Calendario
│   │   ├── card/              # Tarjetas
│   │   ├── detailView/        # Layout de vistas de detalle
│   │   ├── dialog/            # Diálogos modales
│   │   ├── form/              # Formulario genérico reutilizable
│   │   ├── table/             # Tabla con paginación
│   │   ├── tabs/              # Pestañas
│   │   ├── toastMessage/      # Notificaciones toast
│   │   └── ui/                # Componentes shadcn/ui (30+)
│   ├── helpers/               # Utilidades (fechas, formateo, rangos, token)
│   ├── hooks/                 # Hooks personalizados (useStudents, useActivities, etc.)
│   ├── layouts/               # Layouts de página (Admin, App, Sidebar, Header, Footer)
│   ├── lib/                   # Utilidades (cn para Tailwind)
│   ├── pages/                 # Páginas y vistas
│   │   ├── Home/              # Página de inicio
│   │   ├── Admin/             # Panel administrativo
│   │   │   ├── Activities/    # Gestión de actividades
│   │   │   ├── Applications/  # Sistema de postulaciones
│   │   │   ├── Payments/      # Gestión de pagos
│   │   │   ├── Students/      # Gestión de alumnos
│   │   │   └── ...            # Dashboard, Perfil, Config, etc.
│   │   ├── Login/             # Autenticación
│   │   └── *Info/             # Páginas de información pública
│   ├── queries/               # Mutations y queries de React Query
│   ├── services/              # Servicios API (auth, students, activities, dojos, profile)
│   │   └── api.ts             # Instancia Axios + interceptors
│   └── stores/                # Stores de Zustand (auth, students, activities, applications)
├── index.html                 # Entry point HTML (SEO, Schema.org JSON-LD)
├── vite.config.ts             # Configuración de Vite + PWA
├── components.json            # Configuración de shadcn/ui
└── tsconfig.json              # Configuración de TypeScript
```

---

## Despliegue

### Frontend — Vercel

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **SPA rewrites:** Configurado en `vercel.json` para rutas de client-side routing

### Backend — Render

- **API URL:** `https://hiramatsukai-api.onrender.com/api`
- Desplegado como servicio web en Render con build automático desde el repositorio.

### CI/CD

- **Vercel** despliega automáticamente en cada push a la rama principal.
- **Render** reconstruye el backend en cada push al repositorio del API.

---

## Licencia

Proyecto privado — Hiramatsukai Internacional.

---

**Desarrollado con dedication para la preservación de las artes marciales tradicionales.**
