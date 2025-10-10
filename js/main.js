// ==================== SEGURIDAD ====================
const CLAVE_ADMIN = "DisWeb2024!"; // CAMBIÁ ESTA CONTRASEÑA

function protegerPanel() {
    const claveIngresada = prompt("🔐 Clave de administrador:");
    if (claveIngresada !== CLAVE_ADMIN) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 100px; font-family: Arial;">
                <h1 style="color: #dc3545;">⛔ Acceso no autorizado</h1>
                <p>No tenés permisos para acceder al panel de control.</p>
                <a href="index.html" style="color: #007bff;">Volver al sitio principal</a>
            </div>
        `;
        return false;
    }
    return true;
}

// Verificar contraseña inmediatamente
if (!protegerPanel()) {
    throw new Error("Acceso denegado");
}
// ==================== FIN SEGURIDAD ====================

// Cargar datos actuales en el panel
async function cargarDatosActuales() {
    try {
        console.log('🔍 Cargando configuración...');
        const response = await fetch('./data/config.json');
        
        if (!response.ok) throw new Error('Error cargando config.json');
        
        const config = await response.json();
        console.log('✅ Configuración cargada:', config);
        
        // Llenar formulario
        document.getElementById('titulo_header').value = config.titulo_header || 'Soluciones Digitales';
        document.getElementById('titulo_hero').value = config.titulo_hero || 'DisWeb Soluciones Digitales';
        document.getElementById('telefono').value = config.telefono || '+54 9 11 5340-2972';
        document.getElementById('email').value = config.email || 'disweb.solucionesdigitales@gmail.com';
        
    } catch (error) {
        console.log('⚠️ Usando valores por defecto');
        document.getElementById('titulo_header').value = 'Soluciones Digitales';
        document.getElementById('titulo_hero').value = 'DisWeb Soluciones Digitales';
        document.getElementById('telefono').value = '+54 9 11 5340-2972';
        document.getElementById('email').value = 'disweb.solucionesdigitales@gmail.com';
    }
}

// Guardar cambios
document.getElementById('editor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nuevosDatos = {
        titulo_header: document.getElementById('titulo_header').value,
        titulo_hero: document.getElementById('titulo_hero').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value
    };
    
    console.log('💾 Guardando:', nuevosDatos);
    
    // En GitHub Pages no podemos guardar realmente en JSON
    // Pero mostramos qué se guardaría
    localStorage.setItem('configDisWeb', JSON.stringify(nuevosDatos));
    
    alert(`✅ Cambios preparados para guardar:\n\n• Título Header: ${nuevosDatos.titulo_header}\n• Título Hero: ${nuevosDatos.titulo_hero}\n• Teléfono: ${nuevosDatos.telefono}\n• Email: ${nuevosDatos.email}\n\n⚠️ En GitHub Pages necesitamos editar manualmente data/config.json`);
    
    // Feedback visual
    const boton = document.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;
    boton.textContent = '✅ Guardado!';
    boton.style.background = '#28a745';
    
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.style.background = '';
    }, 2000);
});

// Inicializar panel cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛠️ Panel de control iniciado');
    cargarDatosActuales();
});
