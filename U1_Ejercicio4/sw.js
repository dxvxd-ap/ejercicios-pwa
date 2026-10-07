// sw.js - Ejercicio 4: Cache API y Cache-First

const CACHE_NAME = 'ejercicio4-estatico-v1';

// 1. Almacenamiento de los recursos estáticos del App Shell
const APP_SHELL = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './assets/192x192.png',
    './assets/512x512.png'
];

// 2. Creación de la memoria caché durante el evento install
self.addEventListener('install', event => {
    const cachePromesa = caches.open(CACHE_NAME)
        .then(cache => {
            console.log('📦 Guardando App Shell en caché...');
            return cache.addAll(APP_SHELL);
        });

    event.waitUntil(cachePromesa);
    self.skipWaiting();
});

// Limpieza de cachés antiguos en la activación
self.addEventListener('activate', event => {
    const limpieza = caches.keys().then(keys => {
        return Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        );
    });
    event.waitUntil(limpieza);
    self.clients.claim();
});

// 3. Intercepción del evento fetch (Estrategia Cache-First)
self.addEventListener('fetch', event => {
    // Solo interceptar peticiones HTTP/HTTPS (evita errores con extensiones del navegador)
    if (!(event.request.url.startsWith('http:') || event.request.url.startsWith('https:'))) return;

    const respuestaCacheFirst = caches.match(event.request)
        .then(respuestaEnCache => {
            // Si el archivo existe en la caché, se sirve desde ahí instantáneamente
            if (respuestaEnCache) {
                return respuestaEnCache;
            }
            // Si no está en caché, entonces consulta a la red
            return fetch(event.request);
        });

    event.respondWith(respuestaCacheFirst);
});