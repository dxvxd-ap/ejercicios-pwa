// sw.js - Service Worker para Notificaciones
self.addEventListener('install', event => {
    console.log('[SW] Instalado');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[SW] Activado');
    self.clients.claim();
});

// Escuchador para cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', event => {
    console.log('[SW] Notificación clickeada:', event.notification.title);
    event.notification.close(); // Cierra la notificación al hacer clic
});