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

  // Ruta al fitxer JSON local
  const jsonFilePath = '../data/subvencions.json';

  // Dades simulades (mock) per proves si el JSON local falla
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
          urlCido: "https://cido.diba.cat/subvencions/1",
          observacions: "Ajut per a persones amb dependència Grau I"
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
          urlCido: "https://cido.diba.cat/subvencions/2",
          observacions: "Ajut per a lloguer per a persones amb ingressos baixos"
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
          urlCido: "https://cido.diba.cat/subvencions/3",
          observacions: "Per a persones amb ingressos baixos o mitjans"
        }
      }
    ]
  };

  let ajutsData = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  let userResponses = {};

  // Funció per actualitzar el comptador
  function updateCount(count) {
    ajutsCountElement.innerText = count.toString();
    console.log(`load_ajuts.js: Comptador actualitzat a ${count} ajuts.`);
  }

  // Funció per renderitzar els ajuts
  function renderAjuts(ajuts) {
    ajutsContainer.innerHTML = '';
    if (ajuts.length === 0) {
      ajutsContainer.innerHTML = '<p class="text-gray-600 text-xl col-span-full">Cap ajut trobat.</p>';
      return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedAjuts = ajuts.slice(start, end);

    paginatedAjuts.forEach(ajut => {
      const attributes = ajut.attributes;
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow';
      card.innerHTML = `
        <img src="https://via.placeholder.com/150" alt="${attributes.titol}" class="w-full h-32 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-bold text-gray-800 mb-2">${attributes.titol}</h3>
        <p class="text-gray-600 mb-1"><strong>Organisme:</strong> ${attributes.institucioDesenvolupat}</p>
        <p class="text-gray-600 mb-1"><strong>Tipus:</strong> ${attributes.tipusSubvencio}</p>
        <p class="text-gray-600 mb-1"><strong>Estat:</strong> ${attributes.estat}</p>
        <button class="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg" onclick="showModal(${ajut.id})">
          Veure detalls
        </button>
      `;
      ajutsContainer.appendChild(card);
    });

    // Afegir botons de paginació
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
  function applyFilters(ajuts = ajutsData) {
    const searchText = searchBar.value.toLowerCase();
    const organisme = filterOrganisme.value;
    const tipus = filterTipus.value;
    const estat = filterEstat.value;

    const filteredAjuts = ajuts.filter(ajut => {
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
      const observacionsLower = (attributes.observacions || '').toLowerCase();

      // Filtre per edat: assumeix ajuts per a gent gran (≥65 anys)
      const isAgeEligible = !responses.edad || responses.edad >= 65;

      // Filtre per dependència
      let isDependenciaEligible = true;
      if (responses.dependencia) {
        if (responses.dependencia === 'no') {
          isDependenciaEligible = !titolLower.includes('dependència') && !observacionsLower.includes('dependència');
        } else if (responses.dependencia === 'grado1') {
          isDependenciaEligible = titolLower.includes('dependència grau i') || observacionsLower.includes('dependència grau i');
        } else if (responses.dependencia === 'grado2-3') {
          isDependenciaEligible = titolLower.includes('dependència grau ii') || titolLower.includes('dependència grau iii') ||
                                 observacionsLower.includes('dependència grau ii') || observacionsLower.includes('dependència grau iii');
        }
      }

      // Filtre per municipi: suposem que tots són elegibles si no hi ha dades específiques
      const isMunicipioEligible = !responses.municipio || true; // Ajustar si tens dades de municipis-impacte

      // Filtre per ingressos
      let isIngresosEligible = true;
      if (responses.ingresos) {
        if (responses.ingresos === 'bajos') {
          isIngresosEligible = titolLower.includes('lloguer') || observacionsLower.includes('ingressos baixos');
        } else if (responses.ingresos === 'medios') {
          isIngresosEligible = titolLower.includes('prestació') || observacionsLower.includes('ingressos mitjans');
        } else {
          isIngresosEligible = !titolLower.includes('lloguer') && !titolLower.includes('prestació');
        }
      }

      // Filtre per habitatge
      let isViviendaEligible = true;
      if (responses.vivienda) {
        if (responses.vivienda === 'alquiler') {
          isViviendaEligible = titolLower.includes('lloguer') || observacionsLower.includes('lloguer');
        } else {
          isViviendaEligible = !titolLower.includes('lloguer') && !observacionsLower.includes('lloguer');
        }
      }

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

  // Funció per mostrar el modal amb detalls
  window.showModal = function(id) {
    const ajut = ajutsData.find(a => a.id === id);
    if (!ajut) return;

    const attributes = ajut.attributes;
    modalContent.innerHTML = `
      <h3 class="text-2xl font-bold text-gray-800 mb-4">${attributes.titol}</h3>
      <p class="text-gray-600 mb-2"><strong>Organisme:</strong> ${attributes.institucioDesenvolupat}</p>
      <p class="text-gray-600 mb-2"><strong>Tipus:</strong> ${attributes.tipusSubvencio}</p>
      <p class="text-gray-600 mb-2"><strong>Estat:</strong> ${attributes.estat}</p>
      <p class="text-gray-600 mb-2"><strong>Data de finalització:</strong> ${attributes.dataFinalitzacio || 'No especificat'}</p>
      <p class="text-gray-600 mb-2"><strong>Descripció:</strong> ${attributes.observacions || 'Sense observacions'}</p>
      <a href="${attributes.urlCido}" target="_blank" class="text-blue-600 hover:underline">Més informació</a>
    `;
    modal.classList.remove('hidden');
  };

  // Funció per tancar el modal
  window.tancarModal = function() {
    modal.classList.add('hidden');
  };

  // Afegir esdeveniments per als filtres i la cerca
  searchBar.addEventListener('input', () => applyFilters(userResponses.eligibleAjuts || ajutsData));
  filterOrganisme.addEventListener('change', () => applyFilters(userResponses.eligibleAjuts || ajutsData));
  filterTipus.addEventListener('change', () => applyFilters(userResponses.eligibleAjuts || ajutsData));
  filterEstat.addEventListener('change', () => applyFilters(userResponses.eligibleAjuts || ajutsData));

  // Afegir esdeveniment per a la calculadora
  calcularBtn.addEventListener('click', () => {
    collectResponses();
    const eligibleAjuts = filterByCalculator(userResponses);
    userResponses.eligibleAjuts = eligibleAjuts;
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