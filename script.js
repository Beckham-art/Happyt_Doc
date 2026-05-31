/**
 * ¡Feliz Cumpleaños Dr. Romel!
 * Lógica interactiva y motor de partículas Canvas (Confeti)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTOS DEL DOM ---
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainCard = document.getElementById('main-card');
  const btnSurprise = document.getElementById('btn-surprise');
  const btnMoreConfetti = document.getElementById('btn-more-confetti');
  const btnBack = document.getElementById('btn-back');
  const doseButtons = document.querySelectorAll('.btn-dose');
  const signaturesScreen = document.getElementById('signatures-screen');
  const btnSignatures = document.getElementById('btn-signatures');
  const btnBackToCard = document.getElementById('btn-back-to-card');

  // --- CONFIGURACIÓN DEL CANVAS Y MOTOR DE PARTÍCULAS ---
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let animationId = null;
  let isLoopActive = false;

  // Paleta de colores para confeti
  const COLOR_PALETTES = {
    gold: ['#D4AF37', '#FFD700', '#FFE066', '#AA8B1B', '#FFFDF0'],
    happiness: ['#FFD700', '#FF6B6B', '#FF8E8E', '#FFE066', '#FFA8A8'],
    health: ['#2ECC71', '#A3E4D7', '#48C9B0', '#117A65', '#D4EFDF'],
    rest: ['#5DADE2', '#AED6F1', '#3498DB', '#1B4F72', '#EBF5FB'],
    fun: ['#E74C3C', '#9B59B6', '#F1C40F', '#1ABC9C', '#E67E22', '#FFD700'],
    default: ['#D4AF37', '#FFD700', '#FFE066', '#FFFFFF', '#3498DB', '#2ECC71']
  };

  // Ajustar tamaño del Canvas a la ventana completa
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Clase de Partícula de Confeti con física realista
  class ConfettiParticle {
    constructor(x, y, palette = 'default', directionAngle = null) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 6; // Tamaño variable
      
      // Selección de color según la paleta
      const colors = COLOR_PALETTES[palette] || COLOR_PALETTES.default;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      
      // Velocidad inicial y ángulo
      const angle = directionAngle !== null ? directionAngle : Math.random() * Math.PI * 2;
      const speed = Math.random() * (directionAngle !== null ? 15 : 6) + (directionAngle !== null ? 5 : 2);
      
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - (directionAngle !== null ? 4 : 2); // Ligera inclinación inicial hacia arriba
      
      // Parámetros de física de aire y bamboleo
      this.gravity = 0.22;
      this.drag = 0.96;
      this.wobble = Math.random() * 10;
      this.wobbleSpeed = Math.random() * 0.1 + 0.05;
      
      // Rotación en 3D
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 6 - 3;
      
      // Opacidad y envejecimiento
      this.opacity = 1;
      this.fadeSpeed = Math.random() * 0.01 + 0.006;
      this.shape = Math.random() > 0.4 ? 'rect' : 'circle'; // Combinación de formas
    }

    update() {
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.vy += this.gravity;
      
      this.x += this.vx;
      this.y += this.vy;
      
      this.rotation += this.rotationSpeed;
      this.wobble += this.wobbleSpeed;
      
      // Agrega efecto de bamboleo horizontal en la caída
      this.x += Math.sin(this.wobble) * 0.5;
      
      // Desvanecimiento suave
      this.opacity -= this.fadeSpeed;
      
      // Retorna si la partícula sigue activa
      return this.opacity > 0 && this.y < canvas.height + 20 && this.x > -20 && this.x < canvas.width + 20;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      if (this.shape === 'rect') {
        // Efecto 3D de volteo (modificando la altura según la rotación)
        const scaleY = Math.cos(this.wobble);
        ctx.fillRect(-this.size / 2, (-this.size * scaleY) / 2, this.size, this.size * scaleY);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Lanzamiento circular (Explosión) de confeti
  function createBurst(x, y, count = 50, palette = 'default') {
    for (let i = 0; i < count; i++) {
      particles.push(new ConfettiParticle(x, y, palette));
    }
    startLoop();
  }

  // Lanzamiento direccional (como fuegos artificiales de lado)
  function createDirectionalBurst(x, y, angle, count = 40, palette = 'default') {
    for (let i = 0; i < count; i++) {
      // Ángulo con ligera dispersión aleatoria (+/- 20 grados)
      const dispersedAngle = angle + (Math.random() * 0.4 - 0.2);
      particles.push(new ConfettiParticle(x, y, palette, dispersedAngle));
    }
    startLoop();
  }

  // Lluvia constante desde arriba
  function createRain(count = 5, palette = 'default') {
    for (let i = 0; i < count; i++) {
      const rx = Math.random() * canvas.width;
      const ry = -20;
      const p = new ConfettiParticle(rx, ry, palette);
      p.vy = Math.random() * 2 + 1; // Velocidad de caída constante
      p.vx = Math.random() * 2 - 1;
      particles.push(p);
    }
    startLoop();
  }

  // Ciclo principal de animación de Canvas
  function animationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Filtrar y actualizar partículas activas
    particles = particles.filter(p => {
      const active = p.update();
      if (active) p.draw();
      return active;
    });

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animationLoop);
    } else {
      isLoopActive = false;
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Iniciar bucle de animación si no está activo
  function startLoop() {
    if (!isLoopActive) {
      isLoopActive = true;
      animationLoop();
    }
  }

  // --- TRANSICIONES Y NAVEGACIÓN SPA ---

  // Botón "Ver Sorpresa" (Revelar Tarjeta)
  btnSurprise.addEventListener('click', () => {
    // 1. Animación de salida para la pantalla de bienvenida
    welcomeScreen.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(0.92) translateY(-20px)';

    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      
      // 2. Preparar y mostrar la tarjeta principal
      mainCard.style.display = 'block';
      
      // Forzar reflujo del navegador para registrar el cambio de display
      mainCard.offsetHeight; 
      
      // Añadir clases para iniciar la transición CSS suave de entrada
      mainCard.classList.add('active');
      
      setTimeout(() => {
        mainCard.classList.add('visible');
        
        // 3. Estallido triple masivo de confeti festivo
        const w = canvas.width;
        const h = canvas.height;
        
        // Estallido izquierdo hacia el centro
        createDirectionalBurst(0, h * 0.7, -Math.PI / 6, 60, 'gold');
        // Estallido derecho hacia el centro
        createDirectionalBurst(w, h * 0.7, -Math.PI * 5 / 6, 60, 'gold');
        // Explosión central
        setTimeout(() => {
          createBurst(w / 2, h * 0.45, 80, 'fun');
        }, 300);
        
      }, 50);
    }, 500);
  });

  // Botón "Volver" (Regresar a Portada)
  btnBack.addEventListener('click', () => {
    // Animación de salida de la tarjeta principal
    mainCard.classList.remove('visible');
    
    setTimeout(() => {
      mainCard.classList.remove('active');
      mainCard.style.display = 'none';
      
      // Restaurar pantalla de bienvenida
      welcomeScreen.style.display = 'block';
      welcomeScreen.offsetHeight; // Forzar reflujo
      
      welcomeScreen.style.opacity = '1';
      welcomeScreen.style.transform = 'scale(1) translateY(0)';
      
      // Pequeño estallido de bienvenida
      createBurst(canvas.width / 2, canvas.height * 0.4, 25, 'gold');
    }, 500);
  });

  // Botón de Confeti Adicional
  btnMoreConfetti.addEventListener('click', (e) => {
    // Detonar un estallido en el punto del cursor o en el centro
    const rect = btnMoreConfetti.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createBurst(x, y, 70, 'fun');
    
    // Y un par de estallidos laterales sorpresa
    createDirectionalBurst(0, canvas.height * 0.8, -Math.PI / 4, 30, 'gold');
    createDirectionalBurst(canvas.width, canvas.height * 0.8, -Math.PI * 3 / 4, 30, 'gold');
  });

  // Botón "Ver Dedicatoria" (Navegar a Pantalla 3)
  btnSignatures.addEventListener('click', () => {
    // Animación de salida de la tarjeta principal
    mainCard.classList.remove('visible');
    
    setTimeout(() => {
      mainCard.classList.remove('active');
      mainCard.style.display = 'none';
      
      // Mostrar pantalla de firmas
      signaturesScreen.style.display = 'block';
      signaturesScreen.offsetHeight; // Forzar reflujo
      
      signaturesScreen.classList.add('active');
      
      setTimeout(() => {
        signaturesScreen.classList.add('visible');
        // Estallido de confeti dorado para conmemorar
        createBurst(canvas.width / 2, canvas.height * 0.5, 60, 'gold');
      }, 50);
    }, 500);
  });

  // Botón "Volver a la Tarjeta"
  btnBackToCard.addEventListener('click', () => {
    // Animación de salida de la pantalla de firmas
    signaturesScreen.classList.remove('visible');
    
    setTimeout(() => {
      signaturesScreen.classList.remove('active');
      signaturesScreen.style.display = 'none';
      
      // Volver a la tarjeta principal
      mainCard.style.display = 'block';
      mainCard.offsetHeight; // Forzar reflujo
      
      mainCard.classList.add('active');
      
      setTimeout(() => {
        mainCard.classList.add('visible');
      }, 50);
    }, 500);
  });

  // --- INTERACCIÓN DE LA SENTENCIA DE LA FELICIDAD (§) ---
  
  doseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('taken')) return; // Ya ejecutada
  
      const doseType = button.getAttribute('data-dose');
      
      // Obtener la posición del botón para la animación
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Cambiar estado visual del botón
      button.classList.add('taken');
      button.textContent = '✓ Ejecutada';
      button.setAttribute('aria-label', `Sentencia de ${doseType} ejecutada correctamente`);
  
      // Detonar una explosión festiva de confeti de colores específicos para esa sentencia
      createBurst(x, y, 35, doseType);
      
      // Si todas las sentencias se han ejecutado, regalar un megaburst de confeti y abrir dedicatoria sorpresa
      const allTaken = Array.from(doseButtons).every(btn => btn.classList.contains('taken'));
      if (allTaken) {
        setTimeout(() => {
          createBurst(canvas.width / 2, canvas.height * 0.5, 120, 'fun');
          
          // Lluvia constante durante 4 segundos para celebrar
          const rainInterval = setInterval(() => {
            createRain(6, 'gold');
          }, 150);
          
          setTimeout(() => {
            clearInterval(rainInterval);
          }, 4000);
          
          // Transición automática sorpresa a la pantalla de dedicatoria de honor
          setTimeout(() => {
            if (signaturesScreen.style.display !== 'block' && mainCard.classList.contains('visible')) {
              btnSignatures.click();
            }
          }, 3500);
          
        }, 800);
      }
    });
  });

  // --- INICIACIÓN AUTOMÁTICA GENTIL ---
  // Iniciar una suave lluvia dorada de fondo al cargar
  const initialRain = setInterval(() => {
    if (welcomeScreen.style.display !== 'none') {
      createRain(2, 'gold');
    } else {
      clearInterval(initialRain);
    }
  }, 1000);
});
