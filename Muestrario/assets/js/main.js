/**
 * Template Name: DevFolio
 * Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
 * Updated: Jun 14 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  console.log('✅ main.js cargado correctamente');

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
      console.log('✅ Preloader removido');
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      try {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        console.log('✅ AOS inicializado');
      } catch (e) {
        console.error('❌ Error en AOS:', e);
      }
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    try {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      typed_strings = typed_strings.split(',');
      if (typeof Typed !== 'undefined') {
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
        console.log('✅ Typed.js inicializado');
      }
    } catch (e) {
      console.error('❌ Error en Typed.js:', e);
    }
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  if (skillsAnimation.length > 0 && typeof Waypoint !== 'undefined') {
    try {
      skillsAnimation.forEach((item) => {
        new Waypoint({
          element: item,
          offset: '80%',
          handler: function(direction) {
            let progress = item.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
              el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
          }
        });
      });
      console.log('✅ Waypoints inicializado');
    } catch (e) {
      console.error('❌ Error en Waypoints:', e);
    }
  }

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    try {
      new PureCounter();
      console.log('✅ PureCounter inicializado');
    } catch (e) {
      console.error('❌ Error en PureCounter:', e);
    }
  }

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    try {
      const glightbox = GLightbox({
        selector: '.glightbox'
      });
      console.log('✅ GLightbox inicializado');
    } catch (e) {
      console.error('❌ Error en GLightbox:', e);
    }
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  
  if (navmenulinks.length > 0) {
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
  }

  console.log('✅ main.js inicializado completamente');

})();

// ===== ANIMACIÓN AVIÓN (SEPARADA) =====
function iniciarAnimacionAvion() {
    const avion = document.getElementById('avion');
    
    if (!avion) {
        console.log('❌ No se encontró el elemento #avion');
        return;
    }
    
    console.log('⏰ Iniciando animación avión');
    
    setTimeout(() => {
        console.log('🛫 Segundo 1 - Inicia vuelo ida');
        avion.style.backgroundImage = "url('../criatura/fotoavion1.png')";
        avion.classList.add('avion-volando-ida');
        
        setTimeout(() => {
            console.log('⏸️ Segundo 5 - Termina vuelo ida');
            avion.classList.remove('avion-volando-ida');
            
            setTimeout(() => {
                console.log('🛬 Segundo 6 - Inicia vuelo vuelta');
                avion.style.backgroundImage = "url('../criatura/fotoavion2.png')";
                avion.classList.add('avion-volando-vuelta');
                
                setTimeout(() => {
                    console.log('🅿️ Segundo 11 - Termina vuelo vuelta');
                    avion.classList.remove('avion-volando-vuelta');
                    avion.style.backgroundImage = "url('../criatura/fotoavion3.png')";
                    avion.classList.add('avion-estacionado');
                    console.log('✅ Imagen 3 aplicada');
                    
                }, 5000);
                
            }, 1000);
            
        }, 4000);
        
    }, 1000);
}

// Iniciar avión cuando cargue la página
window.addEventListener('load', function() {
    console.log('🚀 Página cargada, iniciando animación avión...');
    iniciarAnimacionAvion();
});