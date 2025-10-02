// layout.js - Sistema de Layout modular

const Layout = {
  // Template del Navbar con menú hamburguesa
  navbar: `
    <nav class="bg-white shadow-md sticky top-0 z-50" aria-label="Menú principal de navegació">
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
              aria-current="page">Inici</a>
            <a href="serveis.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2">
              Serveis de dependència</a>
            <a href="ajuts.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2">
              Ajuts públics</a>
            <a href="solitud.html" class="text-2xl font-semibold text-gray-600 hover:text-blue-600 pb-2" data-page="soledad">Solitud</a>
                </div>
       
          </div>
        </div>

        <!-- Links (mobile) -->
        <div id="mobile-menu" class="hidden flex-col gap-4 pb-4 md:hidden">
          <a href="index.html" class="block text-lg font-bold text-blue-600">Inici</a>
          <a href="serveis.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600">
            Serveis de dependència</a>
          <a href="ajuts.html" class="block text-lg font-semibold text-gray-600 hover:text-blue-600">
            Ajuts públics</a>
          <a href="solitud.html" lass="block text-lg font-semibold text-gray-600 hover:text-blue-600">Solitud</a>
                </div>
        </div>
      </div>
    </nav>
  `,

  // Template del Footer
  footer: `
   <footer class="bg-gray-800 text-white py-8 mt-12" aria-label="Peu de pàgina">
  <div class="container mx-auto px-4">
    <div class="grid md:grid-cols-4 gap-6 text-center md:text-left">

      <!-- Sobre ViuActiu -->
      <div>
        <h3 class="text-xl font-bold mb-3"><a href="../index.html" class="hover:text-white">ViuActiu</a></h3>
        <p class="text-base text-gray-300">Recursos i ajuts per a l'envelliment saludable a Catalunya</p>
      </div>

      <!-- Enllaços -->
      <div>
        <h3 class="text-xl font-bold mb-3">Mapa de la web</h3>
        <ul class="space-y-2 text-base text-gray-300">
          <li><a href="../index.html" class="hover:text-white">Inici</a></li>
          <li><a href="vista/ajuts.html" class="hover:text-white">Serveis de dependència</a></li>
          <li><a href="vista/ajuts.html" class="hover:text-white">Ajuts públics</a></li>
          <li><a href="vista/ajuts.html" class="hover:text-white">Solitud</a></li>
        </ul>
      </div>

      <!-- Recursos útils -->
      <div> 
          <h3 class="text-xl font-bold mb-3">Recursos útils</h3>
          <ul class="space-y-2 text-base text-gray-300">
          <li><a href="https://creuroja.org" class="hover:text-white" target="_blank" rel="noopener">Creu Roja</a></li>
          <li><a href="https://telefonodelaesperanza.org" class="hover:text-white" target="_blank" rel="noopener">Telèfon de l'Esperança</a></li>
          <li><a href="https://gencat.cat/ca/temes/salut" class="hover:text-white" target="_blank" rel="noopener">Aules de la Gent Gran - Generalitat</a></li>
          <li><a href="https://fundacionlacaixa.org" class="hover:text-white" target="_blank" rel="noopener">Obra Social "la Caixa"</a></li>
          <li><a href="https://amicsdelagentgran.org" class="hover:text-white" target="_blank" rel="noopener">Amics de la Gent Gran</a></li>
        </ul>
      </div>

      <!-- Fonts de dades -->
      <div>
        <h3 class="text-xl font-bold mb-3">Fonts de dades</h3>
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
      <p class="text-base text-gray-400">© 2025 ViuActiu - Dades obertes oficials</p>
      <p class="text-sm text-gray-500 mt-2" id="footer-study">
        Font: Generalitat de Catalunya, Diputació de Barcelona, CIS, OpenData
      </p>
    </div>
  </div>
</footer>

  `,

  // Función para inicializar el layout
  init() {
    // Insertar navbar al inicio del body
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
      navbarContainer.innerHTML = this.navbar;

      // Activar el toggle del menú móvil
      const toggleBtn = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      }
    }

    // Insertar footer al final del body
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
      footerContainer.innerHTML = this.footer;
    }
  },

  // Función alternativa para cargar el layout completo
  wrap(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
      const originalContent = content.innerHTML;
      document.body.innerHTML = `
        <div id="navbar"></div>
        <main class="min-h-screen">
          ${originalContent}
        </main>
        <div id="footer"></div>
      `;
      this.init();
    }
  }
};

// Inicializar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
});

// Exportar para uso modular (opcional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Layout;
}
