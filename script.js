document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // VARIABLES GLOBALES
    // ============================================
    let musicaReproduciendo = false;
    const audio = document.getElementById('audioMusica');
    const btnMusica = document.getElementById('btnMusica');
    const btnScrollTop = document.getElementById('btnScrollTop');
    const navFlotante = document.getElementById('navFlotante');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // ============================================
    // EFECTO DEL SOBRE CON CONFETTI
    // ============================================
    const sobreContainer = document.querySelector('.sobre-container');
    const portada = document.getElementById('portada');
    const nombres = document.getElementById('nombres');
    
    sobreContainer.addEventListener('click', () => {
        sobreContainer.style.transform = 'scale(1.15) rotate(5deg)';
        sobreContainer.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            portada.style.opacity = '0';
            portada.style.transform = 'scale(1.3) rotate(-10deg)';
            portada.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            crearConfetti();
            
        setTimeout(() => {
            portada.style.display = 'none';
            nombres.classList.add('visible');
            navFlotante.classList.add('visible');
            btnMusica.classList.add('visible');
            btnScrollTop.classList.add('visible');
            
            audio.play().then(() => {
                musicaReproduciendo = true;
                btnMusica.classList.add('playing');
                document.querySelector('.icon-musica').style.display = 'none';
                document.querySelector('.icon-pausa').style.display = 'block';
            }).catch(() => {
                console.log('Audio no disponible o bloqueado');
            });
            
            setTimeout(() => {
                iniciarAnimacionesScroll();
            }, 100);
        }, 500);
        }, 300);
    });
    
    // ============================================
    // CONFETTI CELEBRATION
    // ============================================
    function crearConfetti() {
        const colores = ['#c9a86c', '#e8c4b0', '#f4e1d2', '#a68b4b', '#faf8f5'];
        const cantidad = 80;
        
        for (let i = 0; i < cantidad; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colores[Math.floor(Math.random() * colores.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                opacity: ${Math.random() * 0.7 + 0.3};
                transform: rotate(${Math.random() * 360}deg);
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 1000;
            `;
            
            confettiContainer.appendChild(confetti);
            
            const animacion = confetti.animate([
                { 
                    transform: `translateY(0) rotate(0deg)`,
                    opacity: 1
                },
                { 
                    transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 2000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                delay: Math.random() * 500
            });
            
            animacion.onfinish = () => confetti.remove();
        }
    }
    
    // ============================================
    // MÚSICA DE FONDO
    // ============================================
    btnMusica.addEventListener('click', toggleMusica);
    
    function toggleMusica() {
        if (musicaReproduciendo) {
            audio.pause();
            btnMusica.classList.remove('playing');
            document.querySelector('.icon-musica').style.display = 'block';
            document.querySelector('.icon-pausa').style.display = 'none';
        } else {
            audio.play().catch(() => {
                console.log('Audio no disponible o bloqueado');
            });
            btnMusica.classList.add('playing');
            document.querySelector('.icon-musica').style.display = 'none';
            document.querySelector('.icon-pausa').style.display = 'block';
        }
        musicaReproduciendo = !musicaReproduciendo;
    }
    
    audio.addEventListener('ended', () => {
        musicaReproduciendo = false;
        btnMusica.classList.remove('playing');
        document.querySelector('.icon-musica').style.display = 'block';
        document.querySelector('.icon-pausa').style.display = 'none';
    });
    
    // ============================================
    // BOTÓN VOLVER ARRIBA
    // ============================================
    btnScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btnScrollTop.classList.add('visible');
        } else {
            btnScrollTop.classList.remove('visible');
        }
    });
    
    // ============================================
    // NAVEGACIÓN FLOTANTE
    // ============================================
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const seccionId = btn.dataset.section;
            const seccion = document.getElementById(seccionId);
            if (seccion) {
                seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    function actualizarNavegacionActiva() {
        const secciones = ['nombres', 'fecha', 'historia', 'ceremonia', 'recepcion', 'regalos', 'rsvp', 'footer'];
        const scrollPos = window.scrollY + window.innerHeight / 2;
        
        secciones.forEach(id => {
            const seccion = document.getElementById(id);
            if (seccion) {
                const top = seccion.offsetTop;
                const bottom = top + seccion.offsetHeight;
                
                if (scrollPos >= top && scrollPos < bottom) {
                    navBtns.forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.section === id);
                    });
                }
            }
        });
    }
    
    window.addEventListener('scroll', actualizarNavegacionActiva, { passive: true });
    
    // ============================================
    // ANIMACIONES DE SCROLL
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
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        secciones.forEach(seccion => observer.observe(seccion));
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
        } else {
            document.querySelector('.fecha-label').textContent = '¡Es hoy!';
            document.querySelector('.countdown').innerHTML = '<p class="hoy-mensaje">¡Hoy es el gran día!</p>';
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
    // EFECTOS HOVER INTERACTIVOS
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
    
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // PREVENIR FLASH DE CONTENIDO
    // ============================================
    document.body.style.opacity = '1';
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !portada.classList.contains('hidden')) {
            sobreContainer.click();
        }
    });
    
    // ============================================
    // TOUCH SUPPORT PARA MÓVIL
    // ============================================
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartY - touchEndY;
        if (Math.abs(diff) > 100) {
            if (diff > 0) {
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            } else {
                window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
            }
        }
    }
});
