const btnPermiso = document.getElementById('btn-permiso');
const btnNotificar = document.getElementById('btn-notificar');
const estadoPermiso = document.getElementById('estado-permiso');

// 1. Registrar el Service Worker al cargar la página
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('✅ Service Worker registrado con éxito.', reg.scope))
        .catch(err => console.error('❌ Error al registrar SW:', err));
}

// 2. Verificar el estado actual del permiso al cargar
if (Notification.permission === 'granted') {
    actualizarInterfaz('granted');
} else if (Notification.permission === 'denied') {
    actualizarInterfaz('denied');
}

// 3. Solicitar permiso al usuario
btnPermiso.addEventListener('click', async () => {
    const permiso = await Notification.requestPermission();
    actualizarInterfaz(permiso);
});

// Función para actualizar los botones y textos según el permiso
function actualizarInterfaz(permiso) {
    if (permiso === 'granted') {
        estadoPermiso.textContent = 'Concedido ✅';
        estadoPermiso.className = 'text-lg font-semibold text-green-400';
        btnNotificar.disabled = false;
    } else if (permiso === 'denied') {
        estadoPermiso.textContent = 'Denegado ❌';
        estadoPermiso.className = 'text-lg font-semibold text-red-500';
        btnNotificar.disabled = true;
    }
}

// 4. Disparar la notificación usando el Service Worker
btnNotificar.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            // Se utiliza showNotification a través del registro del SW según la rúbrica
            registration.showNotification('¡Alerta de MediRegistro!', {
                body: 'Esta es una notificación local disparada desde el Service Worker. Tienes una nueva actualización.',
                // Icono representativo de salud/registro
                icon: 'https://cdn-icons-png.flaticon.com/512/2950/2950321.png',
                // Patrón de vibración (vibra, pausa, vibra)
                vibrate: [200, 100, 200]
            });
        });
    }
});