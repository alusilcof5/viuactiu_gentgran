let allData = [];

async function loadData() {
  try {
    if (window.fs) {
      const fileContent = await window.fs.readFile(
        "./data/transparencia.json",
        { encoding: "utf8" }
      );
      allData = JSON.parse(fileContent);
    } else {
      const response = await fetch("./data/transparencia.json");
      allData = await response.json();
    }

    allData = allData.map((d) => ({
      any: d.any,
      comarca: d.comarca
        .replace(/Ã /g, "à")
        .replace(/Ã¨/g, "è")
        .replace(/Ã©/g, "é")
        .replace(/Ãí/g, "í")
        .replace(/Ã³/g, "ó")
        .replace(/Ãº/g, "ú")
        .replace(/Ã§/g, "ç"),
      total: d.total || "0",
      dones_total: d.dones_total || "0",
      homes_total: d.homes_total || "0",
      total_centre_de_dia_gent: d.total_centre_de_dia_gent || "0",
      total_resid_ncia_gent_gran: d.total_resid_ncia_gent_gran || "0",
    }));

    initDashboard();
  } catch (error) {
    console.error("Error cargando datos:", error);
    document.getElementById("loading").innerHTML =
      '<p class="text-red-500">Error al cargar los datos. Asegúrate de que el archivo transparencia.json está en la misma carpeta.</p>';
  }
}

function initDashboard() {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  initYears();
  initComarcas();
  updateDashboard();
}

function initYears() {
  const years = [...new Set(allData.map((d) => d.any))].sort().reverse();
  const yearSelect = document.getElementById("yearSelect");

  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
}

function initComarcas() {
  const comarcas = [...new Set(allData.map((d) => d.comarca))].sort();
  const comarcaSelect = document.getElementById("comarcaSelect");

  comarcas.forEach((comarca) => {
    const option = document.createElement("option");
    option.value = comarca;
    option.textContent = comarca;
    comarcaSelect.appendChild(option);
  });
}

function filterData() {
  const year = document.getElementById("yearSelect").value;
  const comarca = document.getElementById("comarcaSelect").value;

  return allData.filter((d) => {
    const yearMatch = d.any === year;
    const comarcaMatch = comarca === "all" || d.comarca === comarca;
    return yearMatch && comarcaMatch;
  });
}

function updateStats() {
  const filtered = filterData();

  const users = filtered.reduce((sum, d) => sum + parseInt(d.total || 0), 0);
  const centros = filtered.reduce(
    (sum, d) => sum + parseInt(d.total_centre_de_dia_gent || 0),
    0
  );
  const residencias = filtered.reduce(
    (sum, d) => sum + parseInt(d.total_resid_ncia_gent_gran || 0),
    0
  );

  document.getElementById("totalUsers").textContent = users.toLocaleString();
  document.getElementById("totalCentros").textContent =
    centros.toLocaleString();
  document.getElementById("totalResidencias").textContent =
    residencias.toLocaleString();
}

function updateBarChart() {
  const filtered = filterData();
  const sorted = filtered
    .sort((a, b) => parseInt(b.total) - parseInt(a.total))
    .slice(0, 10);
  const maxValue = Math.max(...sorted.map((d) => parseInt(d.total)));

  const chart = document.getElementById("topComarcasChart");
  chart.innerHTML = "";

  sorted.forEach((d) => {
    const percentage = (parseInt(d.total) / maxValue) * 100;
    const value = parseInt(d.total).toLocaleString();

    const item = document.createElement("div");
    item.className = "flex items-center gap-3";
    item.innerHTML = `
                    <div class="w-36 text-sm text-gray-700 font-medium truncate">${d.comarca}</div>
                    <div class="flex-1 h-8 bg-slate-100 overflow-hidden">
                        <div class="bar-fill h-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-end pr-3" style="width: ${percentage}%">
                            <span class="text-white font-semibold text-sm">${value}</span>
                        </div>
                    </div>
                `;
    chart.appendChild(item);
  });
}

function updateGenderChart() {
  const filtered = filterData();
  const women = filtered.reduce(
    (sum, d) => sum + parseInt(d.dones_total || 0),
    0
  );
  const men = filtered.reduce(
    (sum, d) => sum + parseInt(d.homes_total || 0),
    0
  );
  const total = women + men;

  const womenPercent = (women / total) * 100;

  const pie = document.getElementById("genderPie");
  pie.style.background = `conic-gradient(
                #3b82f6 0deg ${womenPercent * 3.6}deg,
                #60a5fa ${womenPercent * 3.6}deg 360deg
            )`;

  const legend = document.getElementById("genderLegend");
  legend.innerHTML = `
                <div class="flex items-center gap-3 p-3 bg-slate-50">
                    <div class="w-5 h-5 bg-blue-600"></div>
                    <span class="flex-1 text-sm text-gray-700 font-medium">Mujeres</span>
                    <span class="font-bold text-blue-900">${women.toLocaleString()} (${womenPercent.toFixed(
    1
  )}%)</span>
                </div>
                <div class="flex items-center gap-3 p-3 bg-slate-50">
                    <div class="w-5 h-5 bg-blue-400"></div>
                    <span class="flex-1 text-sm text-gray-700 font-medium">Hombres</span>
                    <span class="font-bold text-blue-900">${men.toLocaleString()} (${(
    100 - womenPercent
  ).toFixed(1)}%)</span>
                </div>
            `;
}

function updateDashboard() {
  updateStats();
  updateBarChart();
  updateGenderChart();
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  document
    .getElementById("yearSelect")
    .addEventListener("change", updateDashboard);
  document
    .getElementById("comarcaSelect")
    .addEventListener("change", updateDashboard);
});
