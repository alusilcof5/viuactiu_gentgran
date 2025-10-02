// URL base de tus endpoints serverless en Vercel
const API_BASE = 'https://viuactiu-gentgran.vercel.app/api';

// Función para cargar ajuts y actualizar el contador
async function cargarAjuts() {
  try {
    const response = await fetch(`${API_BASE}/ajuts`);
    const data = await response.json();

    // Actualiza el contador de ajuts
    const ajutsCount = document.getElementById('ajuts-count');
    if (ajutsCount) ajutsCount.textContent = data.meta?.total || 0;

    // Lista de ajuts si existe
    const list = document.getElementById('ajuts-list');
    if (list && data.data) {
      list.innerHTML = ''; // Limpia la lista antes de llenarla
      data.data.forEach(ajut => {
        const li = document.createElement('li');
        li.textContent = ajut.attributes?.titol || ajut.id;
        list.appendChild(li);
      });
    }

  } catch (error) {
    console.error('Error al cargar ajuts:', error);
    const ajutsCount = document.getElementById('ajuts-count');
    if (ajutsCount) ajutsCount.textContent = 'Error';
  }
}

// Ejecutar cuando la página esté lista
window.addEventListener('DOMContentLoaded', cargarAjuts);
