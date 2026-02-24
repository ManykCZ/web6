// Navbar Toggle for Mobile
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// === fade in
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Zavření přes Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
});

// Close menu when clicking on a link (tohle nechám, zavře se při kliknutí na odkaz)
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navbar links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');

  const options = {
    threshold: 0.4,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.classList.contains('animated')) return;
        el.classList.add('animated');

        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.textContent.replace(/[\d.]+/, ''); // zachytí %, +, let, atd.
        let current = 0;
        const duration = 1800;
        const step = target / (duration / 16);

        const tick = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        };

        requestAnimationFrame(tick);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
});

// === TOGGLE FAQ ===
function toggleFaq(btn) {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}