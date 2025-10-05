const Layout = {
  // Detectar si estamos en dashboard
  getBasePath() {
    const path = window.location.pathname;
    const isDashboard = path.includes('/dashboard/');
    return isDashboard ? '../../' : '../' , './';
  },

  navbar: `
 <nav class="bg-white shadow-md sticky top-0 z-50" aria-label="Menú principal de navegació">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">

        <!-- Logo -->
        <a href="#" id="logo-link" class="flex items-center gap-3">
          <img src="" id="logo-img" alt="Logo ViuActiu" class="h-auto w-28 object-contain">
        </a>

        <!-- Botón Hamburguesa (solo móviles) -->
        <button id="menu-toggle" class="md:hidden text-gray-600 focus:outline-none" aria-label="Menú de navegación">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Links (desktop) -->
        <div class="hidden md:flex gap-6 items-center">
          <a href="../index.html" class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2"
            aria-current="page" data-i18n="nav_inicio">Inici</a>
          <a href="serveis.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2"
            data-i18n="nav_servicios">
            Serveis de dependència</a>
          <a href="ajuts.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2"
            data-i18n="nav_ayudas">
            Ajuts públics</a>
          <a href="solitud.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2"
            data-page="soledad" data-i18n="nav_soledad">Solitud</a>
          
          <!-- Dropdown per Taulells -->
          <div class="relative group">
            <button id="dashboard-toggle" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2 flex items-center gap-1 focus:outline-none" aria-haspopup="true" aria-expanded="false" aria-controls="dashboard-menu" data-i18n="nav_taulells">
              Taulells
              <svg class="w-5 h-5 transition-transform" id="dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div id="dashboard-menu" class="absolute left-0 top-full mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-200 hidden" role="menu" aria-label="Menú de taulells" style="z-index: 9999;">
              <a href="presentation.html" class="block px-4 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg" role="menuitem" data-i18n="nav_presentacio">Presentació</a>
              <a href="demografic.html" class="block px-4 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem" data-i18n="nav_demografia">Demografia</a>
              <a href="centre.html" class="block px-4 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem" data-i18n="nav_centres_dia">Centres de Dia</a>
              <a href="residencies.html" class="block px-4 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600" role="menuitem" data-i18n="nav_residencies">Residències</a>
              <a href="transparency.html" class="block px-4 py-3 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 last:rounded-b-lg" role="menuitem" data-i18n="nav_transparencia">Transparència</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Links (mobile) -->
      <div id="mobile-menu" class="hidden flex-col gap-4 pb-4 px-4 md:hidden">
        <a href="index.html" class="block text-lg font-bold text-blue-600" data-i18n="nav_inicio">Inici</a>
        <a href="vista/serveis.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
          data-i18n="nav_servicios">
          Serveis de dependència</a>
        <a href="vista/ajuts.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
          data-i18n="nav_ayudas">
          Ajuts públics</a>
        <a href="vista/soledad.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600"
          data-i18n="nav_soledad">Solitud</a>
        
        <!-- Dropdown móvil per Taulells -->
        <div class="relative">
          <button id="mobile-dashboard-toggle" class="block text-lg font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1 w-full text-left focus:outline-none" aria-haspopup="true" aria-expanded="false" aria-controls="mobile-dashboard-menu" data-i18n="nav_taulells">
            Taulells
            <svg class="w-5 h-5 transition-transform" id="mobile-dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="mobile-dashboard-menu" class="hidden flex-col mt-2 pl-4" role="menu">
            <a href="./vista/dashboard/presentation.html" class="block text-base text-gray-600 hover:text-blue-600 py-2" role="menuitem" data-i18n="nav_presentacio">Presentació</a>
            <a href="./vista/dashboard/demografic.html" class="block text-base text-gray-600 hover:text-blue-600 py-2" role="menuitem" data-i18n="nav_demografia">Demografia</a>
            <a href="./vista/dashboard/centre.html" class="block text-base text-gray-600 hover:text-blue-600 py-2" role="menuitem" data-i18n="nav_centres_dia">Centres de Dia</a>
            <a href="./vista/dashboard/residencies.html" class="block text-base text-gray-600 hover:text-blue-600 py-2" role="menuitem" data-i18n="nav_residencies">Residències</a>
            <a href="./vista/dashboard/transparency.html" class="block text-base text-gray-600 hover:text-blue-600 py-2" role="menuitem" data-i18n="nav_transparencia">Transparència</a>
          </div>
        </div>
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
            <h3 class="text-xl font-bold mb-3"><a href="#" id="footer-home-link" class="hover:text-white" aria-label="Tornar a la pàgina principal de ViuActiu">ViuActiu</a></h3>
            <p class="text-base text-gray-300" data-i18n="footer_desc">Recursos i ajuts per a l'envelliment saludable a Catalunya</p>
          </div>
          <!-- Enllaços -->
          <div>
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_mapa_web">Mapa de la web</h3>
            <ul class="space-y-2 text-base text-gray-300">
              <li><a href="#" class="nav-link hover:text-white" data-page="index" data-i18n="nav_inici">Inici</a></li>
              <li><a href="#" class="nav-link hover:text-white" data-page="serveis" data-i18n="nav_serveis">Serveis de dependència</a></li>
              <li><a href="#" class="nav-link hover:text-white" data-page="ajuts" data-i18n="nav_ajuts">Ajuts públics</a></li>
              <li><a href="#" class="nav-link hover:text-white" data-page="solitud" data-i18n="nav_solitud">Solitud</a></li>
            </ul>
          </div>
          <!-- Recursos útils -->
          <div> 
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_recursos">Recursos útils</h3>
            <ul class="space-y-2 text-base text-gray-300">
              <li><a href="https://creuroja.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_creu_roja">Creu Roja</a></li>
              <li><a href="https://telefonodelaesperanza.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_telefon">Telèfon de l'Esperança</a></li>
              <li><a href="https://gencat.cat/ca/temes/salut" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_aules">Aules de la Gent Gran - Generalitat</a></li>
              <li><a href="https://fundacionlacaixa.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_caixa">Obra Social "la Caixa"</a></li>
              <li><a href="https://amicsdelagentgran.org" class="hover:text-white" target="_blank" rel="noopener" data-i18n="footer_amics">Amics de la Gent Gran</a></li>
            </ul>
          </div>
          <!-- Fonts de dades -->
          <div>
            <h3 class="text-xl font-bold mb-3" data-i18n="footer_fonts">Fonts de dades</h3>
            <ul class="space-y-2 text-sm text-gray-300">
              <li><a href="https://web.gencat.cat/ca/inici" target="_blank" rel="noopener" class="hover:text-white">Generalitat de Catalunya</a></li>
              <li><a href="https://www.diba.cat/" target="_blank" rel="noopener" class="hover:text-white">Diputació de Barcelona</a></li>
              <li><a href="https://www.cis.es/cis/opencms/ES/index.html" target="_blank" rel="noopener" class="hover:text-white">Centre d'Investigacions Sociològiques</a></li>
              <li><a href="https://opendata.gencat.cat" target="_blank" rel="noopener" class="hover:text-white">OpenData Catalunya</a></li>
            </ul>
          </div>
        </div>
        <!-- Crèdits -->
        <div class="border-t border-gray-700 mt-6 pt-6 text-center">
          <p class="text-base text-gray-400">© 2025 ViuActiu - <span data-i18n="footer_dades_oberetes">Dades obertes oficials</span></p>
          <p class="text-sm text-gray-500 mt-2" id="footer-study">
            <span data-i18n="footer_font">Font</span>: Generalitat de Catalunya, Diputació de Barcelona, CIS, OpenData
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
        display: none;
      }
      #accessibility-toolbar p {
        margin: 0 0 0.5rem 0;
        font-weight: bold;
      }
      #accessibility-toolbar button {
        margin: 0 0.3rem 0.3rem 0;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        background: #f9f9f9;
        transition: background 0.2s;
      }
      #accessibility-toolbar button:hover, #accessibility-toolbar button:focus {
        background: #e0e0e0;
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
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

    <button id="accessibility-toggle-btn" aria-label="Obrir eines d'accessibilitat" aria-expanded="false" aria-controls="accessibility-toolbar" title="Accessibilitat">
      <span aria-hidden="true">♿</span>
    </button>

    <div id="accessibility-toolbar" role="region" aria-label="Eines d'accessibilitat">
      <p>Eines d'accessibilitat</p>
      <button id="increase-font" aria-label="Augmentar la mida del text">A+</button>
      <button id="decrease-font" aria-label="Disminuir la mida del text">A-</button>
      <br />
      <button id="color-normal" aria-pressed="true">Normal</button>
      <button id="color-grayscale" aria-pressed="false">Escala de grisos</button>
      <button id="color-highcontrast" aria-pressed="false">Alt contrast</button>
      <button id="color-negative" aria-pressed="false">Contrast negatiu</button>
      <br />
      <button id="toggle-underline" aria-pressed="false">Subratllar enllaços</button>
      <button id="toggle-readable" aria-pressed="false">Font llegible</button>
      <br />
      <button id="reset-settings" aria-label="Restablir configuracions">Restablir</button>
    </div>
  `,

  updateLinks() {
    const basePath = this.getBasePath();
    const isDashboard = basePath === '../../';
    
    // Actualizar logo
    const logoLink = document.getElementById('logo-link');
    const logoImg = document.getElementById('logo-img');
    if (logoLink && logoImg) {
      logoLink.href = isDashboard ? '../../index.html' : '../index.html';
      logoImg.src = isDashboard ? '../../vista/images/logo_trans.png' : '../vista/images/logo_trans.png';
    }

    // Actualizar enlace del footer
    const footerHomeLink = document.getElementById('footer-home-link');
    if (footerHomeLink) {
      footerHomeLink.href = isDashboard ? '../../index.html' : '../index.html';
    }

    // Actualizar enlaces de navegación normales
    document.querySelectorAll('.nav-link').forEach(link => {
      const page = link.getAttribute('data-page');
      if (page === 'index') {
        link.href = isDashboard ? '../../index.html' : '../index.html';
      } else {
        link.href = isDashboard ? `../../vista/${page}.html` : `${page}.html`;
      }
    });

    // Actualizar enlaces del dropdown de dashboard
    document.querySelectorAll('.dashboard-link').forEach(link => {
      const page = link.getAttribute('data-page');
      if (isDashboard) {
        // Si ya estamos en dashboard, usar rutas relativas simples
        link.href = `./${page}.html`;
      } else {
        // Si estamos en vista, ir a vista/dashboard
        link.href = `./dashboard/${page}.html`;
      }
    });
  },

  init() {
    // Insertar navbar
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = this.navbar;

      // Actualizar todas las rutas
      this.updateLinks();

      // Inicialitzar menú hamburguesa
      const toggleBtn = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
          const isHidden = mobileMenu.classList.contains('hidden');
          mobileMenu.classList.toggle('hidden');
          toggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
      }

      // Inicialitzar menú desplegable escriptori
      const dashboardToggle = document.getElementById('dashboard-toggle');
      const dashboardMenu = document.getElementById('dashboard-menu');
      const dropdownArrow = document.getElementById('dropdown-arrow');
      
      if (dashboardToggle && dashboardMenu) {
        dashboardToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isHidden = dashboardMenu.classList.contains('hidden');
          dashboardMenu.classList.toggle('hidden');
          dashboardToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
          
          // Rotar flecha
          if (dropdownArrow) {
            dropdownArrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        });

        // Tancar el menú quan es fa clic fora
        document.addEventListener('click', (event) => {
          if (!dashboardToggle.contains(event.target) && !dashboardMenu.contains(event.target)) {
            dashboardMenu.classList.add('hidden');
            dashboardToggle.setAttribute('aria-expanded', 'false');
            if (dropdownArrow) {
              dropdownArrow.style.transform = 'rotate(0deg)';
            }
          }
        });

        // Suport per a navegació amb teclat
        dashboardMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
              dashboardMenu.classList.add('hidden');
              dashboardToggle.setAttribute('aria-expanded', 'false');
              dashboardToggle.focus();
              if (dropdownArrow) {
                dropdownArrow.style.transform = 'rotate(0deg)';
              }
            }
          });
        });
      }

      // Inicialitzar menú desplegable mòbil
      const mobileDashboardToggle = document.getElementById('mobile-dashboard-toggle');
      const mobileDashboardMenu = document.getElementById('mobile-dashboard-menu');
      if (mobileDashboardToggle && mobileDashboardMenu) {
        mobileDashboardToggle.addEventListener('click', () => {
          const isHidden = mobileDashboardMenu.classList.contains('hidden');
          mobileDashboardMenu.classList.toggle('hidden');
          mobileDashboardToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
      }
    }

    // Insertar footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      footerContainer.innerHTML = this.footer;
      // Actualizar enlaces del footer también
      this.updateLinks();
    }

    // Insertar barra d'accessibilitat i botó toggle al final del body
    document.body.insertAdjacentHTML('beforeend', this.accessibilityToolbar);

    // Inicialitzar funcionalitat d'accessibilitat
    this.initAccessibilityToolbar();

    // Traduccions si aplica
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
        toggleBtn.setAttribute('aria-label', 'Obrir eines d\'accessibilitat');
      } else {
        toolbar.style.display = 'block';
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Tancar eines d\'accessibilitat');
      }
    });

    applySettings();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});