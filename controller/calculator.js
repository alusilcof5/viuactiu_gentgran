document.addEventListener('DOMContentLoaded', () => {
  const ajutsContainer = document.getElementById('listaAjuts');
  const ajutsCountElement = document.getElementById('numAjuts');
  const calcularBtn = document.getElementById('calcularBtn');
  const resultados = document.getElementById('resultados');
  const edadInput = document.getElementById('edad');
  const municipioSelect = document.getElementById('municipio');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  if (!ajutsContainer || !ajutsCountElement || !calcularBtn) {
    console.error('Elements no trobats al DOM!');
    return;
  }

  const jsonFilePath = '../data/subvencions.json';

  let ajutsData = [];
  let userResponses = {};

  function updateProgressBar() {
    const totalQuestions = 5;
    let answeredQuestions = 0;

    if (edadInput.value) answeredQuestions++;
    if (document.querySelector('[data-question="dependencia"].bg-green-200')) answeredQuestions++;
    if (municipioSelect.value) answeredQuestions++;
    if (document.querySelector('[data-question="ingresos"].bg-green-200')) answeredQuestions++;
    if (document.querySelector('[data-question="vivienda"].bg-green-200')) answeredQuestions++;

    const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);
    progressBar.style.width = progressPercentage + '%';
    progressText.textContent = progressPercentage + '%';
  }

  function updateCount(count) {
    ajutsCountElement.innerText = count.toString();
  }

  function renderAjuts(ajuts) {
    ajutsContainer.innerHTML = '';
    if (ajuts.length === 0) {
      ajutsContainer.innerHTML = '<p class="text-gray-600 text-xl">Cap ajut trobat amb els criteris seleccionats.</p>';
      return;
    }

    ajuts.forEach(ajut => {
      const attributes = ajut.attributes;
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow';
      card.innerHTML = `
        <h3 class="text-xl font-bold text-gray-800 mb-2">${attributes.titol}</h3>
        <p class="text-gray-600 mb-1"><strong>Organisme:</strong> ${attributes.institucioDesenvolupat}</p>
        <p class="text-gray-600 mb-1"><strong>Tipus:</strong> ${attributes.tipusSubvencio}</p>
        <p class="text-gray-600 mb-1"><strong>Estat:</strong> ${attributes.estat}</p>
        <p class="text-gray-600 mb-2"><strong>Descripció:</strong> ${attributes.observacions}</p>
        ${attributes.dataFinalitzacio ? `<p class="text-sm text-gray-500"><strong>Finalitza:</strong> ${attributes.dataFinalitzacio}</p>` : ''}
        ${attributes.urlCido ? `<a href="${attributes.urlCido}" target="_blank" class="inline-block mt-3 text-green-600 hover:text-green-700 font-semibold">Més informació →</a>` : ''}
      `;
      ajutsContainer.appendChild(card);
    });
    updateCount(ajuts.length);
  }

  function filterByCalculator(responses) {
    const filteredAjuts = ajutsData.filter(ajut => {
      const attributes = ajut.attributes;
      const titolLower = attributes.titol.toLowerCase();
      const observacionsLower = (attributes.observacions || '').toLowerCase();

      const isAgeEligible = !responses.edad || responses.edad >= 65;
      
      let isDependenciaEligible = true;
      if (responses.dependencia) {
        if (responses.dependencia === 'no') {
          isDependenciaEligible = !titolLower.includes('dependència');
        } else if (responses.dependencia === 'grado1') {
          isDependenciaEligible = titolLower.includes('grau i') || observacionsLower.includes('grau i') || !titolLower.includes('dependència');
        } else if (responses.dependencia === 'grado2-3') {
          isDependenciaEligible = titolLower.includes('grau ii') || titolLower.includes('grau iii') || observacionsLower.includes('grau ii') || observacionsLower.includes('grau iii') || !titolLower.includes('dependència');
        }
      }
      
      const isMunicipioEligible = true;
      
      let isIngresosEligible = true;
      if (responses.ingresos) {
        if (responses.ingresos === 'bajos') {
          isIngresosEligible = titolLower.includes('lloguer') || titolLower.includes('prestació') || observacionsLower.includes('ingressos baixos');
        } else if (responses.ingresos === 'medios') {
          isIngresosEligible = titolLower.includes('prestació') || observacionsLower.includes('ingressos mitjans') || !observacionsLower.includes('ingressos baixos');
        } else {
          isIngresosEligible = !observacionsLower.includes('ingressos baixos') && !titolLower.includes('lloguer');
        }
      }
      
      let isViviendaEligible = true;
      if (responses.vivienda) {
        if (responses.vivienda === 'alquiler') {
          isViviendaEligible = titolLower.includes('lloguer') || observacionsLower.includes('lloguer') || !titolLower.includes('habitatge');
        } else {
          isViviendaEligible = !titolLower.includes('lloguer') || titolLower.includes('habitatge');
        }
      }

      return isAgeEligible && isDependenciaEligible && isMunicipioEligible && isIngresosEligible && isViviendaEligible;
    });

    resultados.classList.remove('hidden');
    renderAjuts(filteredAjuts);
    
    setTimeout(() => {
      resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

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

    if (!userResponses.edad || !userResponses.dependencia || !userResponses.ingresos || !userResponses.vivienda) {
      alert('Si us plau, respon a totes les preguntes abans de calcular.');
      return null;
    }

    return userResponses;
  }

  document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', () => {
      const question = button.dataset.question;
      document.querySelectorAll(`[data-question="${question}"]`).forEach(btn => {
        btn.classList.remove('bg-green-200', 'border-green-500');
      });
      button.classList.add('bg-green-200', 'border-green-500');
      updateProgressBar();
    });
  });

  edadInput.addEventListener('input', () => {
    updateProgressBar();
  });

  municipioSelect.addEventListener('change', () => {
    updateProgressBar();
  });

  calcularBtn.addEventListener('click', () => {
    if (ajutsData.length === 0) {
      alert('Encara s\'estan carregant les dades dels ajuts. Si us plau, espera un moment i torna-ho a intentar.');
      return;
    }

    const responses = collectResponses();
    if (responses) {
      filterByCalculator(responses);
    }
  });

  async function loadAjuts() {
    try {
      const response = await fetch(jsonFilePath);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      ajutsData = data.data || [];
      
      if (ajutsData.length === 0) {
        console.warn('El fitxer JSON no conté cap ajut');
      }
      
    } catch (error) {
      console.error('Error carregant el fitxer JSON:', error);
      alert('Error carregant els ajuts. Si us plau, verifica que el fitxer ../data/subvencions.json existeix i és accessible.');
      ajutsData = [];
    }
  }

  loadAjuts();
});