// Cargar contenido dinámico desde config.json
async function cargarContenidoDinamico() {
    try {
        console.log('🔍 Cargando configuración...');
        const response = await fetch('./data/config.json');
        
        if (!response.ok) throw new Error('Error cargando config.json');
        
        const config = await response.json();
        console.log('✅ Configuración cargada:', config);
        
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
        
        if (document.getElementById('email-dinamico')) {
            document.getElementById('email-dinamico').textContent = config.email;
        }
        
        console.log('🎉 Contenido dinámico actualizado');
        
    } catch (error) {
        console.log('❌ Error:', error);
    }
}

// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', cargarContenidoDinamico);

