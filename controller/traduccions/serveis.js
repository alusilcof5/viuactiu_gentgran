// === ARCHIVO: controller/translator.js ===

// Traducciones
const translations = {
  ca: {
    header_title: "Serveis per a persones amb dependència",
    header_subtitle: "Centres de dia i residències per comarca",
    cerca_recursos_title: "Cerca recursos",
    label_any: "Any",
    label_comarca: "Comarca",
    label_tipusServei: "Tipus de servei",
    select_any: "2024",
    select_comarca: "Totes les comarques",
    select_tipus_total: "Total (ambdós)",
    select_tipus_centre_dia: "Centre de dia",
    select_tipus_residencia: "Residència",
    button_filtrar: "Filtrar",
    mapa_interactiu_title: "Mapa interactiu",
    loading_dades: "Carregant dades...",
    estadistiques_total_persones: "Total persones ateses",
    estadistiques_distribucio_genere: "Distribució per gènere",
    dones: "Dones:",
    homes: "Homes:",
    estadistiques_top_comarques: "Top 5 comarques",
    calculant: "Calculant...",
    dades_per_comarca_title: "Dades per comarca",
    taula_comarca: "Comarca",
    taula_centre_dia: "Centre de dia",
    taula_residencia: "Residència",
    taula_dones: "Dones",
    taula_homes: "Homes",
    taula_total: "Total",
    carregant: "Carregant..."
  },
  es: {
    header_title: "Servicios para personas con dependencia",
    header_subtitle: "Centros de día y residencias por comarca",
    cerca_recursos_title: "Buscar recursos",
    label_any: "Año",
    label_comarca: "Comarca",
    label_tipusServei: "Tipo de servicio",
    select_any: "2024",
    select_comarca: "Todas las comarcas",
    select_tipus_total: "Total (ambos)",
    select_tipus_centre_dia: "Centro de día",
    select_tipus_residencia: "Residencia",
    button_filtrar: "Filtrar",
    mapa_interactiu_title: "Mapa interactivo",
    loading_dades: "Cargando datos...",
    estadistiques_total_persones: "Total personas atendidas",
    estadistiques_distribucio_genere: "Distribución por género",
    dones: "Mujeres:",
    homes: "Hombres:",
    estadistiques_top_comarques: "Top 5 comarcas",
    calculant: "Calculando...",
    dades_per_comarca_title: "Datos por comarca",
    taula_comarca: "Comarca",
    taula_centre_dia: "Centro de día",
    taula_residencia: "Residencia",
    taula_dones: "Mujeres",
    taula_homes: "Hombres",
    taula_total: "Total",
    carregant: "Cargando..."
  },
  en: {
    header_title: "Services for people with dependency",
    header_subtitle: "Day centers and residences by region",
    cerca_recursos_title: "Search resources",
    label_any: "Year",
    label_comarca: "Region",
    label_tipusServei: "Type of service",
    select_any: "2024",
    select_comarca: "All regions",
    select_tipus_total: "Total (both)",
    select_tipus_centre_dia: "Day center",
    select_tipus_residencia: "Residence",
    button_filtrar: "Filter",
    mapa_interactiu_title: "Interactive map",
    loading_dades: "Loading data...",
    estadistiques_total_persones: "Total people served",
    estadistiques_distribucio_genere: "Gender distribution",
    dones: "Women:",
    homes: "Men:",
    estadistiques_top_comarques: "Top 5 regions",
    calculant: "Calculating...",
    dades_per_comarca_title: "Data by region",
    taula_comarca: "Region",
    taula_centre_dia: "Day center",
    taula_residencia: "Residence",
    taula_dones: "Women",
    taula_homes: "Men",
    taula_total: "Total",
    carregant: "Loading..."
  }
};

// Configuración
let currentLang = localStorage.getItem('language') || 'ca';

// Cambiar idioma
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;

  // Actualizar botones activos
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  translatePage();
}

// Traducir página
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder]');
  elements.forEach(el => {
    if (el.dataset.i18n) {
      const translation = translations[currentLang][el.dataset.i18n];
      if (translation) el.textContent = translation;
    }
    if (el.dataset.i18nPlaceholder) {
      const translation = translations[currentLang][el.dataset.i18nPlaceholder];
      if (translation) el.placeholder = translation;
    }
  });

  // Traducción de select y option específicos
  document.querySelectorAll('select').forEach(select => {
    select.querySelectorAll('option').forEach(option => {
      const key = option.dataset.i18n;
      if (key && translations[currentLang][key]) {
        option.textContent = translations[currentLang][key];
      }
    });
  });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  createLanguageButtons();
  changeLanguage(currentLang);
});

// Crear botones de idioma
function createLanguageButtons() {
  if (document.querySelector('.language-switcher')) return;
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="ca" onclick="changeLanguage('ca')" aria-label="Canviar a català">🏴 CAT</button>
    <button class="lang-btn" data-lang="es" onclick="changeLanguage('es')" aria-label="Cambiar a español">🇪🇸 ESP</button>
    <button class="lang-btn" data-lang="en" onclick="changeLanguage('en')" aria-label="Change to English">🇬🇧 ENG</button>
  `;
  document.body.insertBefore(switcher, document.body.firstChild);
}

// Exportar funciones globales
window.changeLanguage = changeLanguage;
window.translatePage = translatePage;
