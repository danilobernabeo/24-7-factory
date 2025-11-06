// ANIMAZIONE IMMAGINE BACKGROUND - Effetto Parallax + Espansione Fluida
// L'espansione avviene tramite CSS transition (fluida e indipendente dallo scroll)
// Il parallax continua sempre in tempo reale
(function() {
  'use strict';

  /**
   * Configurazione dell'animazione
   */
  const CONFIG = {
    // Punto di trigger per l'espansione (quando l'immagine è visibile al 50%)
    expansionTrigger: 0.5,

    // Intensità dell'effetto parallax (movimento verticale in px)
    // Range totale: da -100px a +100px
    parallaxIntensity: 100,

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
        // Calcola quanto l'immagine è visibile nella viewport
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;

        // Calcola la porzione visibile dell'elemento
        const visibleTop = Math.max(0, Math.min(elementHeight, windowHeight - elementTop));
        const visibleBottom = Math.max(0, Math.min(elementHeight, elementBottom));
        const visibleHeight = Math.min(visibleTop, visibleBottom);

        // Percentuale di visibilità (0 = non visibile, 1 = completamente visibile)
        const visibilityRatio = visibleHeight / elementHeight;

        if (CONFIG.debug && visibilityRatio > 0 && visibilityRatio < 1) {
          console.log(`👁️ Visibilità immagine: ${(visibilityRatio * 100).toFixed(1)}%`);
        }

        // Se l'immagine è visibile al 50% o più, espandi
        if (visibilityRatio >= CONFIG.expansionTrigger) {
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
      // Calcola la posizione dell'elemento rispetto al centro della viewport
      const elementCenter = rect.top + (rect.height / 2);
      const viewportCenter = windowHeight / 2;

      // Distanza dal centro della viewport (in px)
      const distanceFromCenter = elementCenter - viewportCenter;

      // Calcola il movimento parallax basato sulla distanza
      // Quando l'elemento è sopra il centro: movimento negativo (verso l'alto)
      // Quando l'elemento è sotto il centro: movimento positivo (verso il basso)
      // Range normalizzato: -1 a +1
      const normalizedDistance = distanceFromCenter / (windowHeight / 2);

      // Applica l'intensità del parallax
      const parallaxY = normalizedDistance * CONFIG.parallaxIntensity;

      if (CONFIG.debug && Math.abs(parallaxY) > 0 && Math.abs(parallaxY) < CONFIG.parallaxIntensity) {
        console.log(`🎨 Parallax Y: ${parallaxY.toFixed(1)}px`);
      }

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
