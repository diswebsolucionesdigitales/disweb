/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Jun 14 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

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
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

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
    });
  }

  /**
   * Scroll top button
   */
  /*
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
*/
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
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

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

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
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // ======= ANIMACIÓN PERSONAJE ALEATORIO =======
  class PersonajeAnimado {
    constructor() {
        this.personajes = ['👨‍💻', '👩‍💻', '🤖', '🐱', '🦊', '👾', '😊', '😎'];
        this.intervalo = null;
        this.activado = false;
    }

    iniciar() {
        console.log('🎭 PersonajeAnimado INICIADO - Esperando 3 segundos...');
        setTimeout(() => {
            this.activado = true;
            this.programarSiguiente();
        }, 3000);
    }

    programarSiguiente() {
        if (!this.activado) return;

        const tiempo = Math.random() * 20000 + 20000;
        console.log('🎭 Programando próximo personaje en:', Math.round(tiempo/1000), 'segundos');
        
        this.intervalo = setTimeout(() => {
            this.mostrarPersonaje();
            this.programarSiguiente();
        }, tiempo);
    }

    mostrarPersonaje() {
        const personaje = document.createElement('div');
        personaje.className = 'personaje-aleatorio';
        
        const emoji = this.personajes[Math.floor(Math.random() * this.personajes.length)];
        personaje.innerHTML = `<span>${emoji}</span>`;
        
        const lado = Math.random() > 0.5 ? 'izquierda' : 'derecha';
        personaje.classList.add(`personaje-${lado}`);
        
        document.body.appendChild(personaje);
        
        setTimeout(() => {
            personaje.classList.add('personaje-visible');
            
            setTimeout(() => {
                personaje.classList.add('personaje-saludando');
                
                setTimeout(() => {
                    personaje.classList.remove('personaje-visible');
                    
                    setTimeout(() => {
                        if (personaje.parentNode) {
                            personaje.parentNode.removeChild(personaje);
                        }
                    }, 1000);
                }, 2000);
            }, 500);
        }, 100);

        console.log('🎭 Personaje mostrado:', emoji, 'en', lado);
    }

    detener() {
        this.activado = false;
        if (this.intervalo) clearTimeout(this.intervalo);
    }
  }

  // Inicializar personaje animado
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const personajeAnimado = new PersonajeAnimado();
        personajeAnimado.iniciar();
        console.log('✅ PersonajeAnimado inicializado correctamente');
    }, 1000);
  });

  // WhatsApp floating button functionality
  document.addEventListener('DOMContentLoaded', function() {
      const whatsappBtn = document.getElementById('whatsappBtn');
      
      // Mostrar botón con animación después de cargar la página
      setTimeout(() => {
          whatsappBtn.classList.add('visible');
      }, 1000);
      
      // Opcional: Ocultar/mostrar botón al hacer scroll
      let lastScrollTop = 0;
      window.addEventListener('scroll', function() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          if (scrollTop > lastScrollTop) {
              // Scrolling down - ocultar botón
              whatsappBtn.style.transform = 'translateY(100px)';
          } else {
              // Scrolling up - mostrar botón
              whatsappBtn.style.transform = 'translateY(0)';
          }
          lastScrollTop = scrollTop;
      }, false);
      
      // Tracking de clics (opcional)
      whatsappBtn.addEventListener('click', function() {
          // Aquí puedes agregar Google Analytics o otro tracking
          console.log('Botón de WhatsApp clickeado');
      });
  });

})();
