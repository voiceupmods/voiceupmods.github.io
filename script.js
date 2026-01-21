/**
 * VoiceUp - Interaction & Animation Logic
 * Focus: Smooth reveal, dynamic counters, and hover effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Counter for Stats
    // This will animate the "3500+" and other numbers when they appear on screen
    const animateCounters = () => {
        const stats = document.querySelectorAll('.number');
        
        stats.forEach(stat => {
            const targetText = stat.innerText;
            if (targetText.includes('+')) {
                const target = parseInt(targetText.replace('+', '').replace(',', ''));
                let count = 0;
                const speed = 2000 / target; // Completion in 2 seconds

                const updateCount = () => {
                    if (count < target) {
                        count += Math.ceil(target / 100);
                        if (count > target) count = target;
                        stat.innerText = count.toLocaleString() + '+';
                        setTimeout(updateCount, 30);
                    }
                };
                updateCount();
            }
        });
    };

    // 2. Intersection Observer for Scroll Animations
    // Makes cards float up smoothly as you scroll down
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // If it's the stats bar, trigger the counter animation
                if (entry.target.classList.contains('stats-bar')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Initial state for animated elements
    const elementsToReveal = document.querySelectorAll('.card, .feature-card');
    elementsToReveal.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        revealOnScroll.observe(el);
    });

    // 3. Magnetic Button Effect
    // Subtle movement when hovering buttons for a premium feel
    const buttons = document.querySelectorAll('.btn-main, .btn-nav');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Remove a animação de pulso ao clicar para dar feedback visual
        downloadBtn.classList.remove('pulse-animation');
        
        // Simula um efeito de escala rápida
        downloadBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            downloadBtn.style.transform = 'scale(1)';
            alert('Starting VoiceUp Download for v1.20+');
            downloadBtn.classList.add('pulse-animation');
        }, 150);
    });
}

const mainDownloadBtn = document.querySelector('.btn-main-download');
if(mainDownloadBtn) {
    mainDownloadBtn.addEventListener('click', () => {
        console.log("Download iniciado...");
        // Aqui você pode adicionar a lógica real de download
    });
}

    // 4. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Image Parallax
    // Subtle movement on the main gameplay image
    const heroImg = document.querySelector('.main-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImg.style.transform = `translateY(${scrolled * 0.05}px)`;
        });
    }
});