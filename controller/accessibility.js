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

