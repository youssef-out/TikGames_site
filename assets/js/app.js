// State management
let currentLanguage = localStorage.getItem('selectedLanguage') || 'ar';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Apply initial language
  applyLanguage(currentLanguage);
  
  // Set up event listeners
  setupEventListeners();
  
  // Scroll animations setup
  setupScrollAnimations();
  
  // Start app mockup slideshow
  startAppMockupSlideshow();
});

// Apply language and text translations
function applyLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);
  
  // Update document attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Update body fonts class
  if (lang === 'ar') {
    document.body.classList.remove('font-en');
    document.body.classList.add('font-ar');
  } else {
    document.body.classList.remove('font-ar');
    document.body.classList.add('font-en');
  }

  // Translate all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // Check if it's an input placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', translations[lang][key]);
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Update specific elements if needed
  updateDynamicTexts();
}

// Update text details that depend on the active language
function updateDynamicTexts() {
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.innerHTML = currentLanguage === 'ar' 
      ? '<i class="fa-solid fa-globe"></i><span>EN</span>' 
      : '<i class="fa-solid fa-globe"></i><span>AR</span>';
  }

  // Update video tutorial source
  const videoSource = document.getElementById('video-source');
  const videoElement = document.getElementById('tutorial-video');
  if (videoSource && videoElement) {
    const oldSrc = videoSource.getAttribute('src');
    const newSrc = currentLanguage === 'ar' 
      ? 'assets/videos/tutorial arabic edition.mp4' 
      : 'assets/videos/tutorial English Edition.mp4';
      
    if (oldSrc !== newSrc) {
      videoSource.setAttribute('src', newSrc);
      videoElement.load();
    }
  }
}

// Setup all event listeners
function setupEventListeners() {
  // Language switcher
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
      applyLanguage(newLang);
    });
  }

  // Sticky header on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight active nav link
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Modals operations
  const downloadBtns = document.querySelectorAll('.trigger-download');
  const downloadModal = document.getElementById('download-modal');
  const closeDownloadBtn = document.getElementById('close-download');

  const payBtns = document.querySelectorAll('.trigger-pay');
  const payModal = document.getElementById('pay-modal');
  const closePayBtn = document.getElementById('close-pay');

  // Open download modal
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (downloadModal) {
        downloadModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close download modal
  if (closeDownloadBtn && downloadModal) {
    closeDownloadBtn.addEventListener('click', () => {
      downloadModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Open payment instructions modal
  payBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (payModal) {
        payModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close payment modal
  if (closePayBtn && payModal) {
    closePayBtn.addEventListener('click', () => {
      payModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close modals when clicking outside their content
  window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
      downloadModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (e.target === payModal) {
      payModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Form submission dummy handler (premium look)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[type="text"]').value;
      const message = contactForm.querySelector('textarea').value;
      const subject = currentLanguage === 'ar' ? 'استفسار من الموقع' : 'Website Query';
      
      // Send message via WhatsApp instead of regular submit
      const waText = encodeURIComponent(`${subject}:\n${currentLanguage === 'ar' ? 'الاسم' : 'Name'}: ${name}\n${currentLanguage === 'ar' ? 'الرسالة' : 'Message'}: ${message}`);
      openWhatsApp(waText);
    });
  }

  // Custom video poster play listener
  const videoPoster = document.getElementById('video-poster');
  const tutorialVideo = document.getElementById('tutorial-video');
  if (videoPoster && tutorialVideo) {
    videoPoster.addEventListener('click', () => {
      videoPoster.classList.add('hidden');
      tutorialVideo.play();
    });
    
    // Show poster when video ends
    tutorialVideo.addEventListener('ended', () => {
      videoPoster.classList.remove('hidden');
    });
  }
}

// WhatsApp redirect helper
function openWhatsApp(encodedMessage) {
  const phoneNumber = '212617892238';
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');
}

// Custom subscription handlers
function subscribe(planType) {
  let message = '';
  if (planType === 'regular') {
    message = currentLanguage === 'ar' 
      ? "مرحباً، أود الاشتراك في الباقة العادية لتطبيق TikTok Games بقيمة 20$ للتفعيل، ثم 10$ شهرياً للتجديد."
      : "Hello, I would like to subscribe to the Regular Plan for TikTok Games for $20 activation, then $10/month for renewal.";
  } else if (planType === 'premium') {
    message = currentLanguage === 'ar'
      ? "مرحباً، أود الاشتراك في الباقة المميزة (VIP) لتطبيق TikTok Games بقيمة 30$ للتفعيل، ثم 10$ شهرياً للتجديد."
      : "Hello, I would like to subscribe to the Premium Plan (VIP) for TikTok Games for $30 activation, then $10/month for renewal.";
  }
  openWhatsApp(encodeURIComponent(message));
}

// Payment request WhatsApp handler
function requestPaymentDetails() {
  const payModal = document.getElementById('pay-modal');
  if (payModal) {
    payModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Contact payment support WhatsApp handler
function contactPaymentSupport() {
  const message = currentLanguage === 'ar'
    ? "مرحباً، أود الحصول على بيانات الدفع لتفعيل اشتراكي في تطبيق TikTok Games."
    : "Hello, I would like to get the payment details to activate my subscription for the TikTok Games app.";
  openWhatsApp(encodeURIComponent(message));
}

// Contact support WhatsApp handler
function contactSupport() {
  const message = currentLanguage === 'ar'
    ? "مرحباً، لدي استفسار بخصوص تطبيق TikTok Games."
    : "Hello, I have an inquiry regarding the TikTok Games app.";
  openWhatsApp(encodeURIComponent(message));
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

// Scroll animation observer
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Start automatic transition between login and game screens in the mockup
function startAppMockupSlideshow() {
  const loginScreen = document.getElementById('app-screen-login');
  const gamesScreen = document.getElementById('app-screen-games');
  if (!loginScreen || !gamesScreen) return;

  setInterval(() => {
    if (loginScreen.classList.contains('active')) {
      loginScreen.classList.remove('active');
      gamesScreen.classList.add('active');
    } else {
      gamesScreen.classList.remove('active');
      loginScreen.classList.add('active');
    }
  }, 5000); // Toggles screens every 5 seconds
}
