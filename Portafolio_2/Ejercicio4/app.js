const inputNombre = document.getElementById('input-nombre');
const btnGuardar = document.getElementById('btn-guardar');
const listaRegistros = document.getElementById('lista-registros');

let db;

// 1. Apertura y creación de la base de datos IndexedDB
const request = indexedDB.open('MediRegistroLocalDB', 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    // Creación del Object Store llamado 'pacientes' con ID autoincrementable
    const objectStore = db.createObjectStore('pacientes', { keyPath: 'id', autoIncrement: true });
    console.log('📦 Object Store creado');
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log('✅ Base de datos IndexedDB abierta con éxito');
    consultarRegistros(); // Cargar la lista al iniciar
};

request.onerror = (event) => {
    console.error('❌ Error al abrir IndexedDB:', event.target.error);
};

// 2. Función para GUARDAR (Insertar)
btnGuardar.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    if (!nombre) return;

    const transaccion = db.transaction(['pacientes'], 'readwrite');
    const store = transaccion.objectStore('pacientes');

    const peticionAdd = store.add({ nombre: nombre, fecha: new Date().toLocaleString() });

    peticionAdd.onsuccess = () => {
        inputNombre.value = '';
        consultarRegistros(); // Refrescar la lista
    };
});

// 3. Función para CONSULTAR (Listar)
function consultarRegistros() {
    listaRegistros.innerHTML = '';

    const transaccion = db.transaction(['pacientes'], 'readonly');
    const store = transaccion.objectStore('pacientes');
    const peticionGetAll = store.getAll();

    peticionGetAll.onsuccess = () => {
        const registros = peticionGetAll.result;

        if (registros.length === 0) {
            listaRegistros.innerHTML = '<li class="text-gray-500 text-center text-sm italic">No hay registros locales.</li>';
            return;
        }

        registros.forEach(registro => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-600';
            li.innerHTML = `
                <div>
                    <p class="font-semibold text-gray-200">${registro.nombre}</p>
                    <p class="text-xs text-gray-400">${registro.fecha}</p>
                </div>
                <button onclick="eliminarRegistro(${registro.id})" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 bg-red-900/30 rounded-md">
                    Borrar
                </button>
            `;
            listaRegistros.appendChild(li);
        });
    };
}

// 4. Función para ELIMINAR
window.eliminarRegistro = (id) => {
    const transaccion = db.transaction(['pacientes'], 'readwrite');
    const store = transaccion.objectStore('pacientes');
    const peticionDelete = store.delete(id);

    peticionDelete.onsuccess = () => {
        consultarRegistros(); // Refrescar la lista tras borrar
    };
};