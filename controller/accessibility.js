// accessibility.js
document.addEventListener('DOMContentLoaded', function() {
  
  // Control de Zoom
  let currentZoom = 100;
  const zoomStep = 10;
  const minZoom = 100;
  const maxZoom = 150;
  
  const zoomIn = document.getElementById('zoom-in');
  const zoomOut = document.getElementById('zoom-out');
  const highContrastBtn = document.getElementById('high-contrast');
  
  // Cargar preferencia guardada
  const savedZoom = localStorage.getItem('zoom-level');
  if (savedZoom) {
    currentZoom = parseInt(savedZoom);
    document.documentElement.style.fontSize = currentZoom + '%';
  }
  
  zoomIn.addEventListener('click', function() {
    if (currentZoom < maxZoom) {
      currentZoom += zoomStep;
      document.documentElement.style.fontSize = currentZoom + '%';
      localStorage.setItem('zoom-level', currentZoom);
    }
  });
  
  zoomOut.addEventListener('click', function() {
    if (currentZoom > minZoom) {
      currentZoom -= zoomStep;
      document.documentElement.style.fontSize = currentZoom + '%';
      localStorage.setItem('zoom-level', currentZoom);
    }
  });
  
  // Alto Contraste
  const savedContrast = localStorage.getItem('high-contrast');
  if (savedContrast === 'true') {
    document.body.classList.add('high-contrast');
  }
  
  highContrastBtn.addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    localStorage.setItem('high-contrast', isActive);
  });
  
  // Botón de ayuda
  const helpBtn = document.querySelector('.help-button');
  helpBtn.addEventListener('click', function() {
    alert('Necessites ajuda? Truca al 012 o envia un email a info@viuactiu.cat');
  });
  
});


/*     window.addEventListener('load', function() {
      document.getElementById('ajuts-count').textContent = '128';
    });

    
function changeTextSize(size) {
  const validSizes = ['normal', 'large', 'xlarge'];
  if (!validSizes.includes(size)) {
    console.warn(`Mida de text no vàlida: ${size}. S'esperava: normal, large, o xlarge.`);
    return;
  }
  document.body.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
  document.body.classList.add(`text-size-${size}`);
  localStorage.setItem('textSize', size);
  document.body.offsetHeight; // Força reflow per aplicar estils
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function insertAccessibilityBar() {
  const bar = document.createElement('div');
  bar.className = 'bg-blue-900 text-white py-2 px-4 flex justify-between items-center flex-wrap gap-2';
  bar.setAttribute('aria-label', 'Barra d\'accessibilitat');
  bar.innerHTML = `
    <div class="flex gap-2">
      <button onclick="changeTextSize('normal')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-xl" aria-label="Canvia a mida de text normal">A</button>
      <button onclick="changeTextSize('large')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-2xl" aria-label="Canvia a mida de text gran">A</button>
      <button onclick="changeTextSize('xlarge')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-4xl" aria-label="Canvia a mida de text extra gran">A</button>
    </div>
    <button onclick="toggleContrast()" class="px-4 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-xl" aria-label="Activa o desactiva l'alt contrast">Alt Contrast</button>
  `;
  document.body.prepend(bar);

  // Assegurar navegació per teclat
  const buttons = bar.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}

function applySavedSettings() {
  const savedSize = localStorage.getItem('textSize');
  if (savedSize) {
    changeTextSize(savedSize);
  } else {
    changeTextSize('normal'); // Valor per defecte
  }
  const savedContrast = localStorage.getItem('highContrast');
  if (savedContrast === 'true') {
    document.body.classList.add('high-contrast');
  }
}
/* 
document.addEventListener('DOMContentLoaded', () => {
  insertAccessibilityBar();
  applySavedSettings();
}); 


window.changeTextSize = function(size) {
  const validSizes = ['normal', 'large', 'xlarge'];
  if (!validSizes.includes(size)) {
    console.warn(`Mida de text no vàlida: ${size}. S'esperava: normal, large, o xlarge.`);
    return;
  }
  document.body.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
  document.body.classList.add(`text-size-${size}`);
  localStorage.setItem('textSize', size);
  document.body.offsetHeight; 
};

window.toggleContrast = function() {
  document.body.classList.toggle('high-contrast');
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
};

document.addEventListener('DOMContentLoaded', function() {
  // Funció segura per establir text
  function safeSetText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    } else {
      console.warn(`Element amb ID "${id}" no trobat.`);
    }
  }

  // Lògica específica per pàgina
  const currentPage = window.location.pathname.toLowerCase();
  if (currentPage.includes('ajuts.html')) {
    safeSetText('ajuts-count', '128');
  } else if (currentPage.includes('cuidadores.html')) {
    safeSetText('total-cuidadores', 'Carregant...');
    safeSetText('pct-dones', '--%');
    safeSetText('pct-homes', '--%');
  } else if (currentPage.includes('serveis.html')) {
    safeSetText('total-persones', 'Carregant...');
  }

  // Barra d'accessibilitat
  function insertAccessibilityBar() {
    const bar = document.createElement('div');
    bar.className = 'bg-blue-900 text-white py-2 px-4 flex justify-between items-center flex-wrap gap-2';
    bar.setAttribute('aria-label', 'Barra d\'accessibilitat');
    bar.innerHTML = `
      <div class="flex gap-2">
        <button onclick="changeTextSize('normal')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-xl" aria-label="Canvia a mida de text normal">A</button>
        <button onclick="changeTextSize('large')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-2xl" aria-label="Canvia a mida de text gran">A</button>
        <button onclick="changeTextSize('xlarge')" class="px-3 py-1 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded text-4xl" aria-label="Canvia a mida de text extra gran">A</button>
      </div>
    `;
    document.body.prepend(bar);

    // Assegurar navegació per teclat
    const buttons = bar.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  }

  // Aplicar configuracions guardades
  function applySavedSettings() {
    const savedSize = localStorage.getItem('textSize');
    if (savedSize) {
      changeTextSize(savedSize);
    } else {
      changeTextSize('normal');
    }
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
      document.body.classList.add('high-contrast');
    }
  }

  // Inicialitzar
  insertAccessibilityBar();
  applySavedSettings();
  console.log('Accessibilitat inicialitzada per:', currentPage);
}); */