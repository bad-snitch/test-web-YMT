/* ==========================================
   DOUCHI Gadgets Store - JavaScript
   ========================================== */

// ==========================================
// Mobile Menu Toggle
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ==========================================
// Product Filtering
// ==========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ==========================================
// FAQ Accordion
// ==========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const faqQuestion = item.querySelector('.faq-question');

    faqQuestion.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==========================================
// Contact Form Handling
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = encodeURIComponent(
            `Contact Form Submission:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}`
        );

        // Redirect to WhatsApp
        window.open(`https://wa.me/2347066553952?text=${whatsappMessage}`, '_blank');

        // Reset form
        contactForm.reset();
    });
}

// ==========================================
// Smooth Scroll Behavior
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Add Fade Animation to elements
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.trust-card, .product-card, .benefit, .mission-card, .vision-card').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});

// ==========================================
// Handle Mobile Responsiveness
// ==========================================

const handleResize = () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
};

window.addEventListener('resize', handleResize);

// ==========================================
// Loading Animation
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==========================================
// Prevent Multiple Form Submissions
// ==========================================

let formSubmitting = false;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (formSubmitting) {
            e.preventDefault();
            return;
        }
        formSubmitting = true;
        
        // Reset after a delay
        setTimeout(() => {
            formSubmitting = false;
        }, 1000);
    });
}

// ==========================================
// Add Keyboard Navigation for FAQ
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedItem = document.activeElement;
        
        if (focusedItem.classList.contains('faq-question')) {
            const faqItems = document.querySelectorAll('.faq-question');
            const currentIndex = Array.from(faqItems).indexOf(focusedItem);
            
            if (e.key === 'ArrowDown' && currentIndex < faqItems.length - 1) {
                faqItems[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                faqItems[currentIndex - 1].focus();
            }
        }
    }
});

// ==========================================
// Console Message
// ==========================================

console.log('%cWelcome to DOUCHI Gadgets Store! 🏪', 'font-size: 16px; color: #f97316; font-weight: bold;');
console.log('%cFor inquiries, WhatsApp us: 07066553952', 'font-size: 14px; color: #25d366;');
