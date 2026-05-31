# ¡Feliz Cumpleaños, Dr. Romel! ✦ Tarjeta Digital Interactiva

Una aplicación web de página única (Single Page Application) elegante, responsiva y altamente interactiva desarrollada como una tarjeta de cumpleaños digital personalizada para el **Dr. Romel**, en reconocimiento a su labor como **Doctor en Derecho** y líder de la **Academia ALBA PERÚ**.

---

## 📸 Captura de Portada
El sobre digital cuenta con un diseño minimalista y de lujo, presentando la fotografía real del homenajeado en un medallón con un marco dorado brillante y un sutil efecto de flotación.

---

## ✨ Características Principales

*   **Diseño Mobile-First Responsivo:** Estructurado con Flexbox y CSS Grid moderno para adaptarse a pantallas de teléfonos móviles, tabletas y computadoras de escritorio.
*   **Estética Premium y Glassmorphism:** Interfaz elegante con fondo azul marino profundo (`#0A192F`), textos blancos sedosos y detalles en gradientes dorados metálicos, acompañados de contenedores con desenfoques de fondo (`backdrop-filter: blur`).
*   **Sentencia Interactiva de la Felicidad (§):** En lugar de una felicitación tradicional, el panel derecho emula un veredicto del *Tribunal Supremo de la Vida* con cuatro artículos (penas) que el usuario debe ejecutar haciendo clic:
    *   **Art. 1:** Felicidad Absoluta (Pena: Disfrutar sin recurso ni apelación).
    *   **Art. 2:** Salud Inquebrantable (Pena: Vitalidad y vigor en toda instancia).
    *   **Art. 3:** Descanso Obligatorio (Pena: Prisión domiciliaria en relax absoluto).
    *   **Art. 4:** Festejo e Integración (Pena: 1 rebanada de diversión con pastel).
*   **Física Realista de Confeti (HTML5 Canvas):** Motor de partículas 2D de alto rendimiento programado en Vanilla JavaScript puro, con simulación de gravedad, resistencia al viento, bamboleo lateral y rotación en 3D.
*   **Optimización de Recursos:** El bucle de renderizado del confeti (`requestAnimationFrame`) se suspende automáticamente cuando no hay partículas activas para no consumir memoria ni CPU del dispositivo.
*   **Dedicatoria Especial y Avatares de Honor:** Al ejecutar todas las sentencias de la tarjeta, se inicia una megacelebración que redirige automáticamente al usuario a una pantalla final de dedicatoria. Allí se muestra un sello de reconocimiento de la **Academia ALBA PERÚ** y las firmas con retratos interactivos de sus más fieles colaboradores:
    *   **Beckham** (El Tutor Más Fiel).
    *   **Marvic** (La Coordinadora Más Chambeadora).

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Estructura semántica completa para una óptima accesibilidad e indexación.
*   **CSS3 Moderno:** Variables nativas, efectos de desenfoque de vidrio (Glassmorphism), transiciones aceleradas por hardware y animaciones por fotogramas clave (`keyframes`). Sin dependencias de frameworks externos pesados.
*   **Vanilla JavaScript (ES6+):** Programación orientada a objetos en el navegador para físicas de partículas en Canvas y ruteo dinámico de vistas SPA.
*   **Fuentes Tipográficas (Google Fonts):**
    *   `Playfair Display`: Tipografía serif sofisticada para títulos y términos judiciales.
    *   `Inter`: Fuente sans-serif de alta legibilidad para el cuerpo de los textos.
    *   `Alex Brush`: Fuente manuscrita para firmas y dedicatorias de estilo caligráfico.

---

## 🚀 Instalación y Uso Local

Dado que el proyecto utiliza Vanilla JavaScript y recursos estáticos, puedes ejecutarlo localmente de forma inmediata:

### Opción 1: Abrir directamente
1. Descarga o clona el repositorio.
2. Haz doble clic en el archivo `index.html` para abrir la aplicación en tu navegador web.

### Opción 2: Servidor local ligero (Recomendado para evitar bloqueos CORS en navegadores estrictos)
Si usas Python en tu sistema:
```bash
# Navega al directorio del proyecto
cd Happy_Doc

# Inicia el servidor
python -m http.server 8080
```
Luego, abre tu navegador en `http://localhost:8080/`.

Si usas Node.js:
```bash
npm install -g http-server
http-server -p 8080
```

---

## 🌐 Despliegue en la Web
Este proyecto se puede desplegar gratuitamente en cuestión de segundos:
*   **GitHub Pages:** Ve a la pestaña *Settings* de tu repositorio en GitHub, dirígete a *Pages*, selecciona la rama principal (`main`/`master`) y haz clic en guardar.
*   **Vercel / Netlify:** Importa el repositorio directamente desde tu panel de control para un despliegue estático automatizado.

---

## 👥 Creadores y Dedicatoria
Proyecto desarrollado con aprecio para celebrar el aniversario del Dr. Romel por:
*   **Beckham** — *El Tutor Más Fiel*
*   **Marvic** — *La Coordinadora Más Chambeadora*
*   **Academia ALBA PERÚ**
