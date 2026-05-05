// JAVASCRIPT FOR MATHER HAIR ROOM 

document.addEventListener("DOMContentLoaded", () => {

  // THIS MAKES THE YEAR IN THE FOOTER CHANGE TO THE CURRENT YEAR EACH TIME. SAVES CHANGING IT MANUALLY EVERY YEAR.

document.getElementById("year").textContent = new Date().getFullYear();

  // MAKES A SMALL NAVBAR WHEN IN MOBILE
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ANIMATES PRICING AND GALLERY ON PAGE LOAD
const slideIns = document.querySelectorAll('.slide-in');
slideIns.forEach(el => {
  setTimeout(() => {
    el.classList.add('visible');
  }, 200);
});

// FIX FOR IOS VIDEO AUTOPLAY
const video = document.querySelector('#home video');
if (video) {
  video.muted = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  
  const tryPlay = () => video.play().catch(() => {});

  tryPlay();

  ['touchstart', 'touchmove', 'scroll', 'click'].forEach(event => {
    document.addEventListener(event, () => {
      if (video.paused) video.play().catch(() => {});
    }, { once: true });
  });
}

  // ADDS A LIGHTBOX WHEN AN IMAGE IS CLICKED
  const images = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');

  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.style.display = 'flex';
    });
  });

  function showImage() {
    lightboxImg.src = images[currentIndex].src;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightboxImg) return;
      const clickX = e.clientX;
      const screenWidth = window.innerWidth;
      if (clickX > screenWidth / 2) {
        nextImage();
      } else {
        prevImage();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  const rightBtn = document.querySelector('.right');
  const leftBtn = document.querySelector('.left');
  if (rightBtn) rightBtn.onclick = nextImage;
  if (leftBtn) leftBtn.onclick = prevImage;

  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') lightbox.style.display = 'none';
    }
  });

  // TRANSITIONS BETWEEN WEB PAGES
  document.body.classList.add("loaded");

  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !link.hasAttribute("target")) {
        e.preventDefault();
        document.body.classList.remove("loaded");
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      }
    });
  });

});

// ANIMATES THE PAGE SO WHEN YOU SCROLL DOWN, EACH SECTION APPEARS
const reveals = document.querySelectorAll('.reveal');

const observe = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observe.observe(el));

// ANIMATES THE REVIEW CARDS A LITTLE DIFFERENT (Come onto the screen one at a time, as oppose to all at once)

const cards = document.querySelectorAll('.review-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => observer.observe(card));

