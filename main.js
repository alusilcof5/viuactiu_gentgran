const API_BASE = 'https://viuactiu-gentgran.vercel.api'; 

async function cargarAjuts() {
  try {
    const response = await fetch(`${API_BASE}/api/ajuts`); 
    const data = await response.json();

    const list = document.getElementById('ajuts-list');
    data.data.forEach(ajut => {
      const li = document.createElement('li');
      li.textContent = ajut.attributes?.titol || ajut.id;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Error al cargar ajuts:', error);
  }
}

cargarAjuts();
