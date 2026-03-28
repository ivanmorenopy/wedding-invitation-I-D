document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // EFECTO DEL SOBRE
    // ============================================
    const sobreContainer = document.querySelector('.sobre-container');
    const portada = document.getElementById('portada');
    const nombres = document.getElementById('nombres');
    
    sobreContainer.addEventListener('click', () => {
        sobreContainer.style.transform = 'scale(1.1)';
        sobreContainer.style.transition = 'transform 0.4s ease';
        
        setTimeout(() => {
            portada.style.opacity = '0';
            portada.style.transform = 'scale(1.2)';
            portada.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                portada.style.display = 'none';
                nombres.classList.add('visible');
                
                setTimeout(() => {
                    iniciarAnimacionesScroll();
                }, 100);
            }, 600);
        }, 300);
    });
    
    // ============================================
    // ANIMACIONES DE SCROLL CON INTERSECTION OBSERVER
    // ============================================
    function iniciarAnimacionesScroll() {
        const secciones = document.querySelectorAll('.section:not(#portada):not(#nombres)');
        
        const observerOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animar elementos hijos con delay
                    const hijosAnimables = entry.target.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale');
                    hijosAnimables.forEach((hijo, index) => {
                        setTimeout(() => {
                            hijo.classList.add('visible');
                        }, 100 + (index * 150));
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        secciones.forEach(seccion => observer.observe(seccion));
        
        // Re-observar cuando cambia de sección
        const scrollHandler = () => {
            secciones.forEach(seccion => {
                const rect = seccion.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                    seccion.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler();
    }
    

    
    // ============================================
    // CUENTA REGRESIVA MEJORADA
    // ============================================
    let ultimoValor = { dias: -1, horas: -1, minutos: -1, segundos: -1 };
    
    function actualizarCountdown() {
        const fechaBoda = new Date('2026-11-22T00:00:00');
        const ahora = new Date();
        const diferencia = fechaBoda - ahora;
        
        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
            
            actualizarNumero('dias', dias, ultimoValor.dias);
            actualizarNumero('horas', horas, ultimoValor.horas);
            actualizarNumero('minutos', minutos, ultimoValor.minutos);
            actualizarNumero('segundos', segundos, ultimoValor.segundos);
            
            ultimoValor = { dias, horas, minutos, segundos };
        }
    }
    
    function actualizarNumero(id, nuevoValor, valorAnterior) {
        const elemento = document.getElementById(id);
        const valorFormateado = nuevoValor.toString().padStart(2, '0');
        
        if (nuevoValor !== valorAnterior) {
            elemento.classList.add('flip');
            elemento.textContent = valorFormateado;
            
            setTimeout(() => {
                elemento.classList.remove('flip');
            }, 300);
        }
    }
    
    actualizarCountdown();
    setInterval(actualizarCountdown, 1000);
    
    // ============================================
    // EFECTO PARALLAX SUAVE
    // ============================================
    let ticking = false;
    
    function parallax() {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            const rate = index % 2 === 0 ? 0.05 : -0.05;
            const yPos = -(scrolled * rate);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(parallax);
            ticking = true;
        }
    }, { passive: true });
    
    // ============================================
    // EFECTOS HOVER MEJORADOS
    // ============================================
    document.querySelectorAll('.timeline-content').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    document.querySelectorAll('.countdown-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ============================================
    // PREVENIR FLASH DE CONTENIDO
    // ============================================
    document.body.style.opacity = '1';
});
