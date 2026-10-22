const CACHE_DINAMICO = 'ejercicio5-network-first-v2';

self.addEventListener('install', event => {
    // Al instalar, guardamos de inmediato los archivos base
    event.waitUntil(
        caches.open(CACHE_DINAMICO).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './app.js'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // Limpiamos cachés viejas si cambiamos el nombre
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_DINAMICO) return caches.delete(key);
            })
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // Evitar interceptar extensiones de Chrome
    if (!event.request.url.startsWith('http')) return;

    // Estrategia Network-First global
    const respuestaNetworkFirst = fetch(event.request)
        .then(respuestaRed => {
            // 1. Hay internet: Clonamos lo que llega y lo guardamos en caché dinámico
            const respuestaClonada = respuestaRed.clone();
            caches.open(CACHE_DINAMICO).then(cache => {
                cache.put(event.request, respuestaClonada);
            });
            // Devolvemos la respuesta fresca de internet
            return respuestaRed;
        })
        .catch(() => {
            // 2. No hay internet: Buscamos en la caché dinámica lo último que se guardó
            return caches.match(event.request);
        });

    event.respondWith(respuestaNetworkFirst);
});