// Cargador de contenido mejorado
async function cargarContenidoDinamico() {
    try {
        console.log('🔍 Intentando cargar configuración...');
        
        // Intentar cargar desde el backend de Render
        const response = await fetch('https://disweb-trastienda.onrender.com/api/config');
        
        if (response.ok) {
            const config = await response.json();
            console.log('✅ Configuración cargada desde backend');
            
            // Actualizar solo los elementos que existen
            const elementos = {
                'titulo-header-dinamico': config.titulo_header,
                'titulo-hero-dinamico': config.titulo_hero,
                'telefono-dinamico': config.telefono,
                'email-dinamico': config.email,
                'telefono-footer-dinamico': config.telefono,
                'email-footer-dinamico': config.email
            };
            
            for (const [id, valor] of Object.entries(elementos)) {
                const elemento = document.getElementById(id);
                if (elemento && valor) {
                    elemento.textContent = valor;
                }
            }
        } else {
            console.log('⚠️ Backend no disponible, usando valores por defecto');
        }
        
    } catch (error) {
        console.log('❌ Error cargando configuración:', error);
        // No hacer nada, dejar los valores por defecto del HTML
    }
}

// Esperar a que la página cargue completamente
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarContenidoDinamico);
} else {
    cargarContenidoDinamico();
}