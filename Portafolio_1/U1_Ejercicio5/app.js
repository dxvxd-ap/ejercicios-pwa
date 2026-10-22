if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registro => console.log('✅ SW Registrado. Scope:', registro.scope))
            .catch(error => console.error('❌ Error SW:', error));
    });
}