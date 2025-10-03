const translations = {
  ca: {
    ajuts_header_title: "Ajuts públics per a gent gran",
    ajuts_header_subtitle: "Subvencions i ajuts socials de la Diputació de Barcelona",
    ajuts_cargando: "Carregant ajuts...",
    ajuts_modal_titulo: "Detalls de l'ajut",
    ajuts_buscar_placeholder: "Cerca ajuts per títol",
    ajuts_filtro_todos_organismos: "Tots els organismes",
    ajuts_filtro_todos_tipos: "Tots els tipus",
    ajuts_filtro_todos_estados: "Tots els estats",
    hero_title: "Ajuts Viu",
    footer_desc: "Recursos i ajuts per a l'envelliment saludable a Catalunya",
    footer_sitemap: "Mapa de la web",
    footer_recursos: "Recursos útils",
    footer_cruz_roja: "Creu Roja",
    footer_telefono: "Telèfon de l'Esperança",
    footer_aulas: "Aules de la Gent Gran - Generalitat",
    footer_caixa: "Obra Social \"la Caixa\"",
    footer_amics: "Amics de la Gent Gran",
    footer_fuentes: "Fonts de dades",
    footer_datos_abiertos: "Dades obertes oficials",
    footer_fuente: "Font"
  },
  es: {
    ajuts_header_title: "Ayudas públicas para personas mayores",
    ajuts_header_subtitle: "Subvenciones y ayudas sociales de la Diputación de Barcelona",
    ajuts_cargando: "Cargando ayudas...",
    ajuts_modal_titulo: "Detalles de la ayuda",
    ajuts_buscar_placeholder: "Buscar ayudas por título",
    ajuts_filtro_todos_organismos: "Todos los organismos",
    ajuts_filtro_todos_tipos: "Todos los tipos",
    ajuts_filtro_todos_estados: "Todos los estados",
    hero_title: "Ajuts Viu",
    footer_desc: "Recursos y ayudas para el envejecimiento saludable en Cataluña",
    footer_sitemap: "Mapa del sitio",
    footer_recursos: "Recursos útiles",
    footer_cruz_roja: "Cruz Roja",
    footer_telefono: "Teléfono de la Esperanza",
    footer_aulas: "Aulas de la Gente Mayor - Generalitat",
    footer_caixa: "Obra Social \"la Caixa\"",
    footer_amics: "Amigos de la Gente Mayor",
    footer_fuentes: "Fuentes de datos",
    footer_datos_abiertos: "Datos abiertos oficiales",
    footer_fuente: "Fuente"
  },
  en: {
    ajuts_header_title: "Public aid for elderly people",
    ajuts_header_subtitle: "Grants and social aid from the Barcelona Provincial Council",
    ajuts_cargando: "Loading aid...",
    ajuts_modal_titulo: "Aid details",
    ajuts_buscar_placeholder: "Search aid by title",
    ajuts_filtro_todos_organismos: "All organizations",
    ajuts_filtro_todos_tipos: "All types",
    ajuts_filtro_todos_estados: "All statuses",
    hero_title: "Ajuts Viu",
    footer_desc: "Resources and aid for healthy aging in Catalonia",
    footer_sitemap: "Sitemap",
    footer_recursos: "Useful resources",
    footer_cruz_roja: "Red Cross",
    footer_telefono: "Hope Hotline",
    footer_aulas: "Senior Citizens Classes - Generalitat",
    footer_caixa: "\"la Caixa\" Social Foundation",
    footer_amics: "Friends of the Elderly",
    footer_fuentes: "Data sources",
    footer_datos_abiertos: "Official open data",
    footer_fuente: "Source"
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
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Traducir página
  translatePage();
}

// Traducir página
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder]');
  elements.forEach(element => {
    if (element.dataset.i18n) {
      const translation = translations[currentLang][element.dataset.i18n];
      if (translation) element.textContent = translation;
    }
    if (element.dataset.i18nPlaceholder) {
      const translation = translations[currentLang][element.dataset.i18nPlaceholder];
      if (translation) element.placeholder = translation;
    }
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  createLanguageButtons();
  changeLanguage(currentLang);
});

// Crear botones de idioma si no existen
function createLanguageButtons() {
  if (document.querySelector('.language-switcher')) return;
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="ca" onclick="changeLanguage('ca')" aria-label="Canviar a català">CAT</button>
    <button class="lang-btn" data-lang="es" onclick="changeLanguage('es')" aria-label="Cambiar a español">ESP</button>
    <button class="lang-btn" data-lang="en" onclick="changeLanguage('en')" aria-label="Change to English">ENG</button>
  `;
  document.body.insertBefore(switcher, document.body.firstChild);
}

// Exportar funciones
window.changeLanguage = changeLanguage;
window.translatePage = translatePage;
