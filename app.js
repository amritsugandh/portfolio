window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Refresh ScrollTrigger once the loader is gone and layout is stable
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 700);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = mobileMenuBtn.querySelector('i');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');

        // Toggle icon between List and X
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        } else {
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // --- Navbar Scroll Effect ---
    // Scroll effect removed at user request to keep navbar consistent
    const navbar = document.getElementById('navbar');

    // --- GSAP Animations (Premium Micro-Animations) ---
    const initAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Fade-up animation for general elements
        gsap.utils.toArray('.fade-up-element').forEach(el => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                lazy: false,
                immediateRender: false
            });
        });

        // Staggered animation for grid items (Services, Projects, Blog)
        const animateGrid = (selector) => {
            const grid = document.querySelector(selector);
            if (grid) {
                gsap.from(grid.children, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 90%",
                    },
                    lazy: false,
                    immediateRender: false
                });
            }
        };

        animateGrid('#services .grid');
        animateGrid('#project-gallery');
        animateGrid('#blog .grid');
        animateGrid('#stats-grid');
        animateGrid('#stats-grid .grid');
        animateGrid('#skills-grid-container');

        // Extra refreshes after animations are registered
        setTimeout(() => { ScrollTrigger.refresh(); }, 500);
        setTimeout(() => { ScrollTrigger.refresh(); }, 2000);
    };

    // Initialize animations after content is rendered
    document.addEventListener('portfolioRendered', initAnimations);

    // Hero Image - Animation logic removed as requested
    const heroImage = document.querySelector('.vector-border-perfect');

    // Smooth scroll for anchor links (if browser doesn't support CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Typewriter Effect ---
    const typedTextSpan = document.getElementById("typewriter");
    const cursorSpan = document.getElementById("cursor");

    if (typedTextSpan && cursorSpan) {
        const textArray = ["Software Engineer", "Full-Stack Developer", "Python Developer", "React Enthusiast", "Gen AI Enthusiast", "Frontend Developer", "AI & ML Enthusiast"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000; // Delay between current and next text
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }

        setTimeout(type, newTextDelay + 250);
    }

    // --- Scroll-to-Top Button ---
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
                scrollTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Theme Switcher ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const htmlElement = document.documentElement;

    const updateThemeIcons = (isLight) => {
        const sunIcons = document.querySelectorAll('.sun-icon, .sun-icon-mobile');
        const moonIcons = document.querySelectorAll('.moon-icon, .moon-icon-mobile');

        if (isLight) {
            sunIcons.forEach(el => el.classList.remove('hidden'));
            moonIcons.forEach(el => el.classList.add('hidden'));
        } else {
            sunIcons.forEach(el => el.classList.add('hidden'));
            moonIcons.forEach(el => el.classList.remove('hidden'));
        }
    };

    const toggleTheme = () => {
        const isLight = htmlElement.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcons(isLight);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.classList.add('light-mode');
        updateThemeIcons(true);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

    // --- Professional Contact Form (Web3Forms Integration) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 1. Basic Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showStatus("Please fill in all fields.", "error");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus("Please enter a valid email address.", "error");
                return;
            }

            // 2. Set Loading State
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.ph-paper-plane-tilt');
            const originalText = btnText.textContent;
            
            btnText.textContent = "Sending...";
            btnIcon.className = "ph-bold ph-circle-notch animate-spin text-xl";
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            // 3. Prepare Form Data
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // 4. Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    showStatus("Message sent successfully! I'll get back to you soon.", "success");
                    contactForm.reset();
                } else {
                    console.log(response);
                    showStatus(json.message || "Something went wrong. Please try again.", "error");
                }
            })
            .catch(error => {
                console.log(error);
                showStatus("Connection error. Please check your internet or try again.", "error");
            })
            .then(function() {
                // Reset Button
                setTimeout(() => {
                    btnText.textContent = originalText;
                    btnIcon.className = "ph-bold ph-paper-plane-tilt text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform";
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
                }, 3000);
            });
        });
    }

    function showStatus(msg, type) {
        if (!formStatus) return;
        
        const statusIcon = formStatus.querySelector('.status-icon');
        const statusText = formStatus.querySelector('.status-text');
        
        statusText.textContent = msg;
        formStatus.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20', 'bg-red-500/10', 'text-red-400', 'border-red-500/20');
        
        if (type === 'success') {
            formStatus.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
            statusIcon.className = "ph-bold ph-check-circle text-xl";
        } else {
            formStatus.classList.add('bg-red-500/10', 'text-red-400', 'border', 'border-red-500/20');
            statusIcon.className = "ph-bold ph-warning-circle text-xl";
        }
        
        formStatus.classList.remove('hidden');
        gsap.fromTo(formStatus, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
        
        if (type === 'success') {
            setTimeout(() => {
                gsap.to(formStatus, { opacity: 0, duration: 0.5, onComplete: () => formStatus.classList.add('hidden') });
            }, 5000);
        }
    }

    // --- Admin Portal Link revealing ---
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            const adminLink = document.getElementById('admin-link');
            const adminLinkMobile = document.getElementById('admin-link-mobile');
            if (user) {
                if (adminLink) adminLink.classList.remove('hidden');
                if (adminLinkMobile) adminLinkMobile.classList.remove('hidden');
            }
        });
    }

    // --- In-Page Legal Modals ---
    const modalOverlay = document.getElementById('legal-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-legal-modal');
    const openTermsBtn = document.getElementById('open-terms');
    const openPrivacyBtn = document.getElementById('open-privacy');

    const legalContent = {
        terms: {
            title: "Terms of Service",
            content: `
                <h2 class="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using this portfolio website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                <h2 class="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                <p>All content included on this site, such as text, graphics, logos, images, and code, is the property of Amrit Sugandh and protected by international copyright laws.</p>
                <h2 class="text-2xl font-bold text-white mb-4">3. Use License</h2>
                <p>Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only.</p>
                <h2 class="text-2xl font-bold text-white mb-4">4. Disclaimer</h2>
                <p>The materials on Amrit Sugandh's website are provided on an 'as is' basis. Amrit Sugandh makes no warranties, expressed or implied.</p>
                <h2 class="text-2xl font-bold text-white mb-4">5. Project Outcomes</h2>
                <p>While the projects showcased reflect actual development work, they are provided as portfolio demonstrations.</p>
            `
        },
        privacy: {
            title: "Privacy Policy",
            content: `
                <h2 class="text-2xl font-bold text-white mb-4">1. Information Collection</h2>
                <p>We only collect information that you voluntarily provide through the contact form. This may include your name and email address.</p>
                <h2 class="text-2xl font-bold text-white mb-4">2. Use of Information</h2>
                <p>Your information is used solely to respond to your inquiries. We do not sell or trade your personally identifiable information.</p>
                <h2 class="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                <p>We implement security measures to maintain the safety of your information. However, no internet transmission is 100% secure.</p>
                <h2 class="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                <p>This website uses technical session cookies for theme selection and authentication. No tracking cookies are used.</p>
                <h2 class="text-2xl font-bold text-white mb-4">5. Third-Party Links</h2>
                <p>We provide links to GitHub and LinkedIn. These sites have independent privacy policies.</p>
            `
        }
    };

    const openModal = (type) => {
        if (!modalOverlay || !legalContent[type]) return;

        modalTitle.textContent = legalContent[type].title;
        modalContent.innerHTML = legalContent[type].content;

        modalOverlay.classList.remove('hidden');
        gsap.to(modalOverlay, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modalOverlay) return;

        gsap.to(modalOverlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                modalOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    };

    if (openTermsBtn) openTermsBtn.addEventListener('click', () => openModal('terms'));
    if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openModal('privacy'));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Dynamic Blog Modal Logic ---
    const blogModalOverlay = document.getElementById('blog-modal-overlay');
    const closeBlogModalBtn = document.getElementById('close-blog-modal');
    
    window.openBlogModal = (index) => {
        const blogs = window.currentSelectedBlogs;
        if (!blogs || !blogs[index] || !blogModalOverlay) return;

        const blog = blogs[index];
        
        // Populate modal
        document.getElementById('blog-modal-category').textContent = blog.category;
        document.getElementById('blog-modal-title').textContent = blog.title;
        document.getElementById('blog-modal-date').textContent = blog.date;
        document.getElementById('blog-modal-content').innerHTML = blog.content || `<p>${blog.excerpt}</p>`;
        
        // Update share links
        const shareTitle = encodeURIComponent(blog.title);
        const shareUrl = encodeURIComponent(window.location.href);
        document.getElementById('blog-share-ln').href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        document.getElementById('blog-share-tw').href = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;

        // Show modal
        blogModalOverlay.classList.remove('hidden');
        gsap.to(blogModalOverlay, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Animate modal content entry
        gsap.fromTo(".blog-modal-curved", 
            { y: 30, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)", delay: 0.1 }
        );

        document.body.style.overflow = 'hidden';
    };

    const closeBlogModal = () => {
        if (!blogModalOverlay) return;

        gsap.to(blogModalOverlay, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                blogModalOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    };

    if (closeBlogModalBtn) closeBlogModalBtn.addEventListener('click', closeBlogModal);
    if (blogModalOverlay) {
        blogModalOverlay.addEventListener('click', (e) => {
            if (e.target === blogModalOverlay) closeBlogModal();
        });
    }

    // Add Escape key listener for blog modal too
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModalOverlay && !blogModalOverlay.classList.contains('hidden')) {
            closeBlogModal();
        }
    });
    // --- Project Navigation (Horizontal Slider) ---
    const projectGallery = document.getElementById('project-gallery');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (projectGallery && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstCard = projectGallery.querySelector('.minimal-card');
            return firstCard ? firstCard.clientWidth + 32 : 400; // card width + gap
        };

        nextBtn.addEventListener('click', () => {
            projectGallery.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            projectGallery.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Toggle arrow visibility based on scroll position
        const toggleArrows = () => {
            const isAtStart = projectGallery.scrollLeft <= 20;
            const isAtEnd = projectGallery.scrollLeft + projectGallery.clientWidth >= projectGallery.scrollWidth - 20;
            const canScroll = projectGallery.scrollWidth > projectGallery.clientWidth;

            if (window.innerWidth >= 768) { 
                prevBtn.style.opacity = (canScroll && !isAtStart) ? '1' : '0.15';
                prevBtn.style.pointerEvents = (canScroll && !isAtStart) ? 'auto' : 'none';
                
                nextBtn.style.opacity = (canScroll && !isAtEnd) ? '1' : '0.15';
                nextBtn.style.pointerEvents = (canScroll && !isAtEnd) ? 'auto' : 'none';
            } else {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
        };

        projectGallery.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        
        document.addEventListener('portfolioRendered', () => {
            setTimeout(toggleArrows, 800); // Wait for cards to render
        });
    }

});
