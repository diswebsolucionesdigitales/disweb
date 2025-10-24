
// Animación del título
function animarTitulo() {
    const titulo = document.getElementById('titulo-animado');
    
    if (!titulo) {
        console.log('❌ No se encontró el título');
        return;
    }
    
    // Ocultar el texto inicialmente
    titulo.style.opacity = '0';
    titulo.style.width = '0';
    titulo.style.overflow = 'hidden';
    
    // Esperar hasta el segundo 10
    setTimeout(() => {
        console.log('✍️ Segundo 7.5 - Iniciando escritura título');
        
        titulo.classList.add('titulo-escribiendo');
        
        // Quitar efecto cursor después de escribir
        setTimeout(() => {
            titulo.style.borderRight = 'none';
        }, 3000);
        
    }, 7500); // 10 segundos
}

// Iniciar cuando cargue la página
window.addEventListener('load', function() {
    iniciarAnimacionAvion();
    animarTitulo();
});


// ===== ANIMACIÓN AVIÓN =====
function iniciarAnimacionAvion() {
    const avion = document.getElementById('avion');
    
    if (!avion) {
        console.log('❌ No se encontró el elemento #avion');
        return;
    }
    
   
    console.log('⏰ Iniciando animación avión');
    
    setTimeout(() => {
        console.log('🛫 Segundo 1 - Inicia vuelo ida');
        avion.style.backgroundImage = "url('criatura/fotoavion1.png')";
        avion.classList.add('avion-volando-ida');
        
        setTimeout(() => {
            console.log('⏸️ Segundo 3 - Termina vuelo ida');
            avion.classList.remove('avion-volando-ida');
            
            setTimeout(() => {
                console.log('🛬 Segundo 3.5 - Inicia vuelo vuelta');
                avion.style.backgroundImage = "url('criatura/fotoavion2.png')";
                avion.classList.add('avion-volando-vuelta');
                
                setTimeout(() => {
                    console.log('🅿️ Segundo 7 - Termina vuelo vuelta');
                    avion.classList.remove('avion-volando-vuelta');
                    avion.style.backgroundImage = "url('criatura/fotoavion3.png')";
                    avion.classList.add('avion-estacionado');
                    console.log('✅ Imagen 3 aplicada');
                    
                }, 2500);
                
            }, 500);
            
        }, 3000);
        
    }, 1000);


    // ELIMINÉ el backup duplicado - causaba conflicto
}

// Iniciar cuando cargue la página
window.addEventListener('load', function() {
    console.log('🚀 Página cargada, iniciando animación...');
    iniciarAnimacionAvion();
});