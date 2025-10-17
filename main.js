document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .experience-item, .certifications');
    
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in-up');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    });
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Typewriter effect for hero section
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };
    
    // Apply typewriter effect to hero paragraph
    const heroParagraph = document.querySelector('.hero p');
    if (heroParagraph) {
        const text = heroParagraph.textContent;
        heroParagraph.textContent = '';
        typeWriter(heroParagraph, text, 30);
    }
    
    // Add particles background
    const initParticles = () => {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 100;
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
                ctx.fill();
                
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    const dx = this.x - particles[i].x;
                    const dy = this.y - particles[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 - distance / 500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(particles[i].x, particles[i].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };
    
    // Initialize particles
    // initParticles(); // Uncomment to enable particle background
    
    // Add animation to skills on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(108, 99, 255, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Check elements on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check
    revealOnScroll();
    
    // Add active class to current section in navigation
    const setActiveNav = () => {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*=${sectionId}]`).classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', setActiveNav);
    
    // Initialize AOS (Animate On Scroll)
    // You can include AOS library for more advanced animations
    // <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    // <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    // Then initialize with: AOS.init();
    
    // Add smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Style the scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: #5549ff;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add loading animation
    const loadingAnimation = () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--dark-color);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(108, 99, 255, 0.2);
                border-radius: 50%;
                border-top-color: var(--primary-color);
                animation: spin 1s ease-in-out infinite;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .page-loader p {
                color: var(--light-color);
                font-size: 1.2rem;
                margin-top: 1rem;
            }
            
            .page-loader.hidden {
                opacity: 0;
                visibility: hidden;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Remove loader from DOM after animation
                setTimeout(() => {
                    document.body.removeChild(loader);
                }, 500);
            }, 1000);
        });
    };
    
    // Uncomment to enable loading animation
    // loadingAnimation();
});
