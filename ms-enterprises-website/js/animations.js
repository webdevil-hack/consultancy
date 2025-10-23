// Advanced Animation Scripts for M.S. Enterprises

// GSAP-like custom animation library
class MSAnimation {
    constructor() {
        this.animations = [];
        this.init();
    }

    init() {
        this.setupScrollTriggers();
        this.setup3DEffects();
        this.setupParallax();
        this.setupMorphingShapes();
    }

    // Scroll-triggered animations
    setupScrollTriggers() {
        const elements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.animate;
                    this.triggerAnimation(entry.target, animationType);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    }

    triggerAnimation(element, type) {
        switch(type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'fadeInLeft':
                this.fadeInLeft(element);
                break;
            case 'fadeInRight':
                this.fadeInRight(element);
                break;
            case 'zoomIn':
                this.zoomIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
        }
    }

    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 100);
    }

    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.5)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0) scale(1)';
        }, 100);
    }

    // 3D Effects
    setup3DEffects() {
        // 3D Tilt Effect on Cards
        const cards = document.querySelectorAll('.about-card, .service-category');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // 3D Sphere Animation
        this.create3DSphere();
    }

    create3DSphere() {
        const sphereContainer = document.createElement('div');
        sphereContainer.className = 'sphere-container';
        sphereContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 100px;
            height: 100px;
            pointer-events: none;
            z-index: 999;
        `;

        const sphere = document.createElement('div');
        sphere.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            box-shadow: 0 0 50px rgba(102, 126, 234, 0.5);
            animation: float 6s ease-in-out infinite;
        `;

        sphereContainer.appendChild(sphere);
        document.body.appendChild(sphereContainer);
    }

    // Parallax Effects
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Morphing Shapes
    setupMorphingShapes() {
        const shapes = document.querySelectorAll('.morph-shape');
        
        shapes.forEach(shape => {
            shape.style.cssText = `
                width: 200px;
                height: 200px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                position: absolute;
                opacity: 0.1;
            `;
        });
    }

    // Text Animation
    animateText(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.cssText = `
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(50px) rotateZ(${Math.random() * 20 - 10}deg);
                    transition: all 0.3s ease ${i * 0.05}s;
                `;
                element.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) rotateZ(0)';
                }, 100);
            });
        });
    }

    // Ripple Effect
    addRippleEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Glitch Effect
    addGlitchEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch');
                
                setTimeout(() => {
                    element.classList.remove('glitch');
                }, 300);
            });
        });
    }

    // Magnetic Effect
    addMagneticEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const magneticStrength = 0.3;
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Particle System
    createParticleSystem(container, options = {}) {
        const defaults = {
            particleCount: 50,
            colors: ['#667eea', '#764ba2', '#3b82f6'],
            maxSize: 5,
            minSize: 2,
            speed: 1
        };
        
        const settings = { ...defaults, ...options };
        
        for (let i = 0; i < settings.particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * (settings.maxSize - settings.minSize) + settings.minSize;
            const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.5};
                animation: float-particle ${10 / settings.speed}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            container.appendChild(particle);
        }
    }

    // Loading Screen
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <span class="logo-text">M.S.</span>
                    <span class="logo-subtitle">ENTERPRISES</span>
                </div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="loader-text">Loading amazing experience...</div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loader);
        
        // Simulate loading
        let progress = 0;
        const progressBar = loader.querySelector('.progress-bar');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            if (progress === 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }, 500);
            }
        }, 200);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const msAnimation = new MSAnimation();
    
    // Add specific animations
    msAnimation.animateText('.animate-text');
    msAnimation.addRippleEffect('.btn');
    msAnimation.addMagneticEffect('.magnetic');
    msAnimation.addGlitchEffect('.logo-text');
    
    // Create particle systems in specific containers
    const particleContainers = document.querySelectorAll('.particles');
    particleContainers.forEach(container => {
        msAnimation.createParticleSystem(container);
    });
    
    // Add loading screen
    // msAnimation.createLoadingScreen(); // Uncomment to enable loading screen
});

// Custom cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }

    init() {
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'cursor-follower';
        
        this.cursor.style.cssText = `
            width: 10px;
            height: 10px;
            background: var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        
        this.cursorFollower.style.cssText = `
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 5 + 'px';
            this.cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX - 15 + 'px';
                this.cursorFollower.style.top = e.clientY - 15 + 'px';
            }, 100);
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize custom cursor (optional - can be enabled based on preference)
// new CustomCursor();