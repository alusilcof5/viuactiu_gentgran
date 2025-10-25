document.addEventListener('DOMContentLoaded', () => {
  console.log('load_ajuts.js: DOM carregat, iniciant càrrega d\'ajuts...');

  const ajutsContainer = document.getElementById('listaAjuts');
  const ajutsCountElement = document.getElementById('numAjuts');
  const calcularBtn = document.getElementById('calcularBtn');
  const resultados = document.getElementById('resultados');
  const edadInput = document.getElementById('edad');
  const municipioSelect = document.getElementById('municipio');

  if (!ajutsContainer || !ajutsCountElement || !calcularBtn) {
    console.error('load_ajuts.js: Elements no trobats al DOM!');
    return;
  }

  const jsonFilePath = './data/subvencions.json';
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
  let userResponses = {};

  function updateCount(count) {
    ajutsCountElement.innerText = count.toString();
  }

  function renderAjuts(ajuts) {
    ajutsContainer.innerHTML = '';
    if (ajuts.length === 0) {
      ajutsContainer.innerHTML = '<p class="text-gray-600 text-xl">Cap ajut trobat.</p>';
      return;
    }

    ajuts.forEach(ajut => {
      const attributes = ajut.attributes;
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md p-6 mb-4';
      card.innerHTML = `
        <h3 class="text-xl font-bold text-gray-800 mb-2">${attributes.titol}</h3>
        <p class="text-gray-600 mb-1"><strong>Organisme:</strong> ${attributes.institucioDesenvolupat}</p>
        <p class="text-gray-600 mb-1"><strong>Descripció:</strong> ${attributes.observacions}</p>
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
          isDependenciaEligible = titolLower.includes('dependència grau i') || observacionsLower.includes('dependència grau i');
        } else if (responses.dependencia === 'grado2-3') {
          isDependenciaEligible = titolLower.includes('dependència grau ii') || titolLower.includes('dependència grau iii') || observacionsLower.includes('dependència grau ii') || observacionsLower.includes('dependència grau iii');
        }
      }
      const isMunicipioEligible = !responses.municipio || true;
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
    renderAjuts(filteredAjuts);
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
    });
  });

  calcularBtn.addEventListener('click', () => {
    const responses = collectResponses();
    if (responses) {
      filterByCalculator(responses);
    }
  });

  fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      ajutsData = data.data || mockData.data;
    })
    .catch(error => {
      console.error('Error carregant JSON:', error);
      ajutsData = mockData.data;
    });
});
