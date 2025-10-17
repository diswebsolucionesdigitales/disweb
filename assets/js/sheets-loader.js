class SheetsLoader {
    constructor() {
        this.sheetsUrls = {
            servicios: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=0&single=true&output=csv",
            testimonios: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=1947413653&single=true&output=csv",
            nosotros: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFNwk8_zmJ56A01HGER3JCFNbO2woS6uc7rg-YqaN7n3gmKNaC3KC6wNhAJM27WSoHlvf_2i1eepAw/pub?gid=557281232&single=true&output=csv"
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
                if (obj[header].startsWith('"') && obj[header].endsWith('"')) {
                    obj[header] = obj[header].slice(1, -1);
                }
            });
            return obj;
        }).filter(item => item[headers[0]] && item[headers[0]] !== '');
    }

    // Método existente para Servicios
    async loadServices() {
        console.log('=== CARGANDO SERVICIOS ===');
        const services = await this.loadSheet('servicios');
        console.log('Datos de servicios:', services);
        
        const container = document.getElementById('services-container');
        console.log('Contenedor de servicios:', container);
        
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

    // Método existente para Testimonios
    async loadTestimonials() {
        console.log('=== CARGANDO TESTIMONIOS ===');
        const testimonialsData = await this.loadSheet('testimonios');
        console.log('Datos de testimonios:', testimonialsData);
        
        const container = document.querySelector('.testimonials .swiper-wrapper');
        console.log('Contenedor de testimonios:', container);
        
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
                            ${'<i class="bi bi-star-fill"></i>'.repeat(parseInt(testimonial.Estrellas) || 5)}
                        </div>
                        <p>
                            <i class="bi bi-quote quote-icon-left"></i>
                            ${testimonial.Texto}
                            <i class="bi bi-quote quote-icon-right"></i>
                        </p>
                    </div>
                </div>
            `).join('');

        this.initializeSwiper();
    }

    // NUEVO MÉTODO para Nosotros
    async loadAbout() {
        console.log('=== CARGANDO NOSOTROS ===');
        const aboutData = await this.loadSheet('nosotros');
        console.log('Datos de Nosotros:', aboutData);
        
        if (!aboutData || aboutData.length === 0) {
            console.log('No se encontraron datos de Nosotros');
            return;
        }

        const activeItems = aboutData
            .filter(item => item.Activo === 'Sí')
            .sort((a, b) => a.Orden - b.Orden);

        this.renderAboutContent(activeItems);
        this.renderSkills(activeItems);
    }

    renderAboutContent(items) {
        const container = document.querySelector('.about-me');
        if (!container) return;

        const paragraphs = items.filter(item => item.Tipo === 'parrafo');
        
        let aboutHTML = '<h4>Nosotros</h4>';
        paragraphs.forEach(paragraph => {
            aboutHTML += `<p style="text-align: justify;">${paragraph.Descripcion}</p>`;
        });

        container.innerHTML = aboutHTML;
    }

    renderSkills(items) {
        const skillsContainer = document.querySelector('.skills-content');
        if (!skillsContainer) return;

        const tools = items.filter(item => item.Tipo === 'herramienta');
        
        let skillsHTML = '<h5>Herramientas</h5>';
        
        tools.forEach(tool => {
            skillsHTML += `
                <div class="progress">
                    <span class="skill"><span>${tool.Nombre}</span> <i class="val">${tool.Valor}%</i></span>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar" role="progressbar" 
                             aria-valuenow="${tool.Valor}" aria-valuemin="0" aria-valuemax="100"
                             style="width: ${tool.Valor}%"></div>
                    </div>
                </div>
            `;
        });

        skillsContainer.innerHTML = skillsHTML;
    }

    initializeSwiper() {
        if (typeof Swiper !== 'undefined') {
            setTimeout(() => {
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
            }, 500);
        }
    }
}

// Inicialización actualizada
document.addEventListener('DOMContentLoaded', function() {
    const loader = new SheetsLoader();
    
    setTimeout(() => loader.loadServices(), 100);
    setTimeout(() => loader.loadTestimonials(), 200);
    setTimeout(() => loader.loadAbout(), 300); // ← Nueva línea para Nosotros
});
