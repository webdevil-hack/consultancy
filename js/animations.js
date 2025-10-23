// 3D Animations and Three.js implementations
class ThreeJSAnimations {
    constructor() {
        this.scenes = {};
        this.renderers = {};
        this.cameras = {};
        this.init();
    }

    init() {
        // Initialize hero canvas
        this.initHeroCanvas();
        
        // Initialize page header canvases
        this.initPageHeaderCanvases();
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    initHeroCanvas() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);

        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.ConeGeometry(0.7, 1.5, 32),
            new THREE.TorusGeometry(0.7, 0.3, 16, 100),
            new THREE.OctahedronGeometry(0.8),
            new THREE.TetrahedronGeometry(0.8)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.3,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x06b6d4, 
                transparent: true, 
                opacity: 0.4,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xf59e0b, 
                transparent: true, 
                opacity: 0.3,
                wireframe: true 
            })
        ];

        const meshes = [];
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 20;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Add custom properties for animation
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            scene.add(mesh);
            meshes.push(mesh);
        }

        camera.position.z = 15;

        // Store references
        this.scenes.hero = scene;
        this.cameras.hero = camera;
        this.renderers.hero = renderer;
        this.heroMeshes = meshes;
    }

    initPageHeaderCanvases() {
        const canvases = [
            'about-canvas',
            'services-canvas',
            'contact-canvas'
        ];

        canvases.forEach(canvasId => {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;

            // Scene setup
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.setClearColor(0x000000, 0);

            // Create particle system
            const particleCount = 100;
            const particles = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 50;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

                colors[i * 3] = Math.random();
                colors[i * 3 + 1] = Math.random();
                colors[i * 3 + 2] = Math.random();

                sizes[i] = Math.random() * 3 + 1;
            }

            particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const particleMaterial = new THREE.PointsMaterial({
                size: 2,
                transparent: true,
                opacity: 0.6,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });

            const particleSystem = new THREE.Points(particles, particleMaterial);
            scene.add(particleSystem);

            camera.position.z = 20;

            // Store references
            this.scenes[canvasId] = scene;
            this.cameras[canvasId] = camera;
            this.renderers[canvasId] = renderer;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Animate hero meshes
        if (this.heroMeshes) {
            this.heroMeshes.forEach(mesh => {
                // Rotation animation
                mesh.rotation.x += mesh.userData.rotationSpeed.x;
                mesh.rotation.y += mesh.userData.rotationSpeed.y;
                mesh.rotation.z += mesh.userData.rotationSpeed.z;

                // Floating animation
                mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.01;
            });
        }

        // Animate particle systems
        Object.keys(this.scenes).forEach(sceneKey => {
            if (sceneKey !== 'hero') {
                const scene = this.scenes[sceneKey];
                scene.children.forEach(child => {
                    if (child instanceof THREE.Points) {
                        child.rotation.x += 0.001;
                        child.rotation.y += 0.002;
                        
                        // Update particle positions
                        const positions = child.geometry.attributes.position.array;
                        for (let i = 0; i < positions.length; i += 3) {
                            positions[i + 1] += Math.sin(time + i) * 0.01;
                        }
                        child.geometry.attributes.position.needsUpdate = true;
                    }
                });
            }
        });

        // Render all scenes
        Object.keys(this.renderers).forEach(key => {
            this.renderers[key].render(this.scenes[key], this.cameras[key]);
        });
    }

    handleResize() {
        Object.keys(this.renderers).forEach(key => {
            const canvas = this.renderers[key].domElement;
            const camera = this.cameras[key];
            const renderer = this.renderers[key];

            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
    }
}

// Advanced CSS Animation Controller
class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initMorphingShapes();
        this.initTextAnimations();
        this.initParallaxEffects();
    }

    initScrollAnimations() {
        // Enhanced scroll-triggered animations using GSAP
        gsap.registerPlugin(ScrollTrigger);

        // Staggered card animations
        gsap.utils.toArray('.service-card, .feature-item, .value-item').forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.8,
                    rotationY: 45
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    },
                    delay: index * 0.1
                }
            );
        });

        // Text reveal animations
        gsap.utils.toArray('.section-title').forEach(title => {
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
            
            gsap.fromTo(title.querySelectorAll('.char'),
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%"
                    }
                }
            );
        });

        // Progress bars animation
        gsap.utils.toArray('.progress-bar').forEach(bar => {
            const progress = bar.dataset.progress || 100;
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: `${progress}%`,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 80%"
                    }
                }
            );
        });
    }

    initHoverEffects() {
        // Advanced 3D hover effects
        document.querySelectorAll('.service-card, .team-member, .pricing-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                gsap.to(card, {
                    y: -20,
                    rotationX: 5,
                    rotationY: 5,
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out",
                    transformOrigin: "center center"
                });

                // Add glow effect
                gsap.to(card, {
                    boxShadow: "0 25px 50px rgba(99, 102, 241, 0.3)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', (e) => {
                gsap.to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                gsap.to(card, {
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            // Mouse move tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    duration: 0.2,
                    ease: "power1.out"
                });
            });
        });
    }

    initMorphingShapes() {
        // Create morphing background shapes
        const shapes = document.querySelectorAll('.floating-shape, .element');
        
        shapes.forEach((shape, index) => {
            // Random morphing animation
            gsap.to(shape, {
                borderRadius: () => `${Math.random() * 50 + 10}% ${Math.random() * 50 + 10}% ${Math.random() * 50 + 10}% ${Math.random() * 50 + 10}%`,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: index * 0.5
            });

            // Floating animation
            gsap.to(shape, {
                y: () => Math.random() * 50 - 25,
                x: () => Math.random() * 30 - 15,
                rotation: () => Math.random() * 360,
                duration: 6 + Math.random() * 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.3
            });
        });
    }

    initTextAnimations() {
        // Typewriter effect for hero subtitle
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            
            gsap.to(heroSubtitle, {
                duration: 2,
                text: text,
                ease: "none",
                delay: 1
            });
        }

        // Glitch effect for special text
        document.querySelectorAll('.glitch-text').forEach(text => {
            const originalText = text.textContent;
            
            setInterval(() => {
                if (Math.random() > 0.95) {
                    text.textContent = this.glitchText(originalText);
                    setTimeout(() => {
                        text.textContent = originalText;
                    }, 100);
                }
            }, 100);
        });
    }

    initParallaxEffects() {
        // Parallax scrolling for background elements
        gsap.utils.toArray('.parallax-element').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            
            gsap.to(element, {
                y: () => -window.innerHeight * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Mouse parallax for floating elements
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            gsap.utils.toArray('.mouse-parallax').forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                gsap.to(element, {
                    x: (mouseX - 0.5) * 100 * speed,
                    y: (mouseY - 0.5) * 100 * speed,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    }

    glitchText(text) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        return text.split('').map(char => {
            return Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
        }).join('');
    }
}

// Particle System
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            count: options.count || 50,
            colors: options.colors || ['#6366f1', '#06b6d4', '#f59e0b'],
            speed: options.speed || 1,
            size: options.size || 2,
            ...options
        };
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * this.options.size + 1;
        const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;

        particle.x = Math.random() * this.container.offsetWidth;
        particle.y = Math.random() * this.container.offsetHeight;
        particle.vx = (Math.random() - 0.5) * this.options.speed;
        particle.vy = (Math.random() - 0.5) * this.options.speed;

        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.container.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.container.offsetHeight) {
                particle.vy *= -1;
            }

            particle.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js animations
    new ThreeJSAnimations();
    
    // Initialize advanced CSS animations
    new AdvancedAnimations();
    
    // Initialize particle systems for specific sections
    const particleContainers = document.querySelectorAll('.particle-container');
    particleContainers.forEach(container => {
        new ParticleSystem(container);
    });
});

// Export for use in other files
window.ThreeJSAnimations = ThreeJSAnimations;
window.AdvancedAnimations = AdvancedAnimations;
window.ParticleSystem = ParticleSystem;