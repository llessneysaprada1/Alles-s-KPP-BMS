// ========== UTILITY FUNCTIONS ==========

// Show notification
function showNotification(message) {
  const notification = document.getElementById('copyNotification');
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Tersalin ke clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showNotification('Gagal menyalin!');
  });
}

// Lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll('.lazy-load');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ========== NAVIGATION FUNCTIONS ==========

// Mobile Navigation Toggle
document.getElementById('menuToggle').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active Navigation Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
  });
});

// ========== SCROLL FUNCTIONS ==========

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
}

// Back to Top Button
function updateBackToTopButton() {
  const backToTop = document.getElementById('backToTop');
  
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

document.getElementById('backToTop').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== THEME FUNCTIONS ==========

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

document.getElementById('themeToggle').addEventListener('click', function() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// ========== COPY FUNCTIONS ==========

// Copy functionality for contact info and social media
document.querySelectorAll('[data-copy]').forEach(element => {
  element.addEventListener('click', function() {
    const textToCopy = this.getAttribute('data-copy');
    copyToClipboard(textToCopy);
  });
});

// ========== MODAL FUNCTIONS ==========

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

function openModal(imageSrc, title, description) {
  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Hobby images modal
document.querySelectorAll('.hobby-image').forEach(element => {
  element.addEventListener('click', function() {
    const img = this.querySelector('img');
    const title = this.getAttribute('data-title');
    const description = this.getAttribute('data-description');
    openModal(img.src, title, description);
  });
});

// Favorite cards modal
document.querySelectorAll('.favorite-card').forEach(element => {
  element.addEventListener('click', function(e) {
    if (!e.target.classList.contains('favorite-link')) {
      const img = this.querySelector('img');
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');
      openModal(img.src, title, description);
    }
  });
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

// ========== SKILL ANIMATION FUNCTIONS ==========

// Animate skill progress bars when visible
function animateSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const skillLevel = card.getAttribute('data-skill');
        const progressBar = card.querySelector('.skill-progress-bar');
        const percentage = card.querySelector('.skill-percentage');
        
        setTimeout(() => {
          progressBar.style.width = skillLevel + '%';
        }, 200);
        
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => skillObserver.observe(card));
}

// ========== TRAINING FUNCTIONS ==========

// Expandable training items
document.querySelectorAll('.training-toggle').forEach(button => {
  button.addEventListener('click', function() {
    const trainingItem = this.closest('.training-item');
    const isExpanded = trainingItem.classList.contains('expanded');
    
    // Close all other expanded items
    document.querySelectorAll('.training-item.expanded').forEach(item => {
      if (item !== trainingItem) {
        item.classList.remove('expanded');
        item.querySelector('.training-toggle').textContent = 'Detail';
      }
    });
    
    // Toggle current item
    if (isExpanded) {
      trainingItem.classList.remove('expanded');
      this.textContent = 'Detail';
    } else {
      trainingItem.classList.add('expanded');
      this.textContent = 'Tutup';
    }
  });
});

// ========== FADE IN ANIMATION FUNCTIONS ==========

// Fade in elements on scroll
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => fadeObserver.observe(element));
}

// Enhanced fade in for specific elements
function initElementAnimations() {
  // Experience cards
  const experienceCards = document.querySelectorAll('.experience-card');
  const experienceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  experienceCards.forEach(card => experienceObserver.observe(card));

  // Skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach(card => skillObserver.observe(card));

  // Hobby cards
  const hobbyCards = document.querySelectorAll('.hobby-card');
  const hobbyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  hobbyCards.forEach(card => hobbyObserver.observe(card));

  // Training items
  const trainingItems = document.querySelectorAll('.training-item');
  const trainingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  trainingItems.forEach(item => trainingObserver.observe(item));

  // Favorite cards
  const favoriteCards = document.querySelectorAll('.favorite-card');
  const favoriteObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  favoriteCards.forEach(card => favoriteObserver.observe(card));

  // Contact items
  const contactItems = document.querySelectorAll('.contact-item');
  const contactObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  contactItems.forEach(item => contactObserver.observe(item));

  // Favorites intro
  const favoritesIntro = document.querySelector('.favorites-intro');
  if (favoritesIntro) {
    const favoritesIntroObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    favoritesIntroObserver.observe(favoritesIntro);
  }

  // Album announcement
  const albumAnnouncement = document.querySelector('.album-announcement');
  if (albumAnnouncement) {
    const albumObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    albumObserver.observe(albumAnnouncement);
  }
}

// ========== ANIMATED TITLE FUNCTION ==========

// Animated title
function initAnimatedTitle() {
  const titleElement = document.getElementById('animatedTitle');
  const titleText = titleElement.textContent;
  
  // Clear the original text
  titleElement.textContent = '';
  titleElement.classList.add('animated');
  
  // Split the text into individual characters
  const chars = titleText.split('');
  
  // Calculate delay for 1.2 second total animation
  const delayPerChar = 0.046; // ~46ms
  
  // Create a span for each character
  chars.forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
    span.style.animationDelay = `${index * delayPerChar}s`;
    titleElement.appendChild(span);
  });
}

// ========== FLOATING SHAPES ANIMATION ==========

// Animate floating shapes on scroll
function animateFloatingShapes() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.2;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ========== PRINT FUNCTION ==========

// Print functionality
document.getElementById('printBtn').addEventListener('click', function() {
  window.print();
});

// ========== INITIALIZATION ==========

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Initialize lazy loading
  lazyLoadImages();
  
  // Initialize fade in animations
  initFadeInAnimations();
  
  // Initialize element animations
  initElementAnimations();
  
  // Initialize animated title
  initAnimatedTitle();
  
  // Initialize skill animations
  animateSkillBars();
  
  // Initialize floating shapes animation
  animateFloatingShapes();
  
  // Update scroll progress on scroll
  window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateBackToTopButton();
  });
});

// ========== KEYBOARD NAVIGATION ==========

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Press 'T' to toggle theme
  if (e.key === 't' || e.key === 'T') {
    if (!e.target.matches('input, textarea')) {
      document.getElementById('themeToggle').click();
    }
  }
  
  // Press 'P' to print
  if (e.key === 'p' || e.key === 'P') {
    if (!e.target.matches('input, textarea')) {
      document.getElementById('printBtn').click();
    }
  }
  
  // Press 'Home' to scroll to top
  if (e.key === 'Home') {
    e.preventDefault();
    document.getElementById('backToTop').click();
  }
  
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    document.getElementById('navLinks').classList.remove('active');
  }
});
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
  updateScrollProgress();
  updateBackToTopButton();
  updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
});
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'https://picsum.photos/seed/fallback/400/300.jpg';
  });
});