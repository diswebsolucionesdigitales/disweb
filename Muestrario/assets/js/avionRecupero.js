// ===== ANIMACIÓN AVIÓN =====
function iniciarAnimacionAvion() {
    const avion = document.getElementById('avion');
    
    if (!avion) {
        console.log('❌ No se encontró el elemento #avion');
        return;
    }
    
    console.log('⏰ Iniciando animación avión');
    
    // Verificar si las imágenes existen (para debug)
    console.log('📁 Ruta de imágenes:', window.location.href);
    
    // PRIMERO: Resetear el avión a estado inicial
    avion.style.backgroundImage = "url('criatura/fotoavion1.png')";
    avion.classList.remove('avion-volando-ida', 'avion-volando-vuelta', 'avion-estacionado');
    
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
                    console.log('✅ Imagen 3 aplicada (secuencia normal)');
                    
                }, 5000); // 5 segundos
                
            }, 1000); // 1 segundo
            
        }, 4000); // 4 segundos
        
    }, 1000); // 1 segundo inicial

    // ELIMINÉ el backup duplicado - causaba conflicto
}

// Iniciar cuando cargue la página
window.addEventListener('load', function() {
    console.log('🚀 Página cargada, iniciando animación...');
    iniciarAnimacionAvion();
});