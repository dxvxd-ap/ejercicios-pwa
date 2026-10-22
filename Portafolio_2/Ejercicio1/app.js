const estadoPermisoText = document.getElementById('estado-permiso');
const btnObtenerGps = document.getElementById('btn-obtener-gps');
const resultadoCoordenadas = document.getElementById('resultado-coordenadas');
const textoLatitud = document.getElementById('texto-latitud');
const textoLongitud = document.getElementById('texto-longitud');

// 1. Evaluar el estado de los permisos sin bloquear la interfaz
function verificarPermisosUbicacion() {
    if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'geolocation' })
            .then(resultado => {
                actualizarInterfazPermiso(resultado.state);

                // Escuchar si el usuario cambia el permiso manualmente
                resultado.onchange = () => {
                    actualizarInterfazPermiso(resultado.state);
                };
            })
            .catch(error => console.error('Error en Permissions API:', error));
    } else {
        estadoPermisoText.textContent = 'No soportado';
    }
}

function actualizarInterfazPermiso(estado) {
    if (estado === 'granted') {
        estadoPermisoText.textContent = 'Concedido ✅';
        estadoPermisoText.className = 'text-lg font-semibold text-green-400';
    } else if (estado === 'prompt') {
        estadoPermisoText.textContent = 'Esperando solicitud ⚠️';
        estadoPermisoText.className = 'text-lg font-semibold text-yellow-400';
    } else if (estado === 'denied') {
        estadoPermisoText.textContent = 'Denegado ❌';
        estadoPermisoText.className = 'text-lg font-semibold text-red-500';
    }
}

// 2. Solicitar posición exacta del GPS
btnObtenerGps.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                textoLatitud.textContent = posicion.coords.latitude;
                textoLongitud.textContent = posicion.coords.longitude;
                resultadoCoordenadas.classList.remove('hidden');
            },
            (error) => {
                alert('Error al obtener ubicación. Código: ' + error.code);
            }
        );
    } else {
        alert('Geolocalización no soportada en este navegador.');
    }
});

// Iniciar verificación al cargar
verificarPermisosUbicacion();