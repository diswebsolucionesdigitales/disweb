// Cargar datos actuales en el panel
async function cargarDatosActuales() {
    try {
        console.log('🔍 Panel: Intentando cargar config.json...');
        const response = await fetch('./data/config.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const config = await response.json();
        console.log('✅ Panel: Datos cargados:', config);
        
        // Llenar formulario con datos actuales
        document.getElementById('titulo_header').value = config.titulo_header || 'Soluciones Digitales';
        document.getElementById('titulo_hero').value = config.titulo_hero || 'DisWeb Soluciones Digitales';
        document.getElementById('telefono').value = config.telefono || '+54 9 11 5340-2972';
        
    } catch (error) {
        console.log('❌ Panel: Error cargando datos:', error);
        // Usamos valores por defecto
        document.getElementById('titulo_header').value = 'Soluciones Digitales';
        document.getElementById('titulo_hero').value = 'DisWeb Soluciones Digitales';
        document.getElementById('telefono').value = '+54 9 11 5340-2972';
        
        // Mensaje solo en consola, no alert
        console.log('⚠️ Usando valores por defecto');
    }
}

// Guardar cambios
document.getElementById('editor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const nuevosDatos = {
        titulo_header: document.getElementById('titulo_header').value,
        titulo_hero: document.getElementById('titulo_hero').value,
        telefono: document.getElementById('telefono').value
    };
    
    console.log('💾 Guardando datos:', nuevosDatos);
    
    // Mostrar confirmación visual
    const mensaje = `✅ Cambios guardados localmente:\n\n• Título Header: ${nuevosDatos.titulo_header}\n• Título Hero: ${nuevosDatos.titulo_hero}\n• Teléfono: ${nuevosDatos.telefono}\n\nPara ver los cambios en la página principal:\n1. Recargá index.html\n2. O hacé clic en "Abrir Página Principal"`;
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('configDisWeb', JSON.stringify(nuevosDatos));
    localStorage.setItem('ultimaModificacion', new Date().toLocaleString());
    
    // Mostrar mensaje de éxito
    alert(mensaje);
    
    // Actualizar el botón para feedback visual
    const boton = document.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;
    boton.textContent = '✅ Guardado!';
    boton.style.background = '#28a745';
    
    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.style.background = '';
    }, 2000);
});

// Agregar botón para abrir página principal
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón adicional
    const botonAbrirPrincipal = document.createElement('button');
    botonAbrirPrincipal.textContent = '🌐 Abrir Página Principal';
    botonAbrirPrincipal.type = 'button';
    botonAbrirPrincipal.style.background = '#6c757d';
    botonAbrirPrincipal.style.marginTop = '10px';
    botonAbrirPrincipal.onclick = function() {
        window.open('index.html', '_blank');
    };
    
    // Agregar después del formulario
    document.getElementById('editor-form').appendChild(botonAbrirPrincipal);
    
    // Cargar datos
    cargarDatosActuales();
    
    // Mostrar última modificación si existe
    const ultimaMod = localStorage.getItem('ultimaModificacion');
    if (ultimaMod) {
        console.log('📅 Última modificación:', ultimaMod);
    }
});

// Función para cargar datos desde localStorage (para pruebas)
function cargarDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('configDisWeb');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        console.log('📂 Datos en localStorage:', datos);
        return datos;
    }
    return null;
}

// También cargar desde localStorage al iniciar
window.addEventListener('load', function() {
    const datosLocal = cargarDesdeLocalStorage();
    if (datosLocal) {
        console.log('🔄 Cargando datos desde localStorage...');
    }
});