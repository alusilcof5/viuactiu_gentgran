
let demographicData = [];
const TOTAL_POPULATION = 48200000;

async function loadData() {
    try {
        if (window.fs) {
            const fileContent = await window.fs.readFile('./data/poblacion.json', { encoding: 'utf8' });
            demographicData = JSON.parse(fileContent);
        } else {
            const response = await fetch('./data/poblacion.json');
            demographicData = await response.json();
        }

        console.log('Dades carregades:', demographicData.length, 'registres');
        initDashboard();
    } catch (error) {
        console.error('Error carregant dades:', error);
        document.getElementById('loading').innerHTML = '<p class="text-red-500 font-medium">Error en carregar les dades. Verifica l\'arxiu poblacion.json</p>';
    }
}

function getDataByAge(ageLabel) {
    const item = demographicData.find(d => {
        if (!d.MetaData || !Array.isArray(d.MetaData)) return false;

        const ageMetadata = d.MetaData.find(m =>
            m.T3_Variable === "Semiintervalos de edad" &&
            m.Nombre &&
            m.Nombre.includes(ageLabel)
        );

        return ageMetadata !== undefined;
    });

    if (item && item.Data && item.Data[0] && item.Data[0].Valor) {
        return parseFloat(item.Data[0].Valor);
    }
    return 0;
}

function initDashboard() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    renderCircularKPIs();
    renderCascadeChart();
    renderKeyStats();
    renderImpactStats();
    updateMainStats();
}

function renderCircularKPIs() {
    const ages = [
        { range: "65 y más", label: "65+", color: "emerald" },
        { range: "70 y más", label: "70+", color: "emerald" },
        { range: "75 y más", label: "75+", color: "green" },
        { range: "80 y más", label: "80+", color: "green" },
        { range: "85 y más", label: "85+", color: "cyan" },
        { range: "90 y más", label: "90+", color: "cyan" }
    ];

    const container = document.getElementById('circularKPIs');
    container.innerHTML = '';

    ages.forEach((age, index) => {
        const value = getDataByAge(age.range);
        const percentage = value.toFixed(2);
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (value / 25) * circumference;

        const html = `
                    <div class="flex flex-col items-center slide-in" style="animation-delay: ${index * 0.1}s">
                        <div class="relative mb-3">
                            <svg class="transform -rotate-90" width="120" height="120">
                                <circle cx="60" cy="60" r="45" fill="none" stroke="#d1fae5" stroke-width="10"/>
                                <circle class="progress-ring" cx="60" cy="60" r="45" fill="none" 
                                    stroke="#10b981" stroke-width="10"
                                    stroke-dasharray="${circumference}" 
                                    stroke-dashoffset="${offset}"
                                    stroke-linecap="round"/>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-2xl font-black text-${age.color}-700">${percentage}%</span>
                            </div>
                        </div>
                        <p class="text-sm font-bold text-gray-700">${age.label} anys</p>
                        <p class="text-xs text-gray-500">${(TOTAL_POPULATION * value / 100 / 1000000).toFixed(1)}M hab.</p>
                    </div>
                `;
        container.innerHTML += html;
    });
}

function renderCascadeChart() {
    const ages = [
        { range: "65 y más", label: "65+ anys" },
        { range: "70 y más", label: "70+ anys" },
        { range: "75 y más", label: "75+ anys" },
        { range: "80 y más", label: "80+ anys" },
        { range: "85 y más", label: "85+ anys" },
        { range: "90 y más", label: "90+ anys" }
    ];

    const container = document.getElementById('cascadeChart');
    container.innerHTML = '';
    const maxValue = getDataByAge("65 y más");

    ages.forEach((age, index) => {
        const value = getDataByAge(age.range);
        const percentage = (value / maxValue) * 100;

        const colorClasses = [
            "from-green-700 to-emerald-600",
            "from-green-600 to-emerald-500",
            "from-emerald-600 to-teal-500",
            "from-emerald-500 to-green-400",
            "from-green-500 to-lime-400",
            "from-lime-500 to-green-400"
        ];
        const colorClass = colorClasses[index % colorClasses.length];

        const extraShift = index === ages.length - 1 ? "translate-x-[1.5rem]" : "";

        const html = `
                    <div class="flex items-center gap-4">
                        <span class="w-24 text-sm font-bold text-gray-800">${age.label}</span>
                        <div class="flex-1 relative">
                            <div class="h-12 bg-gray-100 rounded-lg overflow-hidden">
                                <div class="relative h-full bg-gradient-to-r ${colorClass} rounded-lg transition-all duration-1000" 
                                     style="width: ${Math.min(percentage, 100)}%">
                                    <span class="absolute right-3 top-1/2 -translate-y-1/2 ${extraShift} text-white font-bold text-sm drop-shadow">
                                        ${value.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <div class="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full shadow-lg flex items-center justify-center">
                                <span class="text-xs font-bold text-white">${index + 1}</span>
                            </div>
                        </div>
                    </div>
                `;
        container.innerHTML += html;
    });
}

function renderKeyStats() {
    const stats = [
        { label: "Població 70+", range: "70 y más" },
        { label: "Població 75+", range: "75 y más" },
        { label: "Població 80+", range: "80 y más" },
        { label: "Població 85+", range: "85 y más" }
    ];

    const container = document.getElementById('keyStats');
    container.innerHTML = '';

    stats.forEach(stat => {
        const value = getDataByAge(stat.range);
        const html = `
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                        <span class="text-sm font-medium text-gray-700">${stat.label}</span>
                        <span class="text-lg font-bold text-emerald-700">${value.toFixed(2)}%</span>
                    </div>
                `;
        container.innerHTML += html;
    });
}

function renderImpactStats() {
    const val65 = getDataByAge("65 y más");
    const val80 = getDataByAge("80 y más");
    const val85 = getDataByAge("85 y más");

    const container = document.getElementById('impactStats');
    container.innerHTML = `
                <div class="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                    <div class="text-4xl font-black text-emerald-700 mb-2">1 de ${Math.round(100 / val65)}</div>
                    <p class="text-sm text-gray-600 font-medium">persones tenen 65+ anys</p>
                </div>
                <div class="text-center p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg">
                    <div class="text-4xl font-black text-teal-700 mb-2">${(TOTAL_POPULATION * val80 / 100 / 1000000).toFixed(1)}M</div>
                    <p class="text-sm text-gray-600 font-medium">persones tenen 80+ anys</p>
                </div>
                <div class="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg">
                    <div class="text-4xl font-black text-green-700 mb-2">${(TOTAL_POPULATION * val85 / 100 / 1000000).toFixed(1)}M</div>
                    <p class="text-sm text-gray-600 font-medium">persones tenen 85+ anys</p>
                </div>
            `;
}

function updateMainStats() {
    const main65 = getDataByAge("65 y más");
    document.getElementById('mainPercentage').textContent = main65.toFixed(2) + '%';
    document.getElementById('totalPeople').textContent =
        (TOTAL_POPULATION * main65 / 100 / 1000000).toFixed(1) + ' milions';
}

document.addEventListener('DOMContentLoaded', loadData);
