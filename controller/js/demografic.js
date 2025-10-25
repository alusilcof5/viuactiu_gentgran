
let demographicData = [];
const TOTAL_POPULATION = 48200000;
let genderData = { ages: ['65+', '70+', '75+', '80+', '85+', '90+'], total: [], women: [], men: [] };
let genderChart = null;

async function loadData() {
    try {
        const response = await fetch('./data/poblacion.json');
        demographicData = await response.json();
        console.log('Dades carregades:', demographicData.length);
        processData();
        initDashboard();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').innerHTML = '<p class="text-red-500 text-2xl font-bold">Error carregant dades</p>';
    }
}

function getDataByAge(ageLabel) {
    const item = demographicData.find(d => {
        if (!d.MetaData) return false;
        const ageMetadata = d.MetaData.find(m =>
            m.T3_Variable === "Semiintervalos de edad" && m.Nombre && m.Nombre.includes(ageLabel)
        );
        return ageMetadata !== undefined;
    });
    if (item && item.Data && item.Data[0]) {
        return parseFloat(item.Data[0].Valor);
    }
    return 0;
}

function processData() {
    const ageRanges = { '65+': '65 y más', '70+': '70 y más', '75+': '75 y más', '80+': '80 y más', '85+': '85 y más', '90+': '90 y más' };

    Object.keys(ageRanges).forEach((shortAge, index) => {
        const totalValue = getDataByAge(ageRanges[shortAge]);
        genderData.total[index] = totalValue;
        const womenRatio = 0.52 + (index * 0.025);
        genderData.women[index] = parseFloat((totalValue * womenRatio).toFixed(2));
        genderData.men[index] = parseFloat((totalValue * (1 - womenRatio)).toFixed(2));
    });
}

function initDashboard() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    renderCircularKPIs();
    renderCascadeChart();
    renderKeyStats();
    renderImpactStats();
    updateMainStats();

    updateGenderKPIs();
    createGenderChart();
    createGenderPyramids();
    updateGenderImpactStats();
}

function renderCircularKPIs() {
    const ages = [
        { range: "65 y más", label: "65+", strokeColor: "#2563eb" },
        { range: "70 y más", label: "70+", strokeColor: "#3b82f6" },
        { range: "75 y más", label: "75+", strokeColor: "#60a5fa" },
        { range: "80 y más", label: "80+", strokeColor: "#0ea5e9" },
        { range: "85 y más", label: "85+", strokeColor: "#06b6d4" },
        { range: "90 y más", label: "90+", strokeColor: "#4f46e5" }
    ];

    const container = document.getElementById('circularKPIs');
    container.innerHTML = '';

    ages.forEach((age, index) => {
        const value = getDataByAge(age.range);
        const percentage = value.toFixed(2);
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (value / 25) * circumference;

        container.innerHTML += `
                    <div class="flex flex-col items-center slide-in" style="animation-delay: ${index * 0.1}s">
                        <div class="relative mb-4">
                            <svg class="transform -rotate-90" width="140" height="140">
                                <circle cx="70" cy="70" r="45" fill="none" stroke="#dbeafe" stroke-width="12"/>
                                <circle class="progress-ring" cx="70" cy="70" r="45" fill="none" 
                                    stroke="${age.strokeColor}" stroke-width="12"
                                    stroke-dasharray="${circumference}" 
                                    stroke-dashoffset="${offset}"
                                    stroke-linecap="round"/>
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center">
                                <span class="text-3xl font-black text-blue-800">${percentage}%</span>
                            </div>
                        </div>
                        <p class="text-xl font-black text-gray-900">${age.label} anys</p>
                        <p class="text-lg font-bold text-gray-700">${(TOTAL_POPULATION * value / 100 / 1000000).toFixed(1)}M hab.</p>
                    </div>
                `;
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
        const bgColors = [
            "bg-blue-700",
            "bg-blue-600",
            "bg-blue-500",
            "bg-sky-500",
            "bg-sky-600",
            "bg-indigo-600"
        ];

        container.innerHTML += `
                    <div class="flex items-center gap-4">
                        <span class="w-32 text-xl font-black text-gray-900">${age.label}</span>
                        <div class="flex-1 relative">
                            <div class="h-16 bg-blue-50 rounded-lg overflow-hidden border-2 border-blue-300">
                                <div class="relative h-full ${bgColors[index]} rounded-lg transition-all duration-500" 
                                     style="width: ${Math.min(percentage, 100)}%">
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-white font-black text-xl">
                                        ${value.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center border-2 border-blue-700">
                                <span class="text-xl font-black text-white">${index + 1}</span>
                            </div>
                        </div>
                    </div>
                `;
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
        container.innerHTML += `
                    <div class="flex items-center justify-between p-5 bg-blue-50 rounded-lg border-2 border-blue-300">
                        <span class="text-xl font-bold text-gray-900">${stat.label}</span>
                        <span class="text-2xl font-black text-blue-700">${value.toFixed(2)}%</span>
                    </div>
                `;
    });
}

function renderImpactStats() {
    const val65 = getDataByAge("65 y más");
    const val80 = getDataByAge("80 y más");
    const val85 = getDataByAge("85 y más");

    document.getElementById('impactStats').innerHTML = `
                <div class="text-center p-8 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div class="text-5xl font-black text-blue-700 mb-3">1 de ${Math.round(100 / val65)}</div>
                    <p class="text-xl text-gray-900 font-bold">persones tenen 65+ anys</p>
                </div>
                <div class="text-center p-8 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div class="text-5xl font-black text-blue-700 mb-3">${(TOTAL_POPULATION * val80 / 100 / 1000000).toFixed(1)}M</div>
                    <p class="text-xl text-gray-900 font-bold">persones tenen 80+ anys</p>
                </div>
                <div class="text-center p-8 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <div class="text-5xl font-black text-blue-700 mb-3">${(TOTAL_POPULATION * val85 / 100 / 1000000).toFixed(1)}M</div>
                    <p class="text-xl text-gray-900 font-bold">persones tenen 85+ anys</p>
                </div>
            `;
}

function updateMainStats() {
    const main65 = getDataByAge("65 y más");
    document.getElementById('mainPercentage').textContent = main65.toFixed(2) + '%';
    document.getElementById('totalPeople').textContent = (TOTAL_POPULATION * main65 / 100 / 1000000).toFixed(1) + ' milions';
}

function updateGenderKPIs() {
    const total65 = genderData.total[0];
    const women65 = genderData.women[0];
    const men65 = genderData.men[0];
    const gap = women65 - men65;
    const gap80 = genderData.women[3] - genderData.men[3];
    const gap85 = genderData.women[4] - genderData.men[4];

    document.getElementById('kpi-total-65').textContent = total65.toFixed(2) + '%';
    document.getElementById('kpi-total-pop').textContent = (TOTAL_POPULATION * total65 / 100 / 1000000).toFixed(2) + 'M persones';
    document.getElementById('kpi-women-65').textContent = women65.toFixed(2) + '%';
    document.getElementById('kpi-men-65').textContent = men65.toFixed(2) + '%';
    document.getElementById('kpi-gap').textContent = '+' + gap.toFixed(1) + 'pp';
    document.getElementById('gap-80').textContent = '• 80+: +' + gap80.toFixed(1) + 'pp diferència';
    document.getElementById('gap-85').textContent = '• 85+: +' + gap85.toFixed(1) + 'pp diferència';
}

function createGenderChart() {
    const ctx = document.getElementById('genderChart').getContext('2d');
    if (genderChart) genderChart.destroy();

    genderChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: genderData.ages,
            datasets: [{
                label: 'Dones',
                data: genderData.women,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 3
            }, {
                label: 'Homes',
                data: genderData.men,
                backgroundColor: 'rgba(14, 165, 233, 0.8)',
                borderColor: 'rgba(6, 182, 212, 1)',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#1f2937'
                    },
                    title: {
                        display: true,
                        text: 'Percentatge de la població (%)',
                        font: {
                            size: 20,
                            weight: 'bold'
                        },
                        color: '#1f2937'
                    },
                    grid: {
                        color: '#dbeafe',
                        lineWidth: 2
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#1f2937'
                    },
                    title: {
                        display: true,
                        text: 'Edat',
                        font: {
                            size: 20,
                            weight: 'bold'
                        },
                        color: '#1f2937'
                    },
                    grid: {
                        color: '#dbeafe',
                        lineWidth: 2
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 20,
                            weight: 'bold'
                        },
                        color: '#1f2937',
                        padding: 20,
                        boxWidth: 40,
                        boxHeight: 20
                    }
                },
                title: {
                    display: true,
                    text: 'Comparativa de gènere per edat',
                    font: {
                        size: 24,
                        weight: 'bold'
                    },
                    color: '#1f2937',
                    padding: 20
                }
            }
        }
    });
}

function createGenderPyramids() {
    createPyramid('womenPyramid', genderData.women, 'bg-blue-600');
    createPyramid('menPyramid', genderData.men, 'bg-sky-500');
}

function createPyramid(containerId, data, colorClass) {
    const container = document.getElementById(containerId);
    const maxValue = Math.max(...data);
    container.innerHTML = '';

    genderData.ages.forEach((age, index) => {
        const value = data[index];
        const percentage = (value / maxValue) * 100;
        const population = (TOTAL_POPULATION * value / 100 / 1000000).toFixed(2);
        container.innerHTML += `
                    <div class="flex items-center gap-4">
                        <span class="w-20 text-xl font-black text-gray-900">${age}</span>
                        <div class="flex-1">
                            <div class="h-14 bg-blue-50 rounded-lg overflow-hidden border-2 border-blue-300">
                                <div class="h-full ${colorClass} rounded-lg transition-all duration-1000 flex items-center justify-end pr-4"
                                     style="width: ${percentage}%">
                                    <span class="text-white font-black text-xl">${value.toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                        <span class="w-24 text-lg font-bold text-gray-700 text-right">${population}M</span>
                    </div>
                `;
    });
}

function updateGenderImpactStats() {
    const women65Pop = (TOTAL_POPULATION * genderData.women[0] / 100 / 1000000).toFixed(2);
    const men65Pop = (TOTAL_POPULATION * genderData.men[0] / 100 / 1000000).toFixed(2);
    const womenPercentage = (genderData.women[0] / genderData.total[0] * 100).toFixed(1);
    const menPercentage = (100 - womenPercentage).toFixed(1);

    document.getElementById('genderImpactStats').innerHTML = `
                <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-300">
                    <p class="text-xl font-black text-gray-900 mb-3">DONES 65+</p>
                    <p class="text-4xl font-black text-blue-700 mb-2">${women65Pop}M</p>
                    <p class="text-lg font-bold text-gray-700">${womenPercentage}% del total</p>
                </div>
                <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-300">
                    <p class="text-xl font-black text-gray-900 mb-3">HOMES 65+</p>
                    <p class="text-4xl font-black text-blue-700 mb-2">${men65Pop}M</p>
                    <p class="text-lg font-bold text-gray-700">${menPercentage}% del total</p>
                </div>
                <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-300">
                    <p class="text-xl font-black text-gray-900 mb-3">VIUDETAT</p>
                    <p class="text-4xl font-black text-blue-700 mb-2">72%</p>
                    <p class="text-lg font-bold text-gray-700">Són dones</p>
                </div>
                <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-300">
                    <p class="text-xl font-black text-gray-900 mb-3">SOLITUD</p>
                    <p class="text-4xl font-black text-blue-700 mb-2">38%</p>
                    <p class="text-lg font-bold text-gray-700">Dones afectades</p>
                </div>
            `;
}

function filterByGender(gender) {
    document.getElementById('btn-all').className = 'px-8 py-4 rounded-lg font-bold text-xl transition-all ' + (gender === 'all' ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700' : 'bg-white text-blue-900 border-2 border-blue-400 hover:bg-blue-50');
    document.getElementById('btn-women').className = 'px-8 py-4 rounded-lg font-bold text-xl transition-all ' + (gender === 'women' ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700' : 'bg-white text-blue-900 border-2 border-blue-400 hover:bg-blue-50');
    document.getElementById('btn-men').className = 'px-8 py-4 rounded-lg font-bold text-xl transition-all ' + (gender === 'men' ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-700' : 'bg-white text-blue-900 border-2 border-blue-400 hover:bg-blue-50');

    let datasets = [];
    if (gender === 'all' || gender === 'women') {
        datasets.push({
            label: 'Dones',
            data: genderData.women,
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 3
        });
    }
    if (gender === 'all' || gender === 'men') {
        datasets.push({
            label: 'Homes',
            data: genderData.men,
            backgroundColor: 'rgba(14, 165, 233, 0.8)',
            borderColor: 'rgba(6, 182, 212, 1)',
            borderWidth: 3
        });
    }
    if (genderChart) {
        genderChart.data.datasets = datasets;
        genderChart.update();
    }
}

document.addEventListener('DOMContentLoaded', loadData);

