const Layout = {
  navbar: `
    <nav class="bg-white shadow-md sticky top-0 z-50" aria-label="Menú principal de navegación">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-3">
            <img src="../vista/images/logo_trans.png" alt="Logo ViuActiu" class="h-auto w-28 object-contain">
          </a>
          <!-- Botón Hamburguesa (solo móviles) -->
          <button id="menu-toggle" class="md:hidden text-gray-600 focus:outline-none" aria-label="Menú de navegación">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <!-- Links (desktop) -->
          <div class="hidden md:flex gap-6">
            <a href="../index.html" class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2"
              aria-current="page" data-i18n="nav_inicio">Inici</a>
            <a href="serveis.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2"
              data-i18n="nav_servicios">Serveis de dependència</a>
            <a href="ajuts.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2"
              data-i18n="nav_ayudas">Ajuts públics</a>
            <a href="solitud.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2" 
              data-page="soledad" data-i18n="nav_soledad">Solitud</a>
          </div>
        </div>
        <!-- Links (mobile) -->
        <div id="mobile-menu" class="hidden flex-col gap-4 pb-4 md:hidden">
          <a href="index.html" class="block text-lg font-bold text-blue-600" data-i18n="nav_inicio">Inici</a>
          <a href="serveis.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
            data-i18n="nav_servicios">Serveis de dependència</a>
          <a href="ajuts.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
            data-i18n="nav_ayudas">Ajuts públics</a>
          <a href="solitud.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
            data-i18n="nav_soledad">Solitud</a>
        </div>
      </div>
    </nav>
  `,

  footer: `
    <footer class="bg-gray-800 text-white py-8 mt-12" aria-label="Peu de pàgina">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-6 text-center md:text-left">
          <!-- Sobre ViuActiu -->
          <div>
            <h3 class="text-xl font-bold mb-3"><a href="../index.html" class="hover:text-white">ViuActiu</a></h3>
            <p class="text-base text-gray-300" data-i18n="footer_desc">Recursos i ajuts per a l'envelliment saludable a Catalunya</p>
          </div>
          <!-- Enllaços -->
          <div>
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_sitemap">Mapa de la web</h3>
            <ul class="space-y-2 text-base text-gray-300">
              <li><a href="../index.html" class="hover:text-white" data-i18n="nav_inicio">Inici</a></li>
              <li><a href="vista/serveis.html" class="hover:text-white" data-i18n="nav_servicios">Serveis de dependència</a></li>
              <li><a href="vista/ajuts.html" class="hover:text-white" data-i18n="nav_ayudas">Ajuts públics</a></li>
              <li><a href="vista/solitud.html" class="hover:text-white" data-i18n="nav_soledad">Solitud</a></li>
            </ul>
          </div>
          <!-- Recursos útils -->
          <div> 
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_recursos">Recursos útils</h3>
            <ul class="space-y-2 text-base text-gray-300">
              <li><a href="https://creuroja.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_cruz_roja">Creu Roja</a></li>
              <li><a href="https://telefonodelaesperanza.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_telefono">Telèfon de l'Esperança</a></li>
              <li><a href="https://gencat.cat/ca/temes/salut" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_aulas">Aules de la Gent Gran - Generalitat</a></li>
              <li><a href="https://fundacionlacaixa.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_caixa">Obra Social "la Caixa"</a></li>
              <li><a href="https://amicsdelagentgran.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_amics">Amics de la Gent Gran</a></li>
            </ul>
          </div>
          <!-- Fonts de dades -->
          <div>
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_fuentes">Fonts de dades</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><a href="https://web.gencat.cat/ca/inici" target="_blank" rel="noopener" class="hover:text-white">Generalitat de Catalunya</a></li>
              <li><a href="https://www.diba.cat/" target="_blank" rel="noopener" class="hover:text-white">Diputació de Barcelona</a></li>
              <li><a href="https://www.cis.es/cis/opencms/ES/index.html" target="_blank" rel="noopener" class="hover:text-white">Centro de Investigaciones Sociológicas</a></li>
              <li><a href="https://opendata.gencat.cat" target="_blank" rel="noopener" class="hover:text-white">OpenData Catalunya</a></li>
            </ul>
          </div>
        </div>
        <!-- Crèdits -->
        <div class="border-t border-gray-700 mt-6 pt-6 text-center">
          <p class="text-base text-gray-400">© 2025 ViuActiu - <span data-i18n="footer_datos_abiertos">Dades obertes oficials</span></p>
          <p class="text-sm text-gray-500 mt-2" id="footer-study">
            <span data-i18n="footer_fuente">Font</span>: Generalitat de Catalunya, Diputació de Barcelona, CIS, OpenData
          </p>
        </div>
      </div>
    </footer>
  `,

  accessibilityToolbar: `
    <style>
      #accessibility-toolbar {
        position: fixed;
        bottom: 3.5rem;
        left: 1rem;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 0.5rem;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        max-width: 320px;
        display: none; /* Oculto inicialmente */
      }
      #accessibility-toolbar p {
        margin: 0 0 0.5rem 0;
        font-weight: bold;
      }
      #accessibility-toolbar button {
        margin: 0 0.3rem 0.3rem 0;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
      }
      .underline-links a {
        text-decoration: underline !important;
      }
      .readable-font {
        font-family: Verdana, Geneva, Tahoma, sans-serif !important;
      }
      #accessibility-toggle-btn {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        z-index: 10000;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
      }
      #accessibility-toggle-btn:focus {
        outline: 2px solid #fdd801;
        outline-offset: 2px;
      }
    </style>

    <button id="accessibility-toggle-btn" aria-label="Abrir herramientas de accesibilidad" aria-expanded="false" aria-controls="accessibility-toolbar" title="Accesibilidad">
      <span aria-hidden="true">♿</span>
    </button>

    <div id="accessibility-toolbar" role="region" aria-label="Herramientas de accesibilidad">
      <p>Herramientas de accesibilidad</p>
      <button id="increase-font" aria-label="Aumentar tamaño del texto">A+</button>
      <button id="decrease-font" aria-label="Disminuir tamaño del texto">A-</button>
      <br />
      <button id="color-normal" aria-pressed="true">Normal</button>
      <button id="color-grayscale" aria-pressed="false">Escala de grises</button>
      <button id="color-highcontrast" aria-pressed="false">Alto contraste</button>
      <button id="color-negative" aria-pressed="false">Contraste negativo</button>
      <br />
      <button id="toggle-underline" aria-pressed="false">Subrayar links</button>
      <button id="toggle-readable" aria-pressed="false">Fuente legible</button>
      <br />
      <button id="reset-settings" aria-label="Restablecer configuraciones">Restablecer</button>
    </div>
  `,

  init() {
    // Insertar navbar
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = this.navbar;

      const toggleBtn = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      }
    }

    // Insertar footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      footerContainer.innerHTML = this.footer;
    }

    // Insertar barra accesibilidad y botón toggle al final del body
    document.body.insertAdjacentHTML('beforeend', this.accessibilityToolbar);

    // Inicializar funcionalidad accesibilidad
    this.initAccessibilityToolbar();

    // Traducciones si aplica
    if (typeof translatePage === 'function') {
      setTimeout(() => {
        translatePage();
      }, 50);
    }
  },

  initAccessibilityToolbar() {
    const root = document.documentElement;
    let fontSize = 100;
    let colorScheme = 'normal';
    let underlineLinks = false;
    let readableFont = false;

    const btnIncrease = document.getElementById('increase-font');
    const btnDecrease = document.getElementById('decrease-font');
    const btnNormal = document.getElementById('color-normal');
    const btnGrayscale = document.getElementById('color-grayscale');
    const btnHighContrast = document.getElementById('color-highcontrast');
    const btnNegative = document.getElementById('color-negative');
    const btnUnderline = document.getElementById('toggle-underline');
    const btnReadable = document.getElementById('toggle-readable');
    const btnReset = document.getElementById('reset-settings');

    const toolbar = document.getElementById('accessibility-toolbar');
    const toggleBtn = document.getElementById('accessibility-toggle-btn');

    function applySettings() {
      root.style.fontSize = fontSize + '%';

      root.style.filter = '';
      root.classList.remove('underline-links', 'readable-font');

      [btnNormal, btnGrayscale, btnHighContrast, btnNegative].forEach(btn => btn.setAttribute('aria-pressed', 'false'));

      switch (colorScheme) {
        case 'grayscale':
          root.style.filter = 'grayscale(100%)';
          btnGrayscale.setAttribute('aria-pressed', 'true');
          break;
        case 'highContrast':
          root.style.filter = 'contrast(200%)';
          btnHighContrast.setAttribute('aria-pressed', 'true');
          break;
        case 'negativeContrast':
          root.style.filter = 'invert(100%)';
          btnNegative.setAttribute('aria-pressed', 'true');
          break;
        default:
          btnNormal.setAttribute('aria-pressed', 'true');
          break;
      }

      if (underlineLinks) {
        root.classList.add('underline-links');
        btnUnderline.setAttribute('aria-pressed', 'true');
      } else {
        btnUnderline.setAttribute('aria-pressed', 'false');
      }

      if (readableFont) {
        root.classList.add('readable-font');
        btnReadable.setAttribute('aria-pressed', 'true');
      } else {
        btnReadable.setAttribute('aria-pressed', 'false');
      }
    }

    btnIncrease.addEventListener('click', () => {
      fontSize = Math.min(fontSize + 10, 200);
      applySettings();
    });

    btnDecrease.addEventListener('click', () => {
      fontSize = Math.max(fontSize - 10, 50);
      applySettings();
    });

    btnNormal.addEventListener('click', () => {
      colorScheme = 'normal';
      applySettings();
    });

    btnGrayscale.addEventListener('click', () => {
      colorScheme = 'grayscale';
      applySettings();
    });

    btnHighContrast.addEventListener('click', () => {
      colorScheme = 'highContrast';
      applySettings();
    });

    btnNegative.addEventListener('click', () => {
      colorScheme = 'negativeContrast';
      applySettings();
    });

    btnUnderline.addEventListener('click', () => {
      underlineLinks = !underlineLinks;
      applySettings();
    });

    btnReadable.addEventListener('click', () => {
      readableFont = !readableFont;
      applySettings();
    });

    btnReset.addEventListener('click', () => {
      fontSize = 100;
      colorScheme = 'normal';
      underlineLinks = false;
      readableFont = false;
      applySettings();
    });

    toggleBtn.addEventListener('click', () => {
      const isVisible = toolbar.style.display === 'block';
      if (isVisible) {
        toolbar.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Abrir herramientas de accesibilidad');
      } else {
        toolbar.style.display = 'block';
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Cerrar herramientas de accesibilidad');
      }
    });

    applySettings();
  },

};

document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});
