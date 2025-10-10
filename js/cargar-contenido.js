// Cargar contenido dinámico desde config.json
async function cargarContenidoDinamico() {
    try {
        console.log('🔍 Intentando cargar config.json...');
        const response = await fetch('./data/config.json');
        
        if (!response.ok) {
            throw new Error('No se pudo cargar config.json');
        }
        
        const config = await response.json();
        console.log('✅ Datos cargados:', config);
        
        // Actualizar elementos de la página
        if (document.getElementById('titulo-header-dinamico')) {
            document.getElementById('titulo-header-dinamico').textContent = config.titulo_header;
        }
        
        if (document.getElementById('titulo-hero-dinamico')) {
            document.getElementById('titulo-hero-dinamico').textContent = config.titulo_hero;
        }
        
        if (document.getElementById('telefono-dinamico')) {
            document.getElementById('telefono-dinamico').textContent = config.telefono;
        }
        
        if (document.getElementById('telefono-footer-dinamico')) {
            document.getElementById('telefono-footer-dinamico').textContent = config.telefono;
        }
        
        console.log('🎉 Contenido dinámico cargado correctamente');
        
    } catch (error) {
        console.log('❌ Error cargando contenido:', error);
    }
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', cargarContenidoDinamico); 
