document.addEventListener('DOMContentLoaded', () => {
    const sobreContainer = document.querySelector('.sobre-container');
    const portada = document.getElementById('portada');
    const nombres = document.getElementById('nombres');
    
    sobreContainer.addEventListener('click', () => {
        portada.style.opacity = '0';
        portada.style.transform = 'scale(0.9)';
        portada.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            portada.style.display = 'none';
            nombres.classList.remove('hidden');
            nombres.classList.add('visible');
            
            setTimeout(() => {
                iniciarAnimacionesScroll();
            }, 100);
        }, 800);
    });
    
    function iniciarAnimacionesScroll() {
        const secciones = document.querySelectorAll('.section:not(#portada):not(#nombres)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        secciones.forEach(seccion => observer.observe(seccion));
    }
    
    // Cuenta regresiva
    function actualizarCountdown() {
        const fechaBoda = new Date('2026-11-22T00:00:00');
        const ahora = new Date();
        const diferencia = fechaBoda - ahora;
        
        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
            
            document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
            document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
            document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
            document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
        }
    }
    
    actualizarCountdown();
    setInterval(actualizarCountdown, 1000);
});
