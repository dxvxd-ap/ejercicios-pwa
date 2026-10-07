// sw.js - Ejercicio 3: Ciclo de Vida del Service Worker

// FASE 1: Instalación (install)
// Se dispara la primera vez que el navegador detecta este archivo o cuando hay una versión nueva.
self.addEventListener('install', event => {
    console.log('[Service Worker] Fase 1: Instalación (install) detectada.');

    // Forzamos al SW a instalarse inmediatamente sin esperar
    self.skipWaiting();
});

// FASE 2: Activación (activate)
// Se dispara después de que la instalación termina. Ideal para limpiar cachés viejos.
self.addEventListener('activate', event => {
    console.log('[Service Worker] Fase 2: Activación (activate) completada.');

    // Toma el control de todos los clientes (pestañas) abiertos inmediatamente
    event.waitUntil(self.clients.claim());
});

// FASE 3: Recuperación de Peticiones (fetch)
// Se dispara cada vez que la página web solicita un recurso (imágenes, CSS, datos, etc.)
self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fase 3: Interceptando petición (fetch) hacia ->', event.request.url);

    // Por ahora, dejamos que la petición pase directo a internet sin modificarla
    event.respondWith(fetch(event.request));
});