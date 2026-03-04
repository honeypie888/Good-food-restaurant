import data from './data.json' with { type: 'json' };

lucide.createIcons();

gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline();
tl.to("#hero-title", { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 })
  .to("#hero-subtitle", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6")
  .to("#hero-cta", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6");


gsap.utils.toArray('.stat-item').forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power2.out"
    });
});

gsap.utils.toArray('.reveal-up').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

gsap.utils.toArray('.reveal-left').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

gsap.utils.toArray('.reveal-right').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});


gsap.to(".parallax-bg", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
    ease: "none"
});


window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-charcoal/90', 'backdrop-blur-md', 'border-b', 'border-offwhite/10');
    } else {
        nav.classList.remove('bg-charcoal/90', 'backdrop-blur-md', 'border-b', 'border-offwhite/10');
    }
});


const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        mobileBtn.innerHTML = '<i data-lucide="x"></i>';
    } else {
        mobileMenu.classList.add('translate-x-full');
        mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('translate-x-full');
        mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });
});



const menuContainer = document.getElementById('menu-container');

function renderMenu(category = 'all') {
    menuContainer.innerHTML = '';
    const items = category === 'all' ? data.menu : data.menu.filter(item => item.category === category);
    
    items.forEach(item => {
        const badge = item.badge ? `<div class="absolute top-4 right-4 bg-saffron text-charcoal text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-sm z-10">${item.badge}</div>` : '';
        
        const html = `
            <div class="menu-card bg-[#0f0f0f] border border-offwhite/5 rounded-sm overflow-hidden group">
                <div class="relative aspect-[4/3] menu-card-image-wrapper">
                    ${badge}
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-0"></div>
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover menu-card-image transition-transform duration-700 ease-out">
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-serif text-xl font-medium text-offwhite group-hover:text-gold transition-colors">${item.name}</h3>
                        <span class="text-saffron font-medium">₹${item.price}</span>
                    </div>
                    <p class="text-offwhite/50 text-sm font-light leading-relaxed mb-4 min-h-[40px]">${item.description}</p>
                    <button class="text-sm uppercase tracking-wider font-medium text-offwhite hover:text-gold transition-colors flex items-center gap-2 group/btn">
                        Add to Order <i data-lucide="plus" class="w-4 h-4 group-hover/btn:rotate-90 transition-transform"></i>
                    </button>
                </div>
            </div>
        `;
        menuContainer.innerHTML += html;
    });
    lucide.createIcons();
    
    gsap.from('.menu-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
}

renderMenu();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderMenu(e.target.dataset.filter);
    });
});


const track = document.getElementById('reviews-track');
let currentSlide = 0;

function renderReviews() {
    data.reviews.forEach(review => {
        const stars = Array(5).fill('<i data-lucide="star" class="w-4 h-4 fill-gold text-gold"></i>').join('');
        const html = `
            <div class="w-full shrink-0 px-4 md:px-16 text-center">
                <div class="flex justify-center mb-6 gap-1">${stars}</div>
                <p class="font-serif text-2xl md:text-3xl leading-relaxed text-offwhite/90 mb-8 italic">"${review.text}"</p>
                <div class="font-sans text-sm tracking-widest uppercase text-offwhite/50">${review.author}</div>
            </div>
        `;
        track.innerHTML += html;
    });
    lucide.createIcons();
}

renderReviews();

document.getElementById('next-review').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % data.reviews.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.getElementById('prev-review').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + data.reviews.length) % data.reviews.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
});


document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
