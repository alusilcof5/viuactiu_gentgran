
// Dades del JSON CIS
const cisData = {
    estudi: "2279",
    titol: "LA SOLEDAD EN LAS PERSONAS MAYORES",
    participants: 2460,
    ambit: "Nacional",
    sexe: "ambos sexos",
    edat: "65 y más años",
    metodologia: "entrevista personal",
    periodeInici: "1998-02-04",
    periodeFi: "1998-04-16",
    actualitzacio: "2024-01-15"
};

// Dades d'anàlisi per gènere
const studyData = [
    { categoria: "Viuen soles", dones: 70, homes: 30 },
    { categoria: "Se senten soles", dones: 19.85, homes: 12 },
    { categoria: "Programes", dones: 82, homes: 18 }
];

const colors = {
    dones: "#9333EA",
    homes: "#3B82F6"
};

// Funció per toggle accordion
function toggleAccordion(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const icon = document.getElementById(`icon-${sectionId}`);

    // Tancar tots els altres accordions
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item.id !== `content-${sectionId}`) {
            item.classList.remove('active');
        }
    });
    document.querySelectorAll('.rotate-icon').forEach(item => {
        if (item.id !== `icon-${sectionId}`) {
            item.classList.remove('active');
        }
    });

    // Toggle actual
    content.classList.toggle('active');
    icon.classList.toggle('active');

    // Si s'obre, inicialitzar el gràfic
    if (content.classList.contains('active')) {
        setTimeout(() => {
            switch (sectionId) {
                case 'section1':
                    createBarChart();
                    break;
                case 'section2':
                    createDonutCharts();
                    break;
                case 'section3':
                    createRadarChart();
                    break;
                case 'section4':
                    createSunburstChart();
                    break;
            }
        }, 100);
    }
}

// 1. GRÀFIC DE BARRES AMB PLOTLY
function createBarChart() {
    if (document.getElementById('barChart').innerHTML) return;

    const traceDones = {
        x: studyData.map(d => d.categoria),
        y: studyData.map(d => d.dones),
        name: 'Dones',
        type: 'bar',
        marker: {
            color: colors.dones,
            line: { width: 0 }
        },
        text: studyData.map(d => d.dones + '%'),
        textposition: 'outside',
        textfont: { size: 14, color: colors.dones, family: 'Inter', weight: 700 },
        hovertemplate: '<b>Dones</b><br>%{x}<br><b>%{y}%</b><extra></extra>'
    };

    const traceHomes = {
        x: studyData.map(d => d.categoria),
        y: studyData.map(d => d.homes),
        name: 'Homes',
        type: 'bar',
        marker: {
            color: colors.homes,
            line: { width: 0 }
        },
        text: studyData.map(d => d.homes + '%'),
        textposition: 'outside',
        textfont: { size: 14, color: colors.homes, family: 'Inter', weight: 700 },
        hovertemplate: '<b>Homes</b><br>%{x}<br><b>%{y}%</b><extra></extra>'
    };

    const layout = {
        barmode: 'group',
        bargap: 0.3,
        bargroupgap: 0.1,
        yaxis: {
            title: 'Percentatge (%)',
            range: [0, 100],
            gridcolor: '#f3f4f6',
            titlefont: { size: 14, family: 'Inter', weight: 600 }
        },
        xaxis: {
            titlefont: { size: 14, family: 'Inter', weight: 600 }
        },
        font: { family: 'Inter' },
        plot_bgcolor: 'white',
        paper_bgcolor: 'white',
        margin: { t: 20, r: 20, b: 80, l: 60 },
        legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: -0.3,
            xanchor: 'center',
            x: 0.5,
            font: { size: 14, weight: 600 }
        },
        hoverlabel: {
            bgcolor: 'white',
            bordercolor: '#e5e7eb',
            font: { family: 'Inter', size: 13 }
        }
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('barChart', [traceDones, traceHomes], layout, config);
}

// 2. GRÀFICS DE ROSCA
function createDonutCharts() {
    if (document.getElementById('donut1').innerHTML) return;

    createDonutChart('donut1', [70, 30], ['Dones', 'Homes']);
    createDonutChart('donut2', [19.85, 80.15], ['Dones', 'Homes']);
    createDonutChart('donut3', [82, 18], ['Dones', 'Homes']);
}

function createDonutChart(containerId, values, labels) {
    const data = [{
        values: values,
        labels: labels,
        type: 'pie',
        hole: 0.6,
        marker: {
            colors: [colors.dones, colors.homes],
            line: { color: 'white', width: 3 }
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        textfont: { size: 12, family: 'Inter', weight: 600 },
        hovertemplate: '<b>%{label}</b><br>%{value}%<br>(%{percent})<extra></extra>'
    }];

    const layout = {
        showlegend: false,
        margin: { t: 0, r: 0, b: 0, l: 0 },
        paper_bgcolor: 'white',
        font: { family: 'Inter' },
        height: 250,
        annotations: [{
            text: values[0].toFixed(1) + '%',
            x: 0.5,
            y: 0.5,
            font: { size: 28, weight: 700, color: '#1f2937', family: 'Inter' },
            showarrow: false
        }],
        hoverlabel: {
            bgcolor: 'white',
            bordercolor: '#e5e7eb',
            font: { family: 'Inter', size: 13 }
        }
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot(containerId, data, layout, config);
}

// 3. GRÀFIC RADAR
function createRadarChart() {
    if (document.getElementById('radarChart').innerHTML) return;

    const categories = ['Viudetat', 'Solitud<br>Emocional', 'Xarxes<br>Socials', 'Ús de<br>Programes', 'Autonomia', 'Salut<br>Percebuda'];

    const traceDones = {
        type: 'scatterpolar',
        r: [82, 19.85, 65, 82, 58, 62],
        theta: categories,
        fill: 'toself',
        name: 'Dones',
        marker: { color: colors.dones },
        line: { color: colors.dones, width: 3 },
        fillcolor: colors.dones,
        opacity: 0.6,
        hovertemplate: '<b>Dones</b><br>%{theta}<br><b>%{r}%</b><extra></extra>'
    };

    const traceHomes = {
        type: 'scatterpolar',
        r: [18, 12, 45, 18, 65, 68],
        theta: categories,
        fill: 'toself',
        name: 'Homes',
        marker: { color: colors.homes },
        line: { color: colors.homes, width: 3 },
        fillcolor: colors.homes,
        opacity: 0.6,
        hovertemplate: '<b>Homes</b><br>%{theta}<br><b>%{r}%</b><extra></extra>'
    };

    const layout = {
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 100],
                tickfont: { size: 11, family: 'Inter' },
                gridcolor: '#e5e7eb'
            },
            angularaxis: {
                tickfont: { size: 12, family: 'Inter', weight: 600 }
            }
        },
        showlegend: true,
        legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: -0.15,
            xanchor: 'center',
            x: 0.5,
            font: { size: 14, weight: 600, family: 'Inter' }
        },
        font: { family: 'Inter' },
        paper_bgcolor: 'white',
        margin: { t: 40, r: 80, b: 80, l: 80 },
        hoverlabel: {
            bgcolor: 'white',
            bordercolor: '#e5e7eb',
            font: { family: 'Inter', size: 13 }
        }
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('radarChart', [traceDones, traceHomes], layout, config);
}

// 4. SUNBURST
function createSunburstChart() {
    if (document.getElementById('sunburstChart').innerHTML) return;

    const data = [{
        type: 'sunburst',
        labels: [
            'Solitud',
            'Dones', 'Homes',
            'Viudetat D', 'Emocional D', 'Econòmica D',
            'Viudetat H', 'Social H', 'Expressió H',
            'Vídues >70', 'Buit afectiu', 'Pensions baixes',
            'Viudos >70', 'Manca amistats', 'Dificultat emocions'
        ],
        parents: [
            '',
            'Solitud', 'Solitud',
            'Dones', 'Dones', 'Dones',
            'Homes', 'Homes', 'Homes',
            'Viudetat D', 'Emocional D', 'Econòmica D',
            'Viudetat H', 'Social H', 'Expressió H'
        ],
        values: [
            100,
            70, 30,
            28, 20, 22,
            9, 13, 8,
            28, 20, 22,
            9, 13, 8
        ],
        marker: {
            colors: [
                '#6b7280',
                colors.dones, colors.homes,
                '#c084fc', '#a855f7', '#9333ea',
                '#60a5fa', '#3b82f6', '#2563eb',
                '#e9d5ff', '#d8b4fe', '#c084fc',
                '#bfdbfe', '#93c5fd', '#60a5fa'
            ],
            line: { color: 'white', width: 3 }
        },
        textfont: { size: 16, family: 'Inter', weight: 700, color: 'white' },
        insidetextorientation: 'radial',
        hovertemplate: '<b style="font-size:16px">%{label}</b><br><span style="font-size:15px">Valor: %{value}%</span><extra></extra>',
        hoverlabel: {
            bgcolor: '#1f2937',
            bordercolor: '#374151',
            font: { family: 'Inter', size: 16, color: 'white' }
        }
    }];

    const layout = {
        margin: { t: 10, r: 10, b: 10, l: 10 },
        paper_bgcolor: 'white',
        font: { family: 'Inter', size: 16 }
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('sunburstChart', data, layout, config);
}
