const listaUsuarios = document.getElementById('lista-usuarios');
const estadoRed = document.getElementById('estado-red');
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 1. Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('✅ SW Registrado para Network-First'))
        .catch(err => console.error('Error SW:', err));
}

// 2. Monitorear el estado de la red visualmente
function actualizarEstadoRed() {
    if (navigator.onLine) {
        estadoRed.textContent = 'Conectado a Internet (Datos en vivo) 🟢';
        estadoRed.className = 'mb-4 text-sm font-semibold text-green-400';
    } else {
        estadoRed.textContent = 'Sin conexión (Mostrando datos locales de caché) 🔴';
        estadoRed.className = 'mb-4 text-sm font-semibold text-red-500';
    }
}

// Validar el estado inmediatamente al cargar la página
actualizarEstadoRed();

// Escuchar los cambios futuros
window.addEventListener('online', actualizarEstadoRed);
window.addEventListener('offline', actualizarEstadoRed);

// 3. Consumir la API remota
async function cargarUsuarios() {
    try {
        const respuesta = await fetch(API_URL);
        const usuarios = await respuesta.json();

        listaUsuarios.innerHTML = ''; // Limpiar lista

        // Renderizar los datos de la API
        usuarios.slice(0, 5).forEach(user => {
            const li = document.createElement('li');
            li.className = 'bg-gray-800 p-4 rounded-lg border border-gray-600 flex justify-between items-center';
            li.innerHTML = `
                <div>
                    <p class="font-bold text-gray-200">${user.name}</p>
                    <p class="text-xs text-indigo-300">${user.email}</p>
                </div>
            `;
            listaUsuarios.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
        listaUsuarios.innerHTML = '<li class="text-red-400 text-center py-4">Error al recuperar los datos.</li>';
    }
}

// Iniciar la carga
cargarUsuarios();