
const STATE = {
    residenciesData: [],
    filteredData: []
};

const CONFIG = {
    districtPaths: {
        'Ciutat Vella': 'M380,320 L440,280 L480,300 L500,340 L460,380 L400,360 Z',
        'Eixample': 'M300,260 L380,320 L400,360 L340,400 L280,340 Z',
        'Sants-Montjuïc': 'M200,360 L280,340 L340,400 L320,480 L240,460 Z',
        'Les Corts': 'M180,280 L260,260 L300,260 L280,340 L200,360 Z',
        'Sarrià-Sant Gervasi': 'M180,180 L260,160 L300,200 L280,280 L200,260 Z',
        'Gràcia': 'M260,160 L340,140 L380,200 L340,260 L260,260 Z',
        'Horta-Guinardó': 'M340,140 L440,100 L480,180 L420,240 L360,200 Z',
        'Nou Barris': 'M280,80 L380,60 L440,100 L380,140 L300,120 Z',
        'Sant Andreu': 'M440,100 L540,80 L580,160 L520,200 L460,180 Z',
        'Sant Martí': 'M480,200 L580,180 L620,280 L560,340 L500,300 Z'
    },
    colorScale: [
        { min: 0, max: 0, fill: '#e5e7eb', stroke: '#9ca3af', label: 'Sense places' },
        { min: 1, max: 999, fill: '#fef3c7', stroke: '#fbbf24', label: '< 1000 places' },
        { min: 1000, max: 1999, fill: '#fcd34d', stroke: '#f59e0b', label: '1000-2000 places' },
        { min: 2000, max: 2999, fill: '#fb923c', stroke: '#ea580c', label: '2000-3000 places' },
        { min: 3000, max: Infinity, fill: '#dc2626', stroke: '#991b1b', label: '> 3000 places' }
    ]
};

const getPlacesFromResidence = (residence) => {
    const placesAttr = residence.attribute_categories
        ?.flatMap(cat => cat.attributes || [])
        .find(attr => attr.name === "Nombre de  places");
    return placesAttr?.values?.[0]?.integer_value || 0;
};

const getColorForCount = (count) => {
    const colorConfig = CONFIG.colorScale.find(c => count >= c.min && count <= c.max);
    return colorConfig || CONFIG.colorScale[0];
};

async function loadData() {
    try {
        let data;
        if (window.fs?.readFile) {
            const response = await window.fs.readFile('./data/residencies.json', { encoding: 'utf8' });
            data = JSON.parse(response);
        } else {
            const response = await fetch('./data/residencies.json');
            data = await response.json();
        }

        STATE.residenciesData = Array.isArray(data) ? data : [data];
        STATE.filteredData = STATE.residenciesData;
        processData();
    } catch (error) {
        console.error('Error carregant dades:', error);
        showError('Error carregant les dades. Assegura\'t que el fitxer ./data/residencies.json existeix.');
    }
}

function showError(message) {
    document.getElementById('residencesList').innerHTML =
        `<div class="text-center text-orange-700 py-8">${message}</div>`;
}

function processData() {
    const stats = calculateStats(STATE.residenciesData);
    updateStatsDisplay(stats);
    updateBarcelonaMap(stats.districtCounts, stats.districtPlaces);
    createCharts(stats.districtCounts, stats.districtPlaces);
    renderResidencesList(STATE.residenciesData);
}

function calculateStats(data) {
    const stats = {
        totalResidences: data.length,
        totalPlaces: 0,
        districtCounts: {},
        districtPlaces: {}
    };

    data.forEach(res => {
        const places = getPlacesFromResidence(res);
        stats.totalPlaces += places;

        const district = res.addresses?.[0]?.district_name || 'Desconegut';
        stats.districtCounts[district] = (stats.districtCounts[district] || 0) + 1;
        stats.districtPlaces[district] = (stats.districtPlaces[district] || 0) + places;
    });

    stats.avgPlaces = stats.totalResidences > 0
        ? Math.round(stats.totalPlaces / stats.totalResidences)
        : 0;
    stats.totalDistricts = Object.keys(stats.districtCounts).length;

    return stats;
}

function updateStatsDisplay(stats) {
    document.getElementById('totalResidences').textContent = stats.totalResidences;
    document.getElementById('totalPlaces').textContent = stats.totalPlaces;
    document.getElementById('avgPlaces').textContent = stats.avgPlaces;
    document.getElementById('totalDistricts').textContent = stats.totalDistricts;
}

function updateBarcelonaMap(districtCounts, districtPlaces) {
    const svg = document.getElementById('barcelonaMap');
    svg.innerHTML = '';

    Object.entries(CONFIG.districtPaths).forEach(([district, path]) => {
        const count = districtCounts[district] || 0;
        const places = districtPlaces[district] || 0;
        const colors = getColorForCount(places);

        const pathElement = createDistrictPath(path, colors, district, count, places);
        svg.appendChild(pathElement);

        addDistrictLabels(svg, pathElement, district, places, colors);
    });

    addMapInstruction(svg);
}

function createDistrictPath(path, colors, district, count, places) {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('fill', colors.fill);
    pathElement.setAttribute('stroke', colors.stroke);
    pathElement.setAttribute('stroke-width', '2');
    pathElement.classList.add('district-path');

    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${district}: ${count} residència${count !== 1 ? 's' : ''}, ${places} places`;
    pathElement.appendChild(title);

    pathElement.addEventListener('click', () => showDistrictInfo(district, count, places));

    return pathElement;
}

function addDistrictLabels(svg, pathElement, district, places, colors) {
    const pathBox = pathElement.getBBox();
    const centerX = pathBox.x + pathBox.width / 2;
    const centerY = pathBox.y + pathBox.height / 2;

    const textColor = places >= 2000 ? '#ffffff' : '#374151';
    const countColor = places >= 2000 ? '#ffffff' : '#6b7280';

    const nameText = createSVGText(centerX, centerY - 8, district.split('-')[0], textColor, 'text-xs font-bold');
    svg.appendChild(nameText);

    const countText = createSVGText(centerX, centerY + 10, `${places}`, countColor, 'text-sm font-black');
    svg.appendChild(countText);
}

function createSVGText(x, y, content, fill, className) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('class', `${className} pointer-events-none`);
    text.setAttribute('fill', fill);
    text.textContent = content;
    return text;
}

function addMapInstruction(svg) {
    const instruction = createSVGText(400, 560, 'Fes click en cada districte per veure\'n els detalls', '#6b7280', 'text-base font-medium');
    svg.appendChild(instruction);
}

function showDistrictInfo(district, count, places) {
    const infoDiv = document.getElementById('districtInfo');
    document.getElementById('infoDistrictName').textContent = district;
    document.getElementById('infoResidences').textContent = count;
    document.getElementById('infoPlaces').textContent = places;
    infoDiv.classList.remove('hidden');
    infoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function createCharts(districtCounts, districtPlaces) {
    const districts = Object.keys(districtCounts).sort();
    const counts = districts.map(d => districtCounts[d]);
    const places = districts.map(d => districtPlaces[d]);

    const chartConfig = {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(251, 146, 60, 0.1)' },
                    ticks: { font: { size: 12 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    };

    new Chart(document.getElementById('districtChart'), {
        ...chartConfig,
        data: {
            labels: districts,
            datasets: [{
                label: 'Nombre de Residències',
                data: counts,
                backgroundColor: districts.map(d => getColorForCount(districtPlaces[d]).fill),
                borderColor: districts.map(d => getColorForCount(districtPlaces[d]).stroke),
                borderWidth: 2
            }]
        }
    });

    new Chart(document.getElementById('placesChart'), {
        ...chartConfig,
        data: {
            labels: districts,
            datasets: [{
                label: 'Total de Places',
                data: places,
                backgroundColor: 'rgba(234, 88, 12, 0.6)',
                borderColor: 'rgba(234, 88, 12, 1)',
                borderWidth: 2
            }]
        }
    });
}

function renderResidencesList(data) {
    const container = document.getElementById('residencesList');

    if (data.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-600 py-8">No s\'han trobat resultats</div>';
        return;
    }

    container.innerHTML = data.map(res => createResidenceCard(res)).join('');
}

function createResidenceCard(res) {
    const places = getPlacesFromResidence(res);
    const address = res.addresses?.[0] || {};
    const phone = res.values?.find(v => v.attribute_name === "Tel.")?.char_value || '';
    const email = res.values?.find(v => v.attribute_type === "email")?.email_value || '';

    return `
                <div class="border border-orange-200 p-4 hover:bg-orange-50 transition-all hover:shadow-md">
                    <div class="flex justify-between items-start gap-4">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-orange-900 mb-2">${res.name}</h4>
                            <p class="text-sm text-orange-700 mb-1">
                                ${address.address_name || ''} ${address.street_number_1 || ''}, ${address.neighborhood_name || ''}
                            </p>
                            <p class="text-sm text-orange-600 mb-2">
                                <strong>Districte:</strong> ${address.district_name || 'N/D'}
                            </p>
                            ${phone || email ? `
                                <div class="flex flex-wrap gap-3 text-xs text-orange-600">
                                    ${phone ? `<span class="flex items-center gap-1">📞 ${phone}</span>` : ''}
                                    ${email ? `<span class="flex items-center gap-1">✉️ ${email}</span>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <div class="flex-shrink-0">
                            <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 shadow-md">
                                <div class="text-xs font-semibold opacity-90">Places</div>
                                <div class="text-xl font-black">${places || 'N/D'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (!searchTerm) {
        STATE.filteredData = STATE.residenciesData;
    } else {
        STATE.filteredData = STATE.residenciesData.filter(res => {
            const name = (res.name || '').toLowerCase();
            const district = (res.addresses?.[0]?.district_name || '').toLowerCase();
            const neighborhood = (res.addresses?.[0]?.neighborhood_name || '').toLowerCase();
            return name.includes(searchTerm) || district.includes(searchTerm) || neighborhood.includes(searchTerm);
        });
    }

    renderResidencesList(STATE.filteredData);
});

loadData();

