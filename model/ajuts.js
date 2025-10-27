document.addEventListener('DOMContentLoaded', () => {
  console.log('load_ajuts.js: DOM carregat, iniciant càrrega d\'ajuts...');

  const ajutsContainer = document.getElementById('ajuts');
  const ajutsCountElement = document.getElementById('numAjuts');
  const searchBar = document.getElementById('searchBar');
  const filterOrganisme = document.getElementById('filterOrganisme');
  const filterTipus = document.getElementById('filterTipus');
  const filterEstat = document.getElementById('filterEstat');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const calcularBtn = document.getElementById('calcularBtn');
  const resultados = document.getElementById('resultados');
  const edadInput = document.getElementById('edad');
  const municipioSelect = document.getElementById('municipio');

  if (!ajutsContainer || !ajutsCountElement || !calcularBtn) {
    console.error('load_ajuts.js: Elements #ajuts, #numAjuts o #calcularBtn no trobats al DOM!');
    return;
  }

 
  const jsonFilePath = '../data/subvencions.json';

  const mockData = {
    data: [
      {
        id: "1",
        type: "subvencions",
        attributes: {
          titol: "Ajut per dependència Grau I",
          institucioDesenvolupat: "Consell Comarcal del Baix Camp",
          tipusSubvencio: "Ajut",
          estat: "Procés vigent",
          dataFinalitzacio: "2025-12-31",
          urlCido: "https://cido.diba.cat/subvencions/1"
        }
      },
      {
        id: "2",
        type: "subvencions",
        attributes: {
          titol: "Ajut al lloguer per a gent gran",
          institucioDesenvolupat: "Consell Comarcal del Tarragonès",
          tipusSubvencio: "Ajut",
          estat: "Procés vigent",
          dataFinalitzacio: "2025-11-17",
          urlCido: "https://cido.diba.cat/subvencions/2"
        }
      },
      {
        id: "3",
        type: "subvencions",
        attributes: {
          titol: "Prestació no contributiva",
          institucioDesenvolupat: "Seguretat Social",
          tipusSubvencio: "Ajut",
          estat: "Procés vigent",
          dataFinalitzacio: "2025-11-17",
          urlCido: "https://cido.diba.cat/subvencions/3"
        }
      }
    ]
  };

  let ajutsData = [];
  let currentPage = 1;
  const itemsPerPage = 12;
  let userResponses = {};

 
  function getImageNumber(index) {
    return ((index % 19) + 1);
  }

  
  function updateCount(count) {
    ajutsCountElement.innerText = count.toString();
    console.log(`load_ajuts.js: Comptador actualitzat a ${count} ajuts.`);
  }

 
  function renderAjuts(ajuts) {
    ajutsContainer.innerHTML = '';
    if (ajuts.length === 0) {
      ajutsContainer.innerHTML = '<p class="text-gray-600 text-xl col-span-full">Cap ajut trobat.</p>';
      return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedAjuts = ajuts.slice(start, end);

    paginatedAjuts.forEach((ajut, index) => {
      const attributes = ajut.attributes;
      const globalIndex = start + index;
      const imageNumber = getImageNumber(globalIndex);
      
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow';
      card.innerHTML = `
        <img src="../vista/images/${imageNumber}.png" alt="${attributes.titol}" class="w-full h-32 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-bold text-gray-800 mb-2">${attributes.titol}</h3>
        <p class="text-gray-600 mb-1"><strong>Organisme:</strong> ${attributes.institucioDesenvolupat}</p>
        
        <button class="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg" data-ajut-id="${ajut.id}">
          Veure detalls
        </button>
      `;
      
      
      const detailsBtn = card.querySelector('button');
      detailsBtn.addEventListener('click', () => showModal(ajut.id));
      
      ajutsContainer.appendChild(card);
      
      ajutsContainer.appendChild(card);
    });

   
    const totalPages = Math.ceil(ajuts.length / itemsPerPage);
    const pagination = document.createElement('div');
    pagination.className = 'flex justify-center gap-4 mt-6';
    pagination.innerHTML = `
      <button id="prevPage" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
        Anterior
      </button>
      <span class="text-lg font-semibold text-gray-700">Pàgina ${currentPage} de ${totalPages}</span>
      <button id="nextPage" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
        Següent
      </button>
    `;
    ajutsContainer.appendChild(pagination);

    // Afegir esdeveniments als botons de paginació
    document.getElementById('prevPage')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderAjuts(ajuts);
      }
    });
    document.getElementById('nextPage')?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderAjuts(ajuts);
      }
    });
  }

  // Funció per omplir els filtres
  function populateFilters(data) {
    const organismes = [...new Set(data.map(ajut => ajut.attributes.institucioDesenvolupat))];
    const tipus = [...new Set(data.map(ajut => ajut.attributes.tipusSubvencio))];
    const estats = [...new Set(data.map(ajut => ajut.attributes.estat))];

    filterOrganisme.innerHTML = '<option value="">Tots els organismes</option>' + 
      organismes.map(org => `<option value="${org}">${org}</option>`).join('');
    filterTipus.innerHTML = '<option value="">Tots els tipus</option>' + 
      tipus.map(tip => `<option value="${tip}">${tip}</option>`).join('');
    filterEstat.innerHTML = '<option value="">Tots els estats</option>' + 
      estats.map(est => `<option value="${est}">${est}</option>`).join('');
  }

  // Funció per filtrar i buscar
  function applyFilters() {
    const searchText = searchBar.value.toLowerCase();
    const organisme = filterOrganisme.value;
    const tipus = filterTipus.value;
    const estat = filterEstat.value;

    const filteredAjuts = ajutsData.filter(ajut => {
      const attributes = ajut.attributes;
      return (
        (!searchText || attributes.titol.toLowerCase().includes(searchText)) &&
        (!organisme || attributes.institucioDesenvolupat === organisme) &&
        (!tipus || attributes.tipusSubvencio === tipus) &&
        (!estat || attributes.estat === estat)
      );
    });

    currentPage = 1;
    updateCount(filteredAjuts.length);
    renderAjuts(filteredAjuts);
  }

  // Funció per filtrar segons la calculadora
  function filterByCalculator(responses) {
    const filteredAjuts = ajutsData.filter(ajut => {
      const attributes = ajut.attributes;
      const titolLower = attributes.titol.toLowerCase();

      // Filtre per edat (suposem que els ajuts són per a gent gran, >65 anys)
      const isAgeEligible = !responses.edad || responses.edad >= 65;

      // Filtre per dependència
      const isDependenciaEligible = !responses.dependencia || (
        (responses.dependencia === 'grado1' && titolLower.includes('dependència grau i')) ||
        (responses.dependencia === 'grado2-3' && (titolLower.includes('dependència grau ii') || titolLower.includes('dependència grau iii')))
      );

      // Filtre per municipi (suposem que el camp 'municipis-impacte' conté el municipi)
      const isMunicipioEligible = !responses.municipio || (
        ajut.relationships?.['municipis-impacte']?.links?.related.includes(responses.municipio)
      );

      // Filtre per ingressos
      const isIngresosEligible = !responses.ingresos || (
        responses.ingresos === 'bajos' && titolLower.includes('lloguer') ||
        responses.ingresos === 'medios' && titolLower.includes('prestació')
      );

      // Filtre per habitatge
      const isViviendaEligible = !responses.vivienda || (
        responses.vivienda === 'alquiler' && titolLower.includes('lloguer')
      );

      return isAgeEligible && isDependenciaEligible && isMunicipioEligible && isIngresosEligible && isViviendaEligible;
    });

    resultados.classList.remove('hidden');
    currentPage = 1;
    updateCount(filteredAjuts.length);
    renderAjuts(filteredAjuts);
  }

  // Funció per recollir respostes de la calculadora
  function collectResponses() {
    const dependenciaButtons = document.querySelectorAll('[data-question="dependencia"]');
    const ingresosButtons = document.querySelectorAll('[data-question="ingresos"]');
    const viviendaButtons = document.querySelectorAll('[data-question="vivienda"]');

    userResponses = {
      edad: parseInt(edadInput.value) || null,
      dependencia: Array.from(dependenciaButtons).find(btn => btn.classList.contains('bg-green-200'))?.dataset.value || null,
      municipio: municipioSelect.value || null,
      ingresos: Array.from(ingresosButtons).find(btn => btn.classList.contains('bg-green-200'))?.dataset.value || null,
      vivienda: Array.from(viviendaButtons).find(btn => btn.classList.contains('bg-green-200'))?.dataset.value || null
    };

    return userResponses;
  }

  // Funció per formatejar dates
  function formatDate(dateString) {
    if (!dateString) return 'No especificat';
    const date = new Date(dateString);
    return date.toLocaleDateString('ca-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Funció per mostrar el modal amb detalls
  function showModal(id) {
    console.log('Obrint modal per ajut ID:', id);
    const ajut = ajutsData.find(a => a.id === id || a.id === String(id));
    
    if (!ajut) {
      console.error('No s\'ha trobat l\'ajut amb ID:', id);
      return;
    }

    const attr = ajut.attributes;
    const ajutIndex = ajutsData.findIndex(a => a.id === ajut.id);
    const imageNumber = getImageNumber(ajutIndex);
    
    const estatColor = attr.estat === 'Procés vigent' ? 'green' : 'yellow';
    
    modalContent.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Imatge -->
        <div class="md:w-1/3">
          <img src="../vista/images/${imageNumber}.png" alt="${attr.titol}" 
               class="w-full rounded-lg shadow-md object-cover">
          <div class="mt-4 p-3 bg-${estatColor}-100 rounded-lg text-center">
            <span class="text-sm font-semibold text-${estatColor}-800">
              ${attr.estat || 'Estat desconegut'}
            </span>
          </div>
        </div>

        <!-- Contingut -->
        <div class="md:w-2/3">
          <h3 class="text-3xl font-bold text-gray-800 mt-12 mb-4">${attr.titol}</h3>
          
          <!-- Informació bàsica -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Informació general</h4>
            <div class="space-y-2">
              <p class="text-gray-600"><strong>Organisme:</strong> ${attr.institucioDesenvolupat || 'No especificat'}</p>
              <p class="text-gray-600"><strong>Tipus:</strong> ${attr.tipusSubvencio || 'No especificat'}</p>
              ${attr.ambitTerritorial ? `<p class="text-gray-600"><strong>Àmbit territorial:</strong> ${attr.ambitTerritorial}</p>` : ''}
              ${attr.numeroExpedient ? `<p class="text-gray-600"><strong>Núm. expedient:</strong> ${attr.numeroExpedient}</p>` : ''}
            </div>
          </div>

          <!-- Dates -->
          <div class="bg-blue-50 rounded-lg p-4 mb-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Terminis</h4>
            <div class="space-y-2">
              ${attr.dataPublicacio ? `<p class="text-gray-600"><strong>Data publicació:</strong> ${formatDate(attr.dataPublicacio)}</p>` : ''}
              ${attr.dataInici ? `<p class="text-gray-600"><strong>Data inici:</strong> ${formatDate(attr.dataInici)}</p>` : ''}
              ${attr.dataFinalitzacio ? `<p class="text-gray-600"><strong>Data finalització:</strong> ${formatDate(attr.dataFinalitzacio)}</p>` : ''}
            </div>
          </div>

          <!-- Descripció i observacions -->
          ${attr.observacions ? `
          <div class="bg-green-50 rounded-lg p-4 mb-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Descripció</h4>
            <p class="text-gray-600 text-sm leading-relaxed">${attr.observacions}</p>
          </div>
          ` : ''}

          <!-- Beneficiaris -->
          ${attr.beneficiaris ? `
          <div class="bg-purple-50 rounded-lg p-4 mb-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Beneficiaris</h4>
            <p class="text-gray-600 text-sm">${attr.beneficiaris}</p>
          </div>
          ` : ''}

          <!-- Enllaços -->
          <div class="flex gap-3 mt-6">
            ${attr.urlCido ? `
            <a href="${attr.urlCido}" target="_blank" 
               class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors">
              Més informació CIDO
            </a>
            ` : ''}
            ${attr.urlBop ? `
            <a href="${attr.urlBop}" target="_blank" 
               class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors">
              Veure BOP
            </a>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Botó tancar -->
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold close-modal-btn"></button>
    `;
    
    // Event listener per tancar el modal
    const closeBtn = modalContent.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', tancarModal);
    
    modal.classList.remove('hidden');
    console.log('Modal obert correctament');
  }

  // Funció per tancar el modal
  function tancarModal() {
    modal.classList.add('hidden');
    console.log('Modal tancat');
  }

  // Exportar funcions al window per si es necessiten
  window.showModal = showModal;
  window.tancarModal = tancarModal;

  // Afegir esdeveniments per als filtres i la cerca
  searchBar.addEventListener('input', applyFilters);
  filterOrganisme.addEventListener('change', applyFilters);
  filterTipus.addEventListener('change', applyFilters);
  filterEstat.addEventListener('change', applyFilters);

  // Afegir esdeveniment per a la calculadora
  calcularBtn.addEventListener('click', () => {
    collectResponses();
    filterByCalculator(userResponses);
  });

  // Afegir esdeveniments per als botons de selecció
  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', () => {
      const question = button.dataset.question;
      document.querySelectorAll(`[data-question="${question}"]`).forEach(btn => {
        btn.classList.remove('bg-green-200', 'border-green-500');
      });
      button.classList.add('bg-green-200', 'border-green-500');
    });
  });

  // Intenta carregar des del fitxer JSON local
  fetch(jsonFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error carregant JSON: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      ajutsData = data.data || [];
      if (ajutsData.length === 0) {
        console.warn('load_ajuts.js: No hi ha ajuts en les dades rebudes.');
        ajutsContainer.innerHTML = '<p class="text-gray-600 text-xl col-span-full">Cap ajut trobat.</p>';
      }
      updateCount(ajutsData.length);
      renderAjuts(ajutsData);
      populateFilters(ajutsData);
    })
    .catch(error => {
      console.error('load_ajuts.js: Error carregant el fitxer JSON local:', error);
      console.log('load_ajuts.js: Usant dades simulades com a fallback.');
      ajutsData = mockData.data;
      updateCount(ajutsData.length);
      renderAjuts(ajutsData);
      populateFilters(ajutsData);
    });
});

