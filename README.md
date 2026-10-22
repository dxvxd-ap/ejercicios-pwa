# Portafolio de Ejercicios 1 y 2 - Aplicaciones Web Progresivas

Alumno: José David Atzin Pérez
Carrera: Ingeniería en Desarrollo y Gestión de Software
Escuela: Universidad Tecnológica de Gutiérrez Zamora

## Descripción
Este repositorio contiene el portafolio de evidencias enfocado en la construcción de la infraestructura técnica primaria para una Aplicación Web Progresiva (PWA), así como la integración de Web APIs, permisos y persistencia de datos local.

## Estructura del Repositorio - Portafolio 1
U1_Ejercicio1: Configuración del manifest.json. Incluye metadatos clave (start_url, display, colores de tema) y paquete de íconos (192x192 y 512x512) para habilitar la instalabilidad.
U1_Ejercicio2: Maquetado base de la arquitectura App Shell. Interfaz gráfica responsiva con Tailwind CSS.
U1_Ejercicio3: Registro asíncrono y control del ciclo de vida del Service Worker (install, activate, fetch).
U1_Ejercicio4: Uso de la Cache API. Almacenamiento de los recursos del App Shell y configuración de la estrategia Cache-First.
U1_Ejercicio5: Manejo avanzado del estado Offline. Intercepción de peticiones fetch con fallback para renderizar la plantilla offline.html sin conexión.

## Estructura del Repositorio - Portafolio 2
Ejercicio1: Consulta de permisos (Permissions API) y obtención asíncrona de coordenadas exactas (Geolocation API).
Ejercicio2: Acceso al hardware de video (getUserMedia) y captura de fotogramas estáticos en un elemento canvas.
Ejercicio3: Solicitud de permisos y disparo de notificaciones locales personalizadas vinculadas al Service Worker.
Ejercicio4: Operaciones CRUD asíncronas utilizando una base de datos local estructurada (IndexedDB).
Ejercicio5: Consumo de API REST remota implementando una estrategia Network-First con fallback a la caché dinámica.

## Stack Tecnológico
- HTML5 / CSS3 (Tailwind CSS)
- Vanilla JavaScript (Service Workers, Cache API)
- IndexedDB
- Web APIs (Geolocation, MediaDevices, Notification, Permissions)