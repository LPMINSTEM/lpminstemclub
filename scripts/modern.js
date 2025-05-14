// Modern JavaScript for LPM IN STEM

document.addEventListener('DOMContentLoaded', function() {
  // Initialize elements
  const body = document.body;
  const mainNav = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTopBtn = document.getElementById('backToTop');
  const fadeElements = document.querySelectorAll('.fade-in');
  const contactForm = document.querySelector('.contact-form');
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });
  }
  
  // Close mobile menu when clicking a link
  const navLinkElements = document.querySelectorAll('.nav-link');
  navLinkElements.forEach(link => {
    link.addEventListener('click', function() {
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
      }
    });
  });
  
  // Scroll event listener
  window.addEventListener('scroll', function() {
    // Navbar shrink on scroll
    if (mainNav) {
      if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
    
    // Back to top button visibility
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
    
    // Reveal elements on scroll
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  });
  
  // Back to top functionality
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Contact form validation and submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = contactForm.querySelector('#name');
      const emailInput = contactForm.querySelector('#email');
      const messageInput = contactForm.querySelector('#message');
      
      // Simple validation
      if (!nameInput.value.trim()) {
        showInputError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        clearInputError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        showInputError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearInputError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        showInputError(messageInput, 'Please enter your message');
        isValid = false;
      } else {
        clearInputError(messageInput);
      }
      
      if (isValid) {
        // Show success message (in a real app, you would submit to a server here)
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (would be an actual fetch/ajax call in production)
        setTimeout(() => {
          const successMessage = document.createElement('div');
          successMessage.classList.add('success-message');
          successMessage.textContent = 'Thank you! Your message has been sent successfully.';
          
          contactForm.innerHTML = '';
          contactForm.appendChild(successMessage);
        }, 1500);
      }
    });
  }
  
  // Helper functions for form validation
  function showInputError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
  }
  
  function clearInputError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      errorElement.remove();
    }
    
    input.classList.remove('error');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Animate stats counting
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const targetValue = parseFloat(stat.textContent);
      const suffix = stat.textContent.replace(/[0-9.]/g, '');
      let startValue = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const easedProgress = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Cubic easing
          
          const currentValue = Math.floor(easedProgress * targetValue);
          stat.textContent = currentValue + suffix;
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = targetValue + suffix;
        }
      }
      
      requestAnimationFrame(updateCount);
    });
  }
  
  // Trigger stat animation when stats are in view
  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsContainer);
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animate elements on page load
  function animateOnLoad() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.classList.add('active');
      }, 300);
    }
    
    const featuredItems = document.querySelectorAll('.featured-grid .featured-card');
    featuredItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('active');
      }, 500 + (index * 150));
    });
  }
  
  animateOnLoad();
  
  // Tab functionality for content sections
  const tabButtons = document.querySelectorAll('.tab-button');
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        // Deactivate all tab buttons
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Activate clicked tab and content
        button.classList.add('active');
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
    
    // Activate first tab by default
    if (tabButtons[0]) {
      tabButtons[0].click();
    }
  }
  
  // Page transition effect
  function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only apply transition for internal links
        if (href && href.indexOf('#') !== 0 && href.indexOf('://') === -1) {
          e.preventDefault();
          
          // Create transition overlay
          const overlay = document.createElement('div');
          overlay.classList.add('page-transition');
          document.body.appendChild(overlay);
          
          // Animate overlay
          setTimeout(() => {
            overlay.classList.add('active');
            
            // Navigate after animation completes
            setTimeout(() => {
              window.location.href = href;
            }, 500);
          }, 10);
        }
      });
    });
  }
  
  initPageTransitions();
  
  // Title remains consistent regardless of tab focus
});
