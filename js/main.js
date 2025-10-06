// Naruto Demo - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initParticleEffects();
    initTechniqueCards();
    initCharacterAnimations();
    initLoadingScreen();
    initKeyboardNavigation();
    
    console.log('🍃 Naruto Demo initialized successfully!');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.ninja-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations - Intersection Observer
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.character-card, .technique-card, .village-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for cards
                if (entry.target.classList.contains('character-card') || 
                    entry.target.classList.contains('technique-card') || 
                    entry.target.classList.contains('village-card')) {
                    
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-fade-in-up');
                }
            }
        });
    }, observerOptions);
    
    [...sections, ...cards].forEach(element => {
        observer.observe(element);
    });
}

// Particle Effects
function initParticleEffects() {
    createParticleSystem();
}

function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random color (orange or blue theme)
        const colors = ['#ff6b35', '#4285f4', '#ffa726', '#42a5f5'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animation
        particle.style.animation = `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 7000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Technique Cards Interactive Effects
function initTechniqueCards() {
    const techniqueCards = document.querySelectorAll('.technique-card');
    
    techniqueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            // Add glow effect based on technique type
            const bgColor = window.getComputedStyle(this).backgroundColor;
            this.style.boxShadow += `, 0 0 30px ${bgColor}`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            const techniqueName = this.querySelector('h3').textContent;
            showTechniqueDetails(techniqueName);
        });
    });
}

// Show Technique Details (Modal-like effect)
function showTechniqueDetails(techniqueName) {
    const techniques = {
        'RASENGAN': {
            description: 'Una técnica de forma de chakra desarrollada por Minato Namikaze.',
            power: '⭐⭐⭐⭐⭐',
            difficulty: 'Muy Alta',
            users: ['Naruto', 'Minato', 'Jiraiya']
        },
        'CHIDORI': {
            description: 'Técnica de assassinación que concentra chakra de rayo en la mano.',
            power: '⭐⭐⭐⭐⭐',
            difficulty: 'Muy Alta',
            users: ['Sasuke', 'Kakashi']
        },
        'KAGE BUNSHIN': {
            description: 'Crea clones físicos que pueden actuar independientemente.',
            power: '⭐⭐⭐',
            difficulty: 'Alta',
            users: ['Naruto', 'Tobirama']
        }
    };
    
    const technique = techniques[techniqueName];
    if (technique) {
        createTechniqueModal(techniqueName, technique);
    }
}

function createTechniqueModal(name, details) {
    // Remove existing modal
    const existingModal = document.querySelector('.technique-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'technique-modal fixed inset-0 z-50 flex items-center justify-center p-4';
    modal.style.background = 'rgba(0, 0, 0, 0.8)';
    modal.style.backdropFilter = 'blur(5px)';
    
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-xl p-6 max-w-md w-full transform animate-scale-in">
            <div class="text-center mb-4">
                <h3 class="text-2xl font-bold text-orange-500 mb-2">${name}</h3>
                <div class="w-16 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto"></div>
            </div>
            
            <div class="space-y-4">
                <p class="text-gray-300">${details.description}</p>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-400 text-sm">Poder:</span>
                        <div class="text-yellow-400">${details.power}</div>
                    </div>
                    <div>
                        <span class="text-gray-400 text-sm">Dificultad:</span>
                        <div class="text-red-400">${details.difficulty}</div>
                    </div>
                </div>
                
                <div>
                    <span class="text-gray-400 text-sm">Usuarios:</span>
                    <div class="flex flex-wrap gap-2 mt-1">
                        ${details.users.map(user => 
                            `<span class="bg-blue-600 text-white px-2 py-1 rounded text-xs">${user}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <button class="close-modal w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors">
                Cerrar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // ESC key to close
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Character Card Animations
function initCharacterAnimations() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.w-32.h-32');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
                avatar.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.w-32.h-32');
            if (avatar) {
                avatar.style.transform = '';
            }
        });
    });
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <div class="text-orange-500 font-bold text-xl naruto-font">Cargando Mundo Ninja...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Arrow keys for navigation
        if (e.key === 'ArrowDown') {
            scrollToNextSection();
        } else if (e.key === 'ArrowUp') {
            scrollToPreviousSection();
        }
    });
}

function scrollToNextSection() {
    const sections = ['#inicio', '#personajes', '#tecnicas', '#aldeas'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        document.querySelector(nextSection).scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const sections = ['#inicio', '#personajes', '#tecnicas', '#aldeas'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        document.querySelector(prevSection).scrollIntoView({ behavior: 'smooth' });
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let currentSection = '#inicio';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = '#' + section.id;
        }
    });
    
    return currentSection;
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, var(--naruto-orange), var(--naruto-blue));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .animate-scale-in {
        animation: scaleIn 0.3s ease forwards;
    }
`;
document.head.appendChild(style);

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateNinjaMode();
        konamiCode = [];
    }
});

function activateNinjaMode() {
    const ninja = document.createElement('div');
    ninja.innerHTML = '🥷';
    ninja.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        z-index: 10000;
        animation: ninjaAppear 2s ease forwards;
    `;
    
    const ninjaStyle = document.createElement('style');
    ninjaStyle.textContent = `
        @keyframes ninjaAppear {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5) rotate(180deg); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(360deg); }
        }
    `;
    document.head.appendChild(ninjaStyle);
    document.body.appendChild(ninja);
    
    setTimeout(() => {
        ninja.remove();
        ninjaStyle.remove();
    }, 2000);
    
    // Add temporary ninja effects
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
        document.body.style.filter = '';
    }, 3000);
}
