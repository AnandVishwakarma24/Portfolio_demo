// Matrix Rain Animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const chars = '01';
const drops = [];
const fontSize = 14;
const columns = width / fontSize;

// Track scroll position for gradient effect
let lastScrollY = window.scrollY;
let scrollPercent = 0;

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate the gradient fade based on scroll position
    const fadeStart = height * 0.5; // Start fade at 50% of viewport height
    const fadeEnd = height * 0.8;   // End fade at 80% of viewport height
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        
        // Calculate opacity based on vertical position
        let opacity = 1;
        if (y > fadeStart) {
            opacity = 1 - Math.min(1, (y - fadeStart) / (fadeEnd - fadeStart));
        }
        
        ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.fillText(text, i * fontSize, y);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Update scroll position for gradient effect
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    scrollPercent = (lastScrollY / (document.documentElement.scrollHeight - window.innerHeight));
});

setInterval(draw, 33);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Fade-in Animation
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Navbar auto-hide on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
    }
    lastScrollTop = scrollTop;
});
