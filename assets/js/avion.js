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
        console.log('✍️ Segundo 10 - Iniciando escritura título');
        
        titulo.classList.add('titulo-escribiendo');
        
        // Quitar efecto cursor después de escribir
        setTimeout(() => {
            titulo.style.borderRight = 'none';
        }, 3000);
        
    }, 10000); // 10 segundos
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
            console.log('⏸️ Segundo 5 - Termina vuelo ida');
            avion.classList.remove('avion-volando-ida');
            
            setTimeout(() => {
                console.log('🛬 Segundo 6 - Inicia vuelo vuelta');
                avion.style.backgroundImage = "url('criatura/fotoavion2.png')";
                avion.classList.add('avion-volando-vuelta');
                
                setTimeout(() => {
                    console.log('🅿️ Segundo 11 - Termina vuelo vuelta');
                    avion.classList.remove('avion-volando-vuelta');
                    avion.style.backgroundImage = "url('criatura/fotoavion3.png')";
                    avion.classList.add('avion-estacionado');
                    console.log('✅ Imagen 3 aplicada');
                    
                }, 5000);
                
            }, 1000);
            
        }, 4000);
        
    }, 1000);

    // Backup - Forzar imagen 3 en segundo 11
    setTimeout(() => {
        console.log('⚡ SEGUNDO 11 - FORZANDO IMAGEN 3');
        avion.style.backgroundImage = "url('criatura/fotoavion3.png')";
        avion.classList.add('avion-estacionado');
        avion.style.opacity = '1';
        avion.style.top = '20px';
        avion.style.left = '320px';
        avion.style.transform = 'scale(0.8) rotate(-15deg)';
    }, 11000);
}

// Iniciar cuando cargue la página
window.addEventListener('load', function() {
    iniciarAnimacionAvion();
});
