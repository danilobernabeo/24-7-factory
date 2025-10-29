// ANIMAZIONE IMMAGINE BACKGROUND - Effetto Parallax + Espansione
// Ricrea l'effetto originale di Webflow senza dipendenze
(function() {
  'use strict';

  /**
   * Configurazione dell'animazione
   */
  const CONFIG = {
    // Altezza iniziale dell'immagine (formato quadrato: circa 100vw)
    initialHeightVh: 100,
    // Altezza finale dell'immagine (formato allargato: 120vh)
    finalHeightVh: 120,
    // Punto di inizio dell'animazione (quando l'elemento inizia a entrare nella viewport)
    startThreshold: 0,
    // Punto di fine dell'animazione (quando l'elemento è al centro della viewport)
    endThreshold: 0.6,
    // Intensità dell'effetto parallax (movimento verticale in %)
    parallaxIntensity: 16.326, // Valore originale da Webflow
    // Easing per l'animazione
    easingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    // Debug mode
    debug: true
  };

  /**
   * Funzione di easing per creare transizioni smooth
   * @param {number} t - Progresso normalizzato (0-1)
   * @returns {number} - Valore eased
   */
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Calcola il progresso dello scroll per un elemento
   * @param {DOMRect} rect - Bounding rect dell'elemento
   * @param {number} windowHeight - Altezza della finestra
   * @returns {number} - Progresso normalizzato (0-1)
   */
  function calculateScrollProgress(rect, windowHeight) {
    // Calcola quando l'elemento entra nella viewport
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Posizione dell'elemento rispetto alla viewport
    // 0 = top della viewport, 1 = bottom della viewport
    const viewportProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);

    // Mappa il progresso tra startThreshold e endThreshold
    const normalizedProgress = (viewportProgress - CONFIG.startThreshold) /
                                (CONFIG.endThreshold - CONFIG.startThreshold);

    // Clamp tra 0 e 1
    return Math.max(0, Math.min(1, normalizedProgress));
  }

  /**
   * Applica l'animazione all'immagine
   * @param {HTMLElement} element - Elemento da animare
   * @param {number} scrollProgress - Progresso dello scroll (0-1)
   */
  function applyAnimation(element, scrollProgress) {
    // Applica easing per una transizione smooth
    const easedProgress = easeInOutCubic(scrollProgress);

    // Calcola l'altezza interpolata
    const currentHeightVh = CONFIG.initialHeightVh +
                            (CONFIG.finalHeightVh - CONFIG.initialHeightVh) * easedProgress;

    // Calcola il movimento parallax (da +parallaxIntensity% a 0%)
    // Quando progress = 0, parallax = +20% (immagine spostata in basso)
    // Quando progress = 1, parallax = 0% (immagine centrata)
    const parallaxY = CONFIG.parallaxIntensity * (1 - easedProgress);

    // Applica le trasformazioni con !important per sovrascrivere il CSS
    element.style.setProperty('height', `${currentHeightVh}vh`, 'important');
    element.style.setProperty('min-height', `${currentHeightVh}vh`, 'important');
    element.style.setProperty('max-height', `${currentHeightVh}vh`, 'important');
    element.style.setProperty('transform', `translate3d(0px, ${parallaxY}%, 0px)`, 'important');
    element.style.setProperty('will-change', 'transform, height');
  }

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

    // Stato iniziale
    let ticking = false;

    /**
     * Funzione di update che viene chiamata durante lo scroll
     */
    function updateAnimation() {
      const rect = animatedImage.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcola il progresso
      const scrollProgress = calculateScrollProgress(rect, windowHeight);

      // Debug logging
      if (CONFIG.debug && scrollProgress > 0 && scrollProgress < 1) {
        console.log(`📊 Progress: ${(scrollProgress * 100).toFixed(1)}% | Top: ${rect.top.toFixed(0)}px`);
      }

      // Applica l'animazione
      applyAnimation(animatedImage, scrollProgress);

      // Reset ticking flag
      ticking = false;
    }

    /**
     * Richiesta di animazione throttled per performance
     */
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateAnimation);
        ticking = true;
      }
    }

    // Event listener per lo scroll (passive per performance)
    window.addEventListener('scroll', requestTick, { passive: true });

    // Event listener per il resize
    window.addEventListener('resize', requestTick, { passive: true });

    // Esegui una volta all'inizio per impostare lo stato iniziale
    updateAnimation();
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
