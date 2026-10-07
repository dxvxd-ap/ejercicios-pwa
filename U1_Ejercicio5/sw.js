// sw.js - Ejercicio 5: Interceptor y Fallback Offline

const CACHE_NAME = 'ejercicio5-estatico-v1';

const APP_SHELL = [
    './',
    './index.html',
    './offline.html', // <-- Se agrega la plantilla a la memoria inicial
    './app.js',
    './manifest.json',
    './assets/192x192.png',
    './assets/512x512.png'
];

self.addEventListener('install', event => {
    const cachePromesa = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(APP_SHELL));
    event.waitUntil(cachePromesa);
    self.skipWaiting();
});

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

self.addEventListener('fetch', event => {
    if (!(event.request.url.startsWith('http:') || event.request.url.startsWith('https:'))) return;

    const respuestaCacheFirst = caches.match(event.request)
        .then(respuestaEnCache => {
            if (respuestaEnCache) {
                return respuestaEnCache;
            }

            // Si no está en caché, consulta a la red. Si la red falla, entra al catch.
            return fetch(event.request).catch(() => {
                // Se verifica si la petición original era para una página web (HTML)
                if (event.request.headers.get('accept').includes('text/html')) {
                    // Se renderiza el "Modo Sin Conexión"
                    return caches.match('./offline.html');
                }
            });
        });

    event.respondWith(respuestaCacheFirst);
});