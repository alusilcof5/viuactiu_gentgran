
let rawData = [];

async function loadData() {
    try {
        let jsonData;
        if (window.fs && window.fs.readFile) {
            const fileContent = await window.fs.readFile('./data/centres.json', { encoding: 'utf8' });
            jsonData = JSON.parse(fileContent);
        } else {
            const response = await fetch('./data/centres.json');
            jsonData = await response.json();
        }

        // Filtrar solo centros de día
        rawData = Array.isArray(jsonData) ? jsonData : [jsonData];
        rawData = rawData.filter(centre => {
            const name = centre.name?.toLowerCase() || '';
            return name.includes('centre de dia') || name.includes('centro de día');
        });

        console.log('Centres de dia carregats:', rawData.length);

        if (rawData.length === 0) {
            throw new Error('No s\'han trobat centres de dia al fitxer');
        }

        initDashboard();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').innerHTML = `
                    <div class="text-center text-red-600 py-8">
                        <p class="font-bold mb-2">Error carregant dades</p>
                        <p class="text-sm">${error.message}</p>
                    </div>
                `;
    }
}

function initDashboard() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    updateDashboard(rawData);

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = rawData.filter(centre => {
            const district = centre.addresses?.[0]?.district_name?.toLowerCase() || '';
            const neighborhood = centre.addresses?.[0]?.neighborhood_name?.toLowerCase() || '';
            const name = centre.name?.toLowerCase() || '';
            return district.includes(search) || neighborhood.includes(search) || name.includes(search);
        });
        updateDashboard(filtered);
    });
}

function updateDashboard(data) {
    // Calcular estadísticas
    const totalCentres = data.length;
    let totalPlaces = 0;
    const districtData = {};

    data.forEach(centre => {

        const placesAttr = centre.attribute_categories
            ?.flatMap(cat => cat.attributes || [])
            .find(attr => attr.name === "Nombre de  places");

        const places = placesAttr?.values?.[0]?.integer_value || 0;
        totalPlaces += places;


        const district = centre.addresses?.[0]?.district_name || 'Desconegut';
        if (!districtData[district]) {
            districtData[district] = { centres: 0, places: 0 };
        }
        districtData[district].centres += 1;
        districtData[district].places += places;
    });

    const avgPlaces = totalCentres > 0 ? Math.round(totalPlaces / totalCentres) : 0;


    document.getElementById('totalCentres').textContent = totalCentres;
    document.getElementById('totalPlaces').textContent = totalPlaces;
    document.getElementById('avgPlaces').textContent = avgPlaces;


    updateBarcelonaMap(districtData);


    updateDistrictChart(districtData);


    updateCentresList(data);
}

function updateBarcelonaMap(districtData) {

    const districtPaths = {
        'Ciutat Vella': 'M430,400 L490,360 L530,380 L550,420 L510,460 L450,440 Z',
        'Eixample': 'M350,330 L430,400 L450,440 L390,480 L330,420 Z',
        'Sants-Montjuïc': 'M250,440 L330,420 L390,480 L370,580 L280,560 Z',
        'Les Corts': 'M220,340 L300,320 L350,330 L330,420 L250,440 Z',
        'Sarrià-Sant Gervasi': 'M220,230 L300,210 L340,250 L320,320 L240,320 Z',
        'Gràcia': 'M300,210 L380,190 L420,240 L370,310 L300,320 Z',
        'Horta-Guinardó': 'M370,150 L470,120 L510,200 L440,260 L380,200 Z',
        'Nou Barris': 'M310,100 L410,80 L470,120 L410,160 L330,140 Z',
        'Sant Andreu': 'M470,120 L580,100 L620,180 L540,220 L480,200 Z',
        'Sant Martí': 'M510,220 L620,200 L660,310 L580,370 L530,330 Z'
    };

    const svg = document.getElementById('barcelonaMap');
    svg.setAttribute('viewBox', '0 0 900 700');
    svg.innerHTML = '';


    const values = Object.values(districtData).map(d => d.centres);
    const min = Math.min(...values);
    const max = Math.max(...values);

    function getColor(value) {
        if (max === min) return '#c4b5fd';
        const t = (value - min) / (max - min);
        const start = [196, 181, 253];
        const end = [124, 58, 237];
        const rgb = start.map((s, i) => Math.round(s + (end[i] - s) * t));
        return `rgb(${rgb.join(',')})`;
    }

    Object.entries(districtPaths).forEach(([district, path]) => {
        const data = districtData[district] || { centres: 0, places: 0 };
        const fillColor = getColor(data.centres);
        const strokeColor = '#5b21b6';

        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('fill', fillColor);
        pathElement.setAttribute('stroke', strokeColor);
        pathElement.setAttribute('stroke-width', '4');
        pathElement.setAttribute('opacity', '0.9');
        pathElement.classList.add('cursor-pointer', 'transition-all', 'duration-300');

        pathElement.addEventListener('mouseenter', function () {
            this.setAttribute('opacity', '1');
            this.setAttribute('stroke-width', '6');
        });
        pathElement.addEventListener('mouseleave', function () {
            this.setAttribute('opacity', '0.9');
            this.setAttribute('stroke-width', '4');
        });
        pathElement.addEventListener('click', function () {
            showDistrictInfo(district, data.centres, data.places);
        });

        const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = `${district}: ${data.centres} centre${data.centres !== 1 ? 's' : ''}, ${data.places} places`;
        pathElement.appendChild(title);

        svg.appendChild(pathElement);

        const pathBox = pathElement.getBBox();
        const centerX = pathBox.x + pathBox.width / 2;
        const centerY = pathBox.y + pathBox.height / 2;

        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', centerX);
        textElement.setAttribute('y', centerY);
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.setAttribute('class', 'text-sm md:text-base font-bold pointer-events-none');
        textElement.setAttribute('fill', data.centres >= (max * 0.6) ? '#ffffff' : '#333333');
        textElement.textContent = district.split('-')[0];
        svg.appendChild(textElement);

        const countElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        countElement.setAttribute('x', centerX);
        countElement.setAttribute('y', centerY + 20);
        countElement.setAttribute('text-anchor', 'middle');
        countElement.setAttribute('dominant-baseline', 'middle');
        countElement.setAttribute('class', 'text-xs md:text-sm font-medium pointer-events-none');
        countElement.setAttribute('fill', data.centres >= (max * 0.6) ? '#ffffff' : '#555555');
        countElement.textContent = `${data.centres} centre${data.centres !== 1 ? 's' : ''}`;
        svg.appendChild(countElement);
    });

    // ---- Leyenda de color ----
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'heatScale';
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('y2', '0%');
    ['#c4b5fd', '#7c3aed'].forEach((color, i) => {
        const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop.setAttribute('offset', i * 100 + '%');
        stop.setAttribute('stop-color', color);
        gradient.appendChild(stop);
    });
    defs.appendChild(gradient);
    svg.appendChild(defs);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '280');
    rect.setAttribute('y', '600');
    rect.setAttribute('width', '340');
    rect.setAttribute('height', '20');
    rect.setAttribute('fill', 'url(#heatScale)');
    rect.setAttribute('rx', '3');
    svg.appendChild(rect);

    const minText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    minText.setAttribute('x', '270');
    minText.setAttribute('y', '615');
    minText.setAttribute('text-anchor', 'end');
    minText.setAttribute('class', 'text-sm fill-gray-600');
    minText.textContent = `${min} centres`;
    svg.appendChild(minText);

    const maxText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maxText.setAttribute('x', '630');
    maxText.setAttribute('y', '615');
    maxText.setAttribute('text-anchor', 'start');
    maxText.setAttribute('class', 'text-sm fill-gray-600');
    maxText.textContent = `${max} centres`;
    svg.appendChild(maxText);

    // ---- Texto guía ----
    const guideText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    guideText.setAttribute('x', '450');
    guideText.setAttribute('y', '650');
    guideText.setAttribute('text-anchor', 'middle');
    guideText.setAttribute('class', 'text-base font-medium fill-gray-600');
    guideText.textContent = "Fes clic en un districte per veure'n els detalls";
    svg.appendChild(guideText);
}


function showDistrictInfo(district, centres, places) {
    const infoDiv = document.getElementById('districtInfo');
    document.getElementById('infoDistrictName').textContent = district;
    document.getElementById('infoCentres').textContent = centres;
    document.getElementById('infoPlaces').textContent = places;
    infoDiv.classList.remove('hidden');
    infoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateDistrictChart(districtData) {
    const sorted = Object.entries(districtData)
        .map(([district, data]) => ({ district, ...data }))
        .sort((a, b) => b.places - a.places);

    const maxValue = sorted[0]?.places || 1;
    const container = document.getElementById('districtChart');
    document.getElementById('countDistricts').textContent = sorted.length;

    container.innerHTML = sorted.map((d, i) => {
        const percentage = (d.places / maxValue) * 100;
        const colorIndex = i % 3;
        const colors = [
            { from: 'from-purple-500', to: 'to-purple-700', bg: 'bg-purple-100', text: 'text-purple-700' },
            { from: 'from-violet-500', to: 'to-violet-700', bg: 'bg-violet-100', text: 'text-violet-700' },
            { from: 'from-indigo-500', to: 'to-indigo-700', bg: 'bg-indigo-100', text: 'text-indigo-700' }
        ];
        const color = colors[colorIndex];

        return `
                    <div class="flex items-center gap-4">
                        <div class="w-40 flex-shrink-0">
                            <p class="text-sm font-bold text-gray-800 truncate" title="${d.district}">${d.district}</p>
                            <p class="text-xs text-gray-500">${d.centres} centre${d.centres !== 1 ? 's' : ''}</p>
                        </div>
                        <div class="flex-1 h-12 ${color.bg} overflow-hidden relative">
                            <div class="h-full bg-gradient-to-r ${color.from} ${color.to} transition-all duration-700 flex items-center justify-between px-4" style="width: ${percentage}%">
                                <span class="text-white font-bold text-sm">${d.places} places</span>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');
}

function updateCentresList(data) {
    const container = document.getElementById('centresList');

    if (data.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No s\'han trobat centres amb els criteris de cerca</p>';
        return;
    }

    container.innerHTML = data.map(centre => {
        const placesAttr = centre.attribute_categories
            ?.flatMap(cat => cat.attributes || [])
            .find(attr => attr.name === "Nombre de  places");

        const places = placesAttr?.values?.[0]?.integer_value || 'N/D';
        const address = centre.addresses?.[0] || {};
        const phone = centre.values?.find(v => v.attribute_name === "Tel.")?.char_value || '';
        const email = centre.values?.find(v => v.attribute_type === "email")?.email_value || '';

        return `
                    <div class="border border-purple-200 p-4 hover:bg-purple-50 transition-colors">
                        <div class="flex justify-between items-start gap-4">
                            <div class="flex-1">
                                <h4 class="font-bold text-purple-900 mb-2">${centre.name}</h4>
                                <div class="space-y-1 text-sm text-gray-600">
                                    <p><strong>Adreça:</strong> ${address.address_name || ''} ${address.street_number_1 || ''}</p>
                                    <p><strong>Barri:</strong> ${address.neighborhood_name || 'N/D'} | <strong>Districte:</strong> ${address.district_name || 'N/D'}</p>
                                    ${phone ? `<p><strong>Tel:</strong> ${phone}</p>` : ''}
                                    ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                                </div>
                            </div>
                            <div class="bg-gradient-to-br from-purple-100 to-violet-100 px-4 py-2 text-center flex-shrink-0">
                                <p class="text-2xl font-black text-purple-700">${places}</p>
                                <p class="text-xs text-purple-600">places</p>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', loadData);
