const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnIniciar = document.getElementById('btn-iniciar');
const btnCapturar = document.getElementById('btn-capturar');

// Iniciar la cámara
btnIniciar.addEventListener('click', async () => {
    try {
        // Solicitamos acceso solo a video
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Asignamos el flujo de datos al elemento <video>
        video.srcObject = stream;

        // Habilitamos el botón de captura
        btnCapturar.disabled = false;
        btnIniciar.classList.add('hidden'); // Ocultamos el botón de iniciar

    } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        alert('No se pudo acceder a la cámara. Verifica los permisos.');
    }
});

// Capturar la imagen en el Canvas
btnCapturar.addEventListener('click', () => {
    const contexto = canvas.getContext('2d');

    // Igualamos el tamaño del canvas a la resolución real del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujamos el frame exacto del video en el canvas
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
});