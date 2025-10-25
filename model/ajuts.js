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

  // Funció per obtenir el número d'imatge (1-19) basat en l'índex
  function getImageNumber(index) {
    return ((index % 19) + 1);
  }

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
      
      // Afegir event listener al botó
      const detailsBtn = card.querySelector('button');
      detailsBtn.addEventListener('click', () => showModal(ajut.id));
      
      ajutsContainer.appendChild(card);
      
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

/* let ajutsData = [];
    let ajutsFiltrats = [];

    async function carregarAjuts() {
      try {
        const response = await fetch("http://localhost:5001/api/ajuts");
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const result = await response.json();
        ajutsData = result.data || [];
        if (ajutsData.length === 0) throw new Error("No s'han rebut dades de l'API");
        omplirFiltres(ajutsData.map(a => a.attributes));
        ajutsFiltrats = [...ajutsData];
        mostrarAjuts(ajutsFiltrats);
      } catch (error) {
        document.getElementById("ajuts").innerHTML = `
          <div class="col-span-full p-6 bg-red-100 border-2 border-red-400 rounded-xl">
            <p class="text-red-800 font-bold text-xl">⚠️ No s'ha pogut carregar els ajuts</p>
            <p class="text-gray-700">${error.message}</p>
          </div>`;
      }
    }

    function omplirFiltres(attrsList) {
      const organismes = [...new Set(attrsList.map(a => a.institucioDesenvolupat).filter(Boolean))];
      const tipus = [...new Set(attrsList.map(a => a.tipusSubvencio).filter(Boolean))];
      const estats = [...new Set(attrsList.map(a => a.estat).filter(Boolean))];
      organismes.forEach(o => document.getElementById("filterOrganisme").innerHTML += `<option value="${o}">${o}</option>`);
      tipus.forEach(t => document.getElementById("filterTipus").innerHTML += `<option value="${t}">${t}</option>`);
      estats.forEach(e => document.getElementById("filterEstat").innerHTML += `<option value="${e}">${e}</option>`);
    }

    function aplicarFiltres() {
      const cerca = document.getElementById("searchBar").value.toLowerCase();
      const organisme = document.getElementById("filterOrganisme").value;
      const tipus = document.getElementById("filterTipus").value;
      const estat = document.getElementById("filterEstat").value;

      ajutsFiltrats = ajutsData.filter(a => {
        const attrs = a.attributes;
        return (
          attrs.titol.toLowerCase().includes(cerca) &&
          (!organisme || attrs.institucioDesenvolupat === organisme) &&
          (!tipus || attrs.tipusSubvencio === tipus) &&
          (!estat || attrs.estat === estat)
        );
      });
      mostrarAjuts(ajutsFiltrats);
    }

    function mostrarAjuts(ajuts) {
      if (ajuts.length === 0) {
        document.getElementById("ajuts").innerHTML = `<p class="col-span-full text-center text-xl text-gray-500">No s'han trobat ajuts</p>`;
        return;
      }

      const imatgesAjuts = [];
      for (let n = 1; n <= 19; n++) {
        imatgesAjuts.push(`./images/${n}.png`);
      }

      const html = ajuts.map((ajut, i) => {
        const attrs = ajut.attributes;
        const imgSrc = imatgesAjuts[i % imatgesAjuts.length];

        return `
          <div class="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <img src="${imgSrc}" alt="Imatge d'ajut: ${attrs.titol}" class="w-full h-48 object-cover">
            <div class="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 class="text-2xl font-bold text-blue-900 mb-2">${attrs.titol}</h3>
                <p class="text-lg text-gray-700 mb-4"><strong>Organisme:</strong> ${attrs.institucioDesenvolupat}</p>
              </div>
              <button onclick="obrirModal(${ajutsData.indexOf(ajut)})"
                class="mt-auto px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Veure més detalls de l'ajut: ${attrs.titol}">
                ➕ Veure més
              </button>
            </div>
          </div>`;
      }).join("");

      document.getElementById("ajuts").innerHTML = html;
    }

    function obrirModal(index) {
      const ajut = ajutsData[index].attributes;
      const imgSrc = `./images/${(index % 19) + 1}.png`;

      document.getElementById("modalContent").innerHTML = `
        <div class="overflow-y-auto max-h-[80vh] p-6 space-y-6">
          <img src="${imgSrc}" alt="Imatge d'ajut: ${ajut.titol}" class="w-full h-64 object-cover rounded-xl shadow-lg">
          <h2 class="text-3xl font-bold text-blue-900">${ajut.titol}</h2>
          <p class="text-2xl"><strong>Organisme:</strong> ${ajut.institucioDesenvolupat}</p>
          <p class="text-2xl"><strong>Tipus:</strong> ${ajut.tipusSubvencio}</p>
          <p class="text-2xl"><strong>Estat:</strong> <span class="text-green-700 font-bold">${ajut.estat}</span></p>
          ${ajut.descripcio ? `<p class="text-2xl mt-3"><strong>Descripció:</strong> ${ajut.descripcio}</p>` : ""}
          <button id="btnMoreInfo" 
                  class="mt-6 w-full md:w-auto px-8 py-4 bg-blue-700 text-white text-2xl font-bold rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2"
                  aria-expanded="false" aria-controls="extraInfo">
            📖 Més info
          </button>
          <div id="extraInfo" class="mt-4 hidden text-2xl text-gray-700 space-y-3">
            ${ajut.requisits ? `<p><strong>Requisits:</strong> ${ajut.requisits}</p>` : ""}
            ${ajut.plazos ? `<p><strong>Terminis:</strong> ${ajut.plazos}</p>` : ""}
            ${ajut.urlWeb ? `<p><a href="${ajut.urlWeb}" target="_blank" class="text-blue-600 hover:underline font-bold" aria-label="Visitar web oficial">🌐 Web oficial</a></p>` : ""}
            ${ajut.urlCido ? `<p><a href="${ajut.urlCido}" target="_blank" class="text-purple-600 hover:underline font-bold" aria-label="Visitar CIDO">📑 CIDO</a></p>` : ""}
          </div>
        </div>
      `;

      const modal = document.getElementById("modal");
      const btnMoreInfo = document.getElementById("btnMoreInfo");
      const extraInfo = document.getElementById("extraInfo");
      modal.classList.remove("hidden");

      // Gestionar mostrar/ocultar info adicional
      btnMoreInfo.addEventListener("click", () => {
        extraInfo.classList.toggle("hidden");
        btnMoreInfo.setAttribute("aria-expanded", extraInfo.classList.contains("hidden") ? "false" : "true");
      });

      // Gestionar focus dins del modal
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      firstFocusable.focus();

      modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    }

    function tancarModal() {
      document.getElementById("modal").classList.add("hidden");
    }

    document.addEventListener("input", e => {
      if (["searchBar", "filterOrganisme", "filterTipus", "filterEstat"].includes(e.target.id)) {
        aplicarFiltres();
      }
    });

    window.addEventListener("load", () => {
      carregarAjuts();
    });
  


      // Estado del formulario
    const formData = {
      edad: null,
      dependencia: null,
      municipio: null,
      ingresos: null,
      vivienda: null
    };

    // Manejadores de eventos para botones de opción
    document.querySelectorAll('.option-button').forEach(button => {
      button.addEventListener('click', function() {
        const question = this.dataset.question;
        const value = this.dataset.value;
        
        // Remover selección previa
        document.querySelectorAll(`[data-question="${question}"]`).forEach(btn => {
          btn.classList.remove('selected');
        });
        
        // Marcar como seleccionado
        this.classList.add('selected');
        formData[question] = value;
        
        updateProgress();
      });
    });

    // Manejadores para campos de entrada
    document.getElementById('edad').addEventListener('input', function() {
      const value = this.value ? parseInt(this.value) : null;
      if (value >= 0 && value <= 120) {
        formData.edad = value;
      } else {
        formData.edad = null;
        this.value = '';
        alert('Si us plau, introdueix una edat vàlida entre 0 i 120 anys.');
      }
      updateProgress();
    });

    document.getElementById('municipio').addEventListener('change', function() {
      formData.municipio = this.value || null;
      updateProgress();
    });

    // Actualizar barra de progreso
    function updateProgress() {
      const completed = Object.values(formData).filter(v => v !== null).length;
      const total = Object.keys(formData).length;
      const percentage = Math.round((completed / total) * 100);
      
      document.getElementById('progressBar').style.width = `${percentage}%`;
      document.getElementById('progressText').textContent = `${percentage}%`;
    }

    // Calcular ajuts
    document.getElementById('calcularBtn').addEventListener('click', function() {
      // Validar que todos los campos estén completos
      const incomplete = Object.entries(formData).filter(([key, value]) => value === null);
      
      if (incomplete.length > 0) {
        alert('Si us plau, completa totes les preguntes abans de calcular els ajuts.');
        return;
      }

      // Calcular ajuts elegibles
      const ajutsElegibles = calcularAjutsElegibles(formData);
      
      // Mostrar resultados
      mostrarResultados(ajutsElegibles);
    });

    function calcularAjutsElegibles(data) {
      const ajuts = [];

      // Ajuts per edat
      if (data.edad >= 65) {
        ajuts.push({
          titulo: 'Ajut per a persones majors de 65 anys',
          descripcion: 'Suport econòmic per a persones de la tercera edat',
          organismo: 'Generalitat de Catalunya',
          tipo: 'Econòmic',
          compatibilidad: 'Alta'
        });
      }

      // Ajuts per dependència
      if (data.dependencia === 'grado1') {
        ajuts.push({
          titulo: 'Prestació per dependència Grau I',
          descripcion: 'Ajuda econòmica per a persones amb dependència moderada',
          organismo: 'Generalitat de Catalunya',
          tipo: 'Dependència',
          compatibilidad: 'Alta'
        });
      } else if (data.dependencia === 'grado2-3') {
        ajuts.push({
          titulo: 'Prestació per dependència Grau II/III',
          descripcion: 'Ajuda reforçada per a dependència severa o gran dependència',
          organismo: 'Generalitat de Catalunya',
          tipo: 'Dependència',
          compatibilidad: 'Molt Alta'
        });
        ajuts.push({
          titulo: 'Servei d\'atenció domiciliària',
          descripcion: 'Servei gratuït o subvencionat d\'atenció a domicili',
          organismo: 'Diputació de Barcelona',
          tipo: 'Serveis',
          compatibilidad: 'Alta'
        });
      }

      // Ajuts per ingressos
      if (data.ingresos === 'bajos') {
        ajuts.push({
          titulo: 'Prestació no contributiva de jubilació',
          descripcion: 'Per a persones sense recursos suficients',
          organismo: 'Seguretat Social',
          tipo: 'Econòmic',
          compatibilidad: 'Alta'
        });
        ajuts.push({
          titulo: 'Targeta rosa del transport',
          descripcion: 'Transport públic gratuït per a persones amb baixos ingressos',
          organismo: 'ATM Barcelona',
          tipo: 'Transport',
          compatibilidad: 'Alta'
        });
      }

      // Ajuts per habitatge
      if (data.vivienda === 'alquiler' && data.ingresos !== 'altos') {
        ajuts.push({
          titulo: 'Ajut al lloguer per a gent gran',
          descripcion: 'Subvenció per cobrir part del cost del lloguer',
          organismo: 'Generalitat de Catalunya',
          tipo: 'Habitatge',
          compatibilidad: 'Mitjana'
        });
      }

      if (data.vivienda === 'propia' && data.edad >= 65) {
        ajuts.push({
          titulo: 'Ajuts per a l\'adaptació de l\'habitatge',
          descripcion: 'Per millorar l\'accessibilitat del domicili',
          organismo: 'Diputació de Barcelona',
          tipo: 'Habitatge',
          compatibilidad: 'Alta'
        });
      }

      // Ajuts generals per gent gran
      if (data.edad >= 60) {
        ajuts.push({
          titulo: 'Targeta rosa del transport (>60 anys)',
          descripcion: 'Descomptes en transport públic per a majors de 60 anys',
          organismo: 'ATM Barcelona',
          tipo: 'Transport',
          compatibilidad: 'Alta'
        });
      }

      // Ajuts per municipi (exemple específic per Barcelona)
      if (data.municipio === 'barcelona') {
        ajuts.push({
          titulo: 'Programa d\'activitats per a gent gran',
          descripcion: 'Activitats recreatives i culturals gratuïtes o a baix cost',
          organismo: 'Ajuntament de Barcelona',
          tipo: 'Social',
          compatibilidad: 'Alta'
        });
      }

      return ajuts;
    }

    function mostrarResultados(ajuts) {
      const resultadosDiv = document.getElementById('resultados');
      const listaAjutsDiv = document.getElementById('listaAjuts');
      const numAjutsSpan = document.getElementById('numAjuts');

      // Mostrar número de ajuts
      numAjutsSpan.textContent = ajuts.length;

      // Limpiar lista previa
      listaAjutsDiv.innerHTML = '';

      // Generar lista de ajuts
      if (ajuts.length === 0) {
        listaAjutsDiv.innerHTML = `
          <div class="text-center text-gray-600">
            <p>No s'han trobat ajuts disponibles segons les teves respostes.</p>
            <p>Prova a modificar les teves respostes o consulta amb un professional.</p>
          </div>
        `;
      } else {
        ajuts.forEach(ajut => {
          const ajutDiv = document.createElement('div');
          ajutDiv.className = 'bg-white rounded-lg p-6 shadow-md';
          ajutDiv.innerHTML = `
            <h4 class="text-xl font-bold text-gray-800">${ajut.titulo}</h4>
            <p class="text-gray-600 mt-2">${ajut.descripcion}</p>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <span class="text-gray-500 font-semibold">Organisme:</span>
                <span class="text-gray-700">${ajut.organismo}</span>
              </div>
              <div>
                <span class="text-gray-500 font-semibold">Tipus:</span>
                <span class="text-gray-700">${ajut.tipo}</span>
              </div>
              <div>
                <span class="text-gray-500 font-semibold">Compatibilitat:</span>
                <span class="text-gray-700">${ajut.compatibilidad}</span>
              </div>
            </div>
          `;
          listaAjutsDiv.appendChild(ajutDiv);
        });
      }

      // Mostrar sección de resultados
      resultadosDiv.classList.remove('hidden');
      
      // Scroll suave a la sección de resultados
      resultadosDiv.scrollIntoView({ behavior: 'smooth' });
    }
   */