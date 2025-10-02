    let ajutsData = [];
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
  
