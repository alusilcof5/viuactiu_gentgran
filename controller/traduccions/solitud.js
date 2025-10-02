// === ARCHIVO: controller/translator.js ===

// Traducciones embebidas (también puedes cargarlas desde JSON)
const translations = {
  ca: {
    // Navegación
    nav_inicio: "Inici",
    nav_servicios: "Serveis de dependència",
    nav_ayudas: "Ajuts públics",
    nav_soledad: "Solitud",
    
    // Hero
    hero_title: "Benvinguts a ViuActiu",
    hero_subtitle: "Recursos i ajuts per a l'envelliment saludable a Catalunya",
    hero_description: "Troba serveis de dependència, ajuts públics i espais de participació ciutadana amb tota la informació centralitzada.",
    
    // Cards
    card_servicios_title: "Serveis de dependència",
    card_servicios_desc: "Mapa de centres de dia i residències a Catalunya.",
    card_servicios_btn: "Veure mapa",
    card_ayudas_title: "Ajuts públics",
    card_ayudas_desc: "Explora totes les subvencions disponibles per a persones grans.",
    card_ayudas_btn: "Veure ajuts",
    
    // Sobre Mapa Viu
    sobre_title: "Sobre Mapa Viu",
    sobre_desc: "Centralitza informació sobre recursos per a l'envelliment saludable a Catalunya, utilitzant dades obertes oficials.",
    sobre_fuentes: "Fonts de dades:",
    fuente_1: "Generalitat de Catalunya: Serveis per a persones amb dependència",
    fuente_2: "Diputació de Barcelona (CIDO): Ajuts i subvencions socials",
    fuente_3: "Ajuntament de Barcelona: Espais de participació ciutadana",
    
    // Estadísticas
    stat_1_label: "Comarques cobertes",
    stat_2_label: "Ajuts disponibles",
    stat_3_label: "Dades actualitzades"
  },
  
  es: {
    // Navegación
    nav_inicio: "Inicio",
    nav_servicios: "Servicios de dependencia",
    nav_ayudas: "Ayudas públicas",
    nav_soledad: "Soledad",
    
    // Hero
    hero_title: "Bienvenidos a ViuActiu",
    hero_subtitle: "Recursos y ayudas para el envejecimiento saludable en Cataluña",
    hero_description: "Encuentra servicios de dependencia, ayudas públicas y espacios de participación ciudadana con toda la información centralizada.",
    
    // Cards
    card_servicios_title: "Servicios de dependencia",
    card_servicios_desc: "Mapa de centros de día y residencias en Cataluña.",
    card_servicios_btn: "Ver mapa",
    card_ayudas_title: "Ayudas públicas",
    card_ayudas_desc: "Explora todas las subvenciones disponibles para personas mayores.",
    card_ayudas_btn: "Ver ayudas",
    
    // Sobre Mapa Viu
    sobre_title: "Sobre Mapa Viu",
    sobre_desc: "Centraliza información sobre recursos para el envejecimiento saludable en Cataluña, utilizando datos abiertos oficiales.",
    sobre_fuentes: "Fuentes de datos:",
    fuente_1: "Generalitat de Catalunya: Servicios para personas con dependencia",
    fuente_2: "Diputación de Barcelona (CIDO): Ayudas y subvenciones sociales",
    fuente_3: "Ayuntamiento de Barcelona: Espacios de participación ciudadana",
    
    // Estadísticas
    stat_1_label: "Comarcas cubiertas",
    stat_2_label: "Ayudas disponibles",
    stat_3_label: "Datos actualizados"
  },
  
  en: {
    // Navegación
    nav_inicio: "Home",
    nav_servicios: "Dependency Services",
    nav_ayudas: "Public Aid",
    nav_soledad: "Loneliness",
    
    // Hero
    hero_title: "Welcome to ViuActiu",
    hero_subtitle: "Resources and aid for healthy aging in Catalonia",
    hero_description: "Find dependency services, public aid, and citizen participation spaces with all information centralized.",
    
    // Cards
    card_servicios_title: "Dependency Services",
    card_servicios_desc: "Map of day centers and residences in Catalonia.",
    card_servicios_btn: "View map",
    card_ayudas_title: "Public Aid",
    card_ayudas_desc: "Explore all available grants for elderly people.",
    card_ayudas_btn: "View aid",
    
    // Sobre Mapa Viu
    sobre_title: "About Mapa Viu",
    sobre_desc: "Centralizes information about resources for healthy aging in Catalonia, using official open data.",
    sobre_fuentes: "Data sources:",
    fuente_1: "Generalitat de Catalunya: Services for people with dependency",
    fuente_2: "Barcelona Provincial Council (CIDO): Social aid and grants",
    fuente_3: "Barcelona City Council: Citizen participation spaces",
    
    // Estadísticas
    stat_1_label: "Regions covered",
    stat_2_label: "Aid available",
    stat_3_label: "Updated data"
  }
};

// Configuración
let currentLang = localStorage.getItem('language') || 'ca';

// Función para cambiar idioma
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  // Actualizar botones activos
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
  
  // Traducir todos los elementos
  translatePage();
}

// Función para traducir la página
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.dataset.i18n;
    const translation = translations[currentLang][key];
    
    if (translation) {
      // Si el elemento es un input o textarea, traducir el placeholder
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Crear botones de idioma si no existen
  if (!document.querySelector('.language-switcher')) {
    createLanguageButtons();
  }
  
  // Aplicar idioma guardado
  changeLanguage(currentLang);
});

// Crear botones de idioma
function createLanguageButtons() {
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="ca" onclick="changeLanguage('ca')">
      🏴 CAT
    </button>
    <button class="lang-btn" data-lang="es" onclick="changeLanguage('es')">
      🇪🇸 ESP
    </button>
    <button class="lang-btn" data-lang="en" onclick="changeLanguage('en')">
      🇬🇧 ENG
    </button>
  `;
  
  document.body.insertBefore(switcher, document.body.firstChild);
}

// Exportar funciones para uso global
window.changeLanguage = changeLanguage;
window.translatePage = translatePage;