// ANIMAZIONE SCROLL IMMAGINI - Intersection Observer
(function() {
  'use strict';
  
  // Funzione per inizializzare l'animazione
  function initScrollAnimation() {
    // Seleziona tutte le immagini da animare
    const images = document.querySelectorAll('.animated-grid-image');
    
    if (images.length === 0) {
      console.log('Nessuna immagine con classe .animated-grid-image trovata');
      return;
    }
    
    // Configura l'Intersection Observer
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.15 // Attiva quando il 15% dell'immagine è visibile
    };
    
    // Callback quando un'immagine entra/esce dalla viewport
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aggiungi la classe 'visible' per attivare l'animazione
          entry.target.classList.add('visible');
          
          // Opzionale: smetti di osservare dopo che l'animazione è partita
          // observer.unobserve(entry.target);
        }
      });
    };
    
    // Crea l'observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Osserva ogni immagine
    images.forEach(image => {
      observer.observe(image);
    });
    
    console.log(`Scroll animation inizializzata per ${images.length} immagini`);
  }
  
  // EFFETTO PARALLASSE PER IMMAGINI PROFILI
  function initParallax() {
    const parallaxImages = document.querySelectorAll('.floating-image');
    
    if (parallaxImages.length === 0) {
      console.log('Nessuna immagine con classe .floating-image trovata');
      return;
    }
    
    // Funzione per calcolare e applicare il parallasse
    function updateParallax() {
      parallaxImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calcola la posizione dell'immagine rispetto al viewport
        // 0 = top viewport, 1 = bottom viewport
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        
        // Calcola il movimento (da -30px a +30px)
        // Leggero effetto: movimento massimo ±30px
        const movement = (scrollProgress - 0.5) * 100; // Range: -30 a +30
        
        // Applica il transform solo se l'immagine è visibile
        if (scrollProgress > 0 && scrollProgress < 1) {
          image.style.transform = `translate3d(0px, ${movement}px, 0px)`;
        }
      });
    }
    
    // Throttle per performance: esegue updateParallax max ogni 10ms
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Ascolta lo scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Esegui una volta all'inizio
    updateParallax();
    
    console.log(`Parallax inizializzato per ${parallaxImages.length} immagini profili`);
  }
  
  // Inizializza quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimation();
      initParallax();
    });
  } else {
    initScrollAnimation();
    initParallax();
  }
})();
