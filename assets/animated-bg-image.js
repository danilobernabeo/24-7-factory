// ANIMATED BACKGROUND IMAGE - Parallax Effect
(function() {
  'use strict';

  // Funzione per inizializzare l'effetto parallasse
  function initAnimatedBackground() {
    const bgImage = document.querySelector('.animated-bg-image');

    if (!bgImage) {
      console.log('Elemento .animated-bg-image non trovato');
      return;
    }

    // IntersectionObserver per ottimizzare le performance
    // Attiva l'effetto solo quando l'immagine è visibile
    let isVisible = false;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Attiva quando almeno il 50% è visibile
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(bgImage);

    // Funzione per calcolare e applicare il parallasse
    function updateParallax() {
      if (!isVisible) return;

      const rect = bgImage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcola la posizione dell'elemento rispetto al viewport
      // 0 = elemento in alto, 1 = elemento in basso
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);

      // Calcola il movimento parallasse
      // Range: da -50px a +50px (totale 100px di movimento)
      const parallaxY = (scrollProgress - 0.5) * 100;

      // Applica il transform
      bgImage.style.transform = `translate3d(0px, ${parallaxY}px, 0px)`;
    }

    // Throttle per performance: usa requestAnimationFrame
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

    console.log('Parallax per animated-bg-image inizializzato');
  }

  // Inizializza quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedBackground);
  } else {
    initAnimatedBackground();
  }
})();
