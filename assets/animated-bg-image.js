// ANIMAZIONE IMMAGINE BACKGROUND - Effetto Parallax + Espansione Fluida
// L'espansione avviene tramite CSS transition (fluida e indipendente dallo scroll)
// Il parallax continua sempre in tempo reale
(function() {
  'use strict';

  /**
   * Configurazione dell'animazione
   */
  const CONFIG = {
    // Punto di trigger per l'espansione (quando l'elemento è visibile al 50% nella viewport)
    expansionTrigger: 0.5,

    // Intensità dell'effetto parallax (movimento verticale in px)
    // Più alto = più movimento
    parallaxIntensity: 50,

    // Debug mode
    debug: true
  };

  /**
   * Inizializza l'animazione per l'immagine
   */
  function initAnimatedBgImage() {
    // Seleziona l'elemento da animare
    const animatedImage = document.querySelector('.animated-bg-image');

    if (!animatedImage) {
      console.warn('Elemento .animated-bg-image non trovato');
      return;
    }

    if (CONFIG.debug) {
      console.log('✅ Animazione animated-bg-image inizializzata');
      console.log('📦 Elemento trovato:', animatedImage);
    }

    // Flag per triggerare l'espansione una sola volta
    let hasExpanded = false;

    // Throttling per performance
    let ticking = false;

    /**
     * Funzione principale che gestisce scroll
     */
    function onScroll() {
      const rect = animatedImage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // === 1. GESTIONE ESPANSIONE (una volta sola) ===
      if (!hasExpanded) {
        // Calcola quando l'elemento è visibile nella viewport
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const visibleProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);

        // Se l'elemento ha raggiunto il punto di trigger, espandi
        if (visibleProgress >= CONFIG.expansionTrigger) {
          animatedImage.classList.add('expanded');
          hasExpanded = true;

          if (CONFIG.debug) {
            console.log('🎯 ESPANSIONE TRIGGERATA! Elemento si espande a schermo intero');
          }
        }
      }

      // === 2. EFFETTO PARALLAX (sempre attivo) ===
      applyParallax(animatedImage, rect, windowHeight);

      // Reset ticking flag
      ticking = false;
    }

    /**
     * Applica l'effetto parallax continuo
     * @param {HTMLElement} element - Elemento da animare
     * @param {DOMRect} rect - Bounding rect dell'elemento
     * @param {number} windowHeight - Altezza della finestra
     */
    function applyParallax(element, rect, windowHeight) {
      // Calcola la posizione dell'elemento rispetto al viewport
      // 0 = top viewport, 1 = bottom viewport
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);

      // Calcola il movimento parallax
      // Quando l'elemento è fuori vista in alto: movimento negativo (verso l'alto)
      // Quando l'elemento è al centro: movimento 0
      // Quando l'elemento è fuori vista in basso: movimento positivo (verso il basso)
      const parallaxY = (scrollProgress - 0.5) * CONFIG.parallaxIntensity;

      // Applica il transform per il parallax
      element.style.transform = `translate3d(0px, ${parallaxY}px, 0px)`;
    }

    /**
     * Richiesta di animazione throttled per performance
     */
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }

    // Event listener per lo scroll (passive per performance)
    window.addEventListener('scroll', requestTick, { passive: true });

    // Event listener per il resize
    window.addEventListener('resize', requestTick, { passive: true });

    // Esegui una volta all'inizio per impostare lo stato iniziale
    onScroll();
  }

  /**
   * Inizializza quando il DOM è pronto
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedBgImage);
  } else {
    initAnimatedBgImage();
  }

})();
