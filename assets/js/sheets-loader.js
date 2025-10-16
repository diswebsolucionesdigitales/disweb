// assets/js/sheets-loader.js

class SheetsLoader {
    constructor() {
        // URLs específicas para cada hoja
        this.sheetsUrls = {
            servicios: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=0&single=true&output=csv",
            testimonios: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=1947413653&single=true&output=csv"
        };
    }

    async loadSheet(sheetType) {
        const url = this.sheetsUrls[sheetType];
        if (!url) {
            console.error('Tipo de hoja no válido:', sheetType);
            return [];
        }

        try {
            console.log(`Cargando hoja: ${sheetType} desde:`, url);
            const response = await fetch(url);
            const csvText = await response.text();
            console.log(`CSV crudo para ${sheetType}:`, csvText);
            return this.csvToJSON(csvText);
        } catch (error) {
            console.error(`Error cargando ${sheetType}:`, error);
            return [];
        }
    }

    csvToJSON(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length === 0) return [];
        
        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1).map(line => {
            // Manejo mejorado de comas dentro de campos
            const values = [];
            let current = '';
            let inQuotes = false;
            
            for (let char of line) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current.trim());
            
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
                // Limpiar comillas si existen
                if (obj[header].startsWith('"') && obj[header].endsWith('"')) {
                    obj[header] = obj[header].slice(1, -1);
                }
            });
            return obj;
        }).filter(item => item[headers[0]] && item[headers[0]] !== '');
    }

    // Cargar servicios
    async loadServices() {
        console.log('=== CARGANDO SERVICIOS ===');
        const services = await this.loadSheet('servicios');
        console.log('Datos de servicios:', services);
        
        const container = document.getElementById('services-container');
        console.log('Contenedor de servicios:', container);
        
        if (!container || services.length === 0) {
            console.log('No se pudieron cargar los servicios desde Sheets');
            // Mostrar servicios de respaldo
            this.showFallbackServices(container);
            return;
        }

        container.innerHTML = services
            .filter(service => service.Activo && service.Activo.toLowerCase() === 'sí')
            .map((service, index) => `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi ${service.Icono || 'bi-activity'}"></i>
                        </div>
                        <h3>${service.Nombre || 'Servicio'}</h3>
                        <p>${service.Descripción || 'Descripción del servicio'}</p>
                    </div>
                </div>
            `).join('');
    }

    // Cargar testimonios
    async loadTestimonials() {
        console.log('=== CARGANDO TESTIMONIOS ===');
        const testimonialsData = await this.loadSheet('testimonios');
        console.log('Datos de testimonios:', testimonialsData);
        
        const container = document.querySelector('.testimonials .swiper-wrapper');
        console.log('Contenedor de testimonios:', container);
        
        if (!container || testimonialsData.length === 0) {
            console.log('No se encontraron testimonios');
            // Mostrar testimonios de respaldo
            this.showFallbackTestimonials(container);
            return;
        }

        container.innerHTML = testimonialsData
            .filter(testimonial => testimonial.Activo && testimonial.Activo.toLowerCase() === 'sí')
            .map(testimonial => `
                <div class="swiper-slide">
                    <div class="testimonial-item">
                        ${testimonial.Imagen ? `<img src="assets/img/testimonials/${testimonial.Imagen}" class="testimonial-img" alt="${testimonial.Nombre || 'Cliente'}">` : ''}
                        <h3>${testimonial.Nombre || 'Cliente'}</h3>
                        <h4>${testimonial.Cargo || 'Cliente satisfecho'}</h4>
                        <div class="stars">
                            ${'<i class="bi bi-star-fill"></i>'.repeat(parseInt(testimonial.Estrellas) || 5)}
                        </div>
                        <p>
                            <i class="bi bi-quote quote-icon-left"></i>
                            ${testimonial.Texto || 'Excelente servicio y profesionalismo.'}
                            <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                    </div>
                </div>
            `).join('');

        // Reiniciar Swiper
        this.initializeSwiper();
    }

    initializeSwiper() {
        if (typeof Swiper !== 'undefined') {
            setTimeout(() => {
                const swiperContainer = document.querySelector('.testimonials-slider');
                if (swiperContainer) {
                    new Swiper('.testimonials-slider', {
                        loop: true,
                        speed: 600,
                        autoplay: { delay: 5000 },
                        slidesPerView: 'auto',
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        }
                    });
                }
            }, 500);
        }
    }

    // Métodos de respaldo en caso de error
    showFallbackServices(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="col-lg-4 col-md-6" data-aos="fade-up">
                <div class="service-item position-relative">
                    <div class="icon">
                        <i class="bi bi-code-slash"></i>
                    </div>
                    <h3>Desarrollo Web</h3>
                    <p>Creación de sitios web modernos y responsive.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div class="service-item position-relative">
                    <div class="icon">
                        <i class="bi bi-phone"></i>
                    </div>
                    <h3>Apps Móviles</h3>
                    <p>Desarrollo de aplicaciones nativas e híbridas.</p>
                </div>
            </div>
        `;
    }

    showFallbackTestimonials(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div class="swiper-slide">
                <div class="testimonial-item">
                    <h3>Cliente Satisfecho</h3>
                    <h4>CEO de Empresa</h4>
                    <div class="stars">
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <p>
                        <i class="bi bi-quote quote-icon-left"></i>
                        Excelente servicio y profesionalismo. Los recomiendo.
                        <i class="bi bi-quote quote-icon-right"></i>
                    </p>
                </div>
            </div>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    const loader = new SheetsLoader();
    
    // Cargar con delays para evitar conflictos
    setTimeout(() => loader.loadServices(), 500);
    setTimeout(() => loader.loadTestimonials(), 1000);
});
