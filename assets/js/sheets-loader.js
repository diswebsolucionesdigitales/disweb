// assets/js/sheets-loader.js

class SheetsLoader {
    constructor() {
        this.sheetsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=0&output=csv";
    }

    async loadSheet(sheetName) {
        const url = `${this.sheetsUrl}&sheet=${sheetName}`;
        try {
            const response = await fetch(url);
            const csvText = await response.text();
            return this.csvToJSON(csvText);
        } catch (error) {
            console.error('Error cargando Google Sheets:', error);
            return [];
        }
    }

    csvToJSON(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            return obj;
        }).filter(item => item[headers[0]]);
    }

    // Cargar servicios
    async loadServices() {
        const services = await this.loadSheet('Servicios');
        const container = document.getElementById('services-container');
        
        if (!container || services.length === 0) {
            console.log('No se pudieron cargar los servicios desde Sheets');
            return;
        }

        container.innerHTML = services
            .filter(service => service.Activo === 'Sí')
            .map((service, index) => `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi ${service.Icono}"></i>
                        </div>
                        <h3>${service.Nombre}</h3>
                        <p>${service.Descripción}</p>
                    </div>
                </div>
            `).join('');
    }

    // Cargar testimonios
    async loadTestimonials() {
        console.log('=== CARGANDO TESTIMONIOS ===');
        const testimonialsData = await this.loadSheet('Testimonios');
        console.log('Datos de testimonios:', testimonialsData);
        
        const container = document.querySelector('.swiper-wrapper');
        console.log('Contenedor:', container);
        
        if (!container || testimonialsData.length === 0) {
            console.log('No se encontraron testimonios');
            return;
        }

        container.innerHTML = testimonialsData
            .filter(testimonial => testimonial.Activo === 'Sí')
            .map(testimonial => `
                <div class="swiper-slide">
                    <div class="testimonial-item">
                        <img src="assets/img/testimonials/${testimonial.Imagen}" class="testimonial-img" alt="${testimonial.Nombre}">
                        <h3>${testimonial.Nombre}</h3>
                        <h4>${testimonial.Cargo}</h4>
                        <div class="stars">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                            <i class="bi bi-quote quote-icon-left"></i>
                            ${testimonial.Texto}
                            <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                    </div>
                </div>
            `).join('');

        // Reiniciar Swiper si existe
        if (typeof Swiper !== 'undefined') {
            new Swiper('.init-swiper', {
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
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const loader = new SheetsLoader();
    loader.loadServices();
    loader.loadTestimonials();
});
