/**
 * MEGAHIDRAULIC GROUP SAS - Interactive Logic & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 2. Sticky & Scrolled Navbar
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // 3. Mobile Menu Toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu on nav item click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Active Nav Item on Scroll
    const highlightCurrentSection = () => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightCurrentSection);

    // 5. Animated Number Counters
    const statElements = document.querySelectorAll('.stat-number[data-target], .stat-badge-number[data-target]');
    let countersAnimated = false;

    const animateCounters = () => {
        statElements.forEach(counter => {
            const targetAttr = counter.getAttribute('data-target');
            if (!targetAttr) return;

            const target = parseInt(targetAttr, 10);
            if (isNaN(target)) return;

            const originalText = counter.textContent.trim();
            const hasPlus = originalText.includes('+') || targetAttr.includes('+');
            const hasPercent = originalText.includes('%') || targetAttr.includes('%');

            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 40));
            const duration = 1200;
            const intervalTime = duration / (target / increment);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let formatted = current.toString();
                if (hasPercent) formatted += '%';
                if (hasPlus) formatted += '+';
                counter.textContent = formatted;
            }, intervalTime);
        });
    };

    // Intersection Observer for trigger counting animation
    if ('IntersectionObserver' in window && statElements.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const heroStats = document.querySelector('.hero-stats-card');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    }

    console.log('MEGAHIDRAULIC GROUP SAS - Sitio web cargado exitosamente.');
});
