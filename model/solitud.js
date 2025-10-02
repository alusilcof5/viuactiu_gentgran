// Cargar y consumir el JSON
async function loadStudyData() {
    try {
        const response = await window.fs.readFile('soledad.json', { encoding: 'utf8' });
        const data = JSON.parse(response);

        const dataset = data['@graph'].find(item => item['@type'] === 'dcat:Dataset');
        const publisher = data['@graph'].find(item => item['@type'] === 'foaf:Agent');
        const temporal = data['@graph'].find(item => item['@type'] === 'dct:PeriodOfTime');

        if (dataset) {
            // Obtener el título del dataset
            const title = dataset['dct:title']['@value'];
            
            // Buscar el h2 dentro de .header-text (no .hero-text)
            const headerTitle = document.querySelector('.header-text h2');
            if (headerTitle) {
                headerTitle.textContent = title;
            }

            // Obtener las distribuciones
            const distributions = dataset['dcat:distribution'].map(distRef => {
                return data['@graph'].find(item => item['@id'] === distRef['@id']);
            });

            // Extraer el tamaño de la muestra
            const totalSample = distributions[0]['dct:title']['@value'].match(/(\d+)\/Nacional/)?.[1] || '2,460';
            const totalMostraElement = document.getElementById('total-mostra');
            if (totalMostraElement) {
                totalMostraElement.textContent = totalSample;
            }

            // Procesar información temporal
            if (temporal) {
                const startDate = new Date(temporal['dcat:startDate']['@value']);
                const endDate = new Date(temporal['dcat:endDate']['@value']);
                const year = startDate.getFullYear();
                const months = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
                const startMonth = months[startDate.getMonth()];
                const endMonth = months[endDate.getMonth()];

                const studyNote = document.getElementById('study-note');
                if (studyNote) {
                    studyNote.innerHTML =
                        `<strong>Nota:</strong> Aquest estudi es va fer entre ${startMonth} i ${endMonth} de ${year}. Tot i que algunes coses han canviat, els consells i recursos continuen sent vàlids avui dia.`;
                }
            }

            // Información del publicador
            if (publisher) {
                const publisherName = publisher['foaf:name']['@value'];
                const studyNumber = title.match(/^(\d+)\|/)?.[1] || '2279';
                const footerStudy = document.getElementById('footer-study');
                if (footerStudy) {
                    footerStudy.textContent = `Font: ${publisherName} - Estudi ${studyNumber}`;
                }
            }

            console.log('Dades del JSON carregades correctament');
        }

    } catch (error) {
        console.error('Error al carregar soledad.json:', error);
        // Mantener el contenido por defecto del HTML si hay error
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStudyData);
} else {
    loadStudyData();
}