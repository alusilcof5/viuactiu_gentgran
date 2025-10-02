
    let map, allData = [];
    const comarcaCoords = {
      'Barcelonès': [41.3851, 2.1734], 'Vallès Occidental': [41.5611, 2.0918],
      'Vallès Oriental': [41.6989, 2.3178], 'Baix Llobregat': [41.3611, 1.9753],
      'Maresme': [41.5389, 2.4478], 'Garraf': [41.2489, 1.8578],
      'Alt Penedès': [41.3878, 1.6978], 'Anoia': [41.5711, 1.5456],
      'Bages': [41.9389, 1.8389], 'Berguedà': [42.1089, 1.8678],
      'Osona': [41.9989, 2.2578], 'Selva': [41.8889, 2.6378],
      'Gironès': [41.9800, 2.8200], 'Alt Empordà': [42.2600, 3.0400],
      'Baix Empordà': [41.9600, 3.1200], 'Garrotxa': [42.1889, 2.5078],
      'Tarragonès': [41.1189, 1.2478], 'Baix Camp': [41.0989, 0.9478],
      'Segrià': [41.6189, 0.6278]
    };

    async function initMap() {
      map = L.map('map', {
        keyboard: true, // Habilitar navegació per teclat
        keyboardPanDelta: 80
      }).setView([41.6, 1.8], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(map);

      try {
        const response = await fetch('https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json?$limit=5000');
        allData = await response.json();

        const anys = [...new Set(allData.map(d => d.any))].sort().reverse();
        document.getElementById('any').innerHTML = anys.map(a => `<option value="${a}">${a}</option>`).join('');

        const comarques = [...new Set(allData.map(d => d.comarca).filter(c => c))].sort();
        document.getElementById('comarca').innerHTML = '<option value="">Totes les comarques</option>' + comarques.map(c => `<option value="${c}">${c}</option>`).join('');

        document.getElementById('loading').classList.add('hidden');
        document.getElementById('map').classList.remove('hidden');

        aplicarFiltres();
      } catch (error) {
        document.getElementById('loading').innerHTML = `
          <div class="col-span-full p-6 bg-red-100 border-2 border-red-400 rounded-xl">
            <p class="text-red-800 font-bold text-xl">⚠️ No s'ha pogut carregar el mapa</p>
            <p class="text-gray-700">${error.message}</p>
          </div>`;
      }
    }

    function aplicarFiltres() {
      const any = document.getElementById('any').value;
      const comarca = document.getElementById('comarca').value;
      const tipusServei = document.getElementById('tipusServei').value;

      let filtered = allData.filter(d => d.any == any);
      if (comarca) filtered = filtered.filter(d => d.comarca == comarca);

      const dades = processarDades(filtered, tipusServei);
      mostrarMapa(dades, tipusServei);
      mostrarTaula(dades);
    }

    function processarDades(data, tipusServei) {
      const dadesPerComarca = {};
      data.forEach(item => {
        if (!item.comarca) return;
        if (!dadesPerComarca[item.comarca]) {
          dadesPerComarca[item.comarca] = {
            comarca: item.comarca,
            centreDia: parseInt(item.total_centre_de_dia_gent) || 0,
            residencia: parseInt(item.total_resid_ncia_gent_gran) || 0,
            dones: parseInt(item.dones_total) || 0,
            homes: parseInt(item.homes_total) || 0,
            total: parseInt(item.total) || 0
          };
        }
      });

      const dades = Object.values(dadesPerComarca);

      const totalPersones = dades.reduce((sum, d) => sum + (tipusServei === 'centre_dia' ? d.centreDia : tipusServei === 'residencia' ? d.residencia : d.total), 0);
      const totalDones = dades.reduce((sum, d) => sum + d.dones, 0);
      const totalHomes = dades.reduce((sum, d) => sum + d.homes, 0);

      document.getElementById('total-persones').textContent = totalPersones.toLocaleString();
      document.getElementById('pct-dones').textContent = totalPersones ? ((totalDones / totalPersones) * 100).toFixed(1) + '%' : '--%';
      document.getElementById('pct-homes').textContent = totalPersones ? ((totalHomes / totalPersones) * 100).toFixed(1) + '%' : '--%';

      const top5 = [...dades].sort((a, b) => (b.total - a.total)).slice(0, 5);
      document.getElementById('top-comarques').innerHTML = top5.map(c => `<div>${c.comarca}: <strong>${c.total}</strong></div>`).join('');

      return dades;
    }

    function mostrarMapa(dades, tipusServei) {
      map.eachLayer(layer => { if (layer instanceof L.CircleMarker) map.removeLayer(layer); });
      dades.forEach(item => {
        const coords = comarcaCoords[item.comarca];
        if (!coords || item.total <= 0) return;
        const valor = tipusServei === 'centre_dia' ? item.centreDia : tipusServei === 'residencia' ? item.residencia : item.total;
        L.circleMarker(coords, {
          radius: Math.max(8, Math.sqrt(valor) * 0.6),
          color: '#2563eb',
          fillColor: '#60a5fa',
          fillOpacity: 0.7,
          weight: 2
        }).addTo(map).bindPopup(`
          <strong>${item.comarca}</strong><br>
          Centre de dia: ${item.centreDia}<br>
          Residència: ${item.residencia}<br>
          <strong>Total: ${item.total}</strong>
        `, {
          className: 'leaflet-popup-accessible'
        });
      });
    }

    function mostrarTaula(dades) {
      document.getElementById('tabla-dades').innerHTML = dades.map(item => `
        <tr class="hover:bg-gray-50">
          <td class="p-3 border-b font-semibold">${item.comarca}</td>
          <td class="p-3 border-b text-center">${item.centreDia}</td>
          <td class="p-3 border-b text-center">${item.residencia}</td>
          <td class="p-3 border-b text-center text-pink-600 font-semibold">${item.dones}</td>
          <td class="p-3 border-b text-center text-blue-600 font-semibold">${item.homes}</td>
          <td class="p-3 border-b text-center font-bold">${item.total}</td>
        </tr>
      `).join('');
    }

    window.addEventListener('load', initMap);


    