# Replication Guide

## Objective

This guide provides concise instructions to adapt ViuActiu Gent Gran to other territories using their own open data sources.

**Estimated implementation time**: 2-3 hours

---

## Prerequisites

- Open data portal of the target territory
- Datasets of residences or centers for elderly people in CSV or JSON format
- Basic knowledge of HTML, CSS and JavaScript
- Git installed
- GitHub account (optional, for version control)

---

## Step 1: Obtain Source Code

```bash
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran
```

---

## Step 2: Identify Open Data Sources

### Open Data Portals by Autonomous Community

| Autonomous Community | Data Portal |
|---------------------|-------------|
| Catalunya | https://analisi.transparenciacatalunya.cat |
| Madrid | https://datos.madrid.es |
| Valencia | https://www.valencia.es/dadesobertes |
| Andalucía | https://www.juntadeandalucia.es/datosabiertos |
| País Vasco | https://opendata.euskadi.eus |
| Galicia | https://abertos.xunta.gal |
| Aragón | https://opendata.aragon.es |
| Castilla y León | https://datosabiertos.jcyl.es |

### Search Criteria

Search for datasets containing:
- Residences for elderly people
- Day centers
- Specialized social services
- Municipal facilities for seniors

**Dataset requirements**:
- Open license (CC BY, CC0 or similar)
- Structured format (JSON, CSV, XML)
- Recent update (preferably within the last year)

---

## Step 3: Prepare Data

### Required Data Structure

The system expects data in JSON format with the following minimum structure:

```json
[
  {
    "nombre": "Center name",
    "direccion": "Complete address",
    "distrito": "District or administrative area",
    "plazas": 50,
    "telefono": "123456789"
  }
]
```

### Recommended Optional Fields

```json
{
  "email": "contact@center.com",
  "web": "https://center.com",
  "latitud": 40.4168,
  "longitud": -3.7038,
  "barrio": "Neighborhood name",
  "servicios": ["Physiotherapy", "Dining room", "Transport"],
  "horario": "Monday to Friday 8:00-20:00",
  "accesibilidad": true
}
```

### Format Conversion

If data is in CSV:
1. Use conversion tools (csvjson, pandas, etc.)
2. Validate resulting JSON at https://jsonlint.com
3. Save in `data/` folder with descriptive name

**Python conversion example**:
```python
import pandas as pd
import json

df = pd.read_csv('residencias.csv')
data = df.to_dict(orient='records')

with open('data/residencias-madrid.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

---

## Step 4: Configure Territory

### Create Configuration File

Create `controller/js/config.js`:

```javascript
const CONFIG = {
  // Territory information
  territorio: {
    nombre: "Madrid",
    nombreCompleto: "Community of Madrid",
    idioma: "es"
  },

  // Map configuration
  mapa: {
    centro: [40.4168, -3.7038], // Coordinates [latitude, longitude]
    zoom: 11,
    urlTiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },

  // Dataset paths
  datos: {
    residencias: 'data/residencias-madrid.json',
    centrosDia: 'data/centros-madrid.json',
    demografia: 'data/poblacion-madrid.json'
  },

  // Customizable labels
  etiquetas: {
    residencias: 'Residences',
    centrosDia: 'Day Centers',
    distritos: 'Districts',
    barrios: 'Neighborhoods',
    plazas: 'Places',
    capacidad: 'Capacity'
  }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
```

---

## Step 5: Adapt Interface

### Modify Main Texts

**File: `index.html`**

Locate and modify:

```html
<!-- Page title (line ~10) -->
<title>ViuActiu - Community of Madrid</title>

<!-- Main header (line ~50) -->
<h1>Resources for Elderly People in Madrid</h1>

<!-- Description (line ~55) -->
<p>Find residences, day centers and social services in the Community of Madrid</p>
```

**File: `controller/layout.js`**

Modify footer:

```javascript
footer: `
  <footer class="bg-gray-800 text-white py-8 mt-12">
    <div class="container mx-auto px-4">
      <h3 class="text-xl font-bold mb-3">ViuActiu Madrid</h3>
      <p class="text-base text-gray-300">
        Resources for healthy aging in the Community of Madrid
      </p>
      <!-- Rest of footer -->
    </div>
  </footer>
`,
```

---

## Step 6: Adapt Data Logic

### Create Specific Parser

If the new territory's data format differs from the original, create a parser:

**File: `controller/js/parsers/madrid-parser.js`**

```javascript
export function parseMadridResidencias(rawData) {
  // Adapt according to local API structure
  return rawData.map(item => ({
    id: item.id || item['@id'],
    nombre: item.title || item.nombre,
    direccion: item.address?.['street-address'] || item.direccion,
    distrito: item.address?.locality || item.distrito || 'Unspecified',
    codigoPostal: item.address?.['postal-code'] || item.cp,
    telefono: item.telephone || item.telefono || '',
    email: item.email || '',
    plazas: parseInt(item.capacity || item.plazas) || 0,
    latitud: item.location?.latitude || item.latitud || null,
    longitud: item.location?.longitude || item.longitud || null
  }));
}
```

### Integrate Parser

**File: `controller/js/residencies.js`**

```javascript
import { parseMadridResidencias } from './parsers/madrid-parser.js';
import CONFIG from './config.js';

async function loadResidenciesData() {
  try {
    const response = await fetch(CONFIG.datos.residencias);
    const rawData = await response.json();
    
    // Apply parser according to territory
    const parser = getParserByTerritorio(CONFIG.territorio.nombre);
    return parser(rawData);
  } catch (error) {
    console.error('Error loading residences:', error);
    return [];
  }
}

function getParserByTerritorio(territorio) {
  const parsers = {
    'Madrid': parseMadridResidencias,
    'Valencia': parseValenciaResidencias,
    'Barcelona': data => data // Default parser
  };
  
  return parsers[territorio] || (data => data);
}
```

---

## Step 7: Configure Map

### Option A: Use Leaflet (Recommended)

If project uses Leaflet, update coordinates:

**File: `controller/js/map.js`**

```javascript
import CONFIG from './config.js';

function initializeMap() {
  const map = L.map('map').setView(
    CONFIG.mapa.centro, 
    CONFIG.mapa.zoom
  );
  
  L.tileLayer(CONFIG.mapa.urlTiles, {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  return map;
}
```

### Option B: Use Google Maps

```javascript
function initializeGoogleMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { 
      lat: CONFIG.mapa.centro[0], 
      lng: CONFIG.mapa.centro[1] 
    },
    zoom: CONFIG.mapa.zoom
  });
  
  return map;
}
```

---

## Step 8: Local Testing

### Development Server

**Option 1: Python**
```bash
python -m http.server 8000
```

**Option 2: Node.js**
```bash
npx http-server -p 8000
```

**Option 3: PHP**
```bash
php -S localhost:8000
```

Access: `http://localhost:8000`

### Verification Checklist

Verify proper functionality:

- [ ] Data loading from local JSON files
- [ ] Map rendering centered on new territory
- [ ] Display of all centers/residences
- [ ] Search functionality
- [ ] Filters by district/neighborhood
- [ ] Detail visualization of each center
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] No errors in browser console

---

## Step 9: Production Deployment

### Option 1: Vercel (Recommended)

**From terminal:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**From GitHub:**
1. Upload code to a GitHub repository
2. Access https://vercel.com
3. Create account and import repository
4. Click "Deploy"

### Option 2: GitHub Pages

```bash
git add .
git commit -m "Adapt to Madrid"
git push origin main
```

Then in GitHub:
1. Settings > Pages
2. Source: Branch `main`, folder `/ (root)`
3. Save

Resulting URL: `https://USERNAME.github.io/REPOSITORY`

### Option 3: Netlify

**Drag & Drop:**
1. Access https://app.netlify.com/drop
2. Drag project folder

**From CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Step 10: Documentation

### Update README.md

Modify README to reflect:
- New territory name
- URLs of data sources used
- Production deployment URL
- Local contact information (if applicable)

### Create CHANGELOG.md

Document changes made:

```markdown
# Changelog

## Madrid Version 1.0.0 (2025-10-26)

### Added
- Configuration for Community of Madrid
- Data parser from datos.madrid.es
- Map centered on Madrid capital

### Modified
- Texts adapted to territory
- Theme colors
```

---

## Recommended Folder Structure

```
viuactiu_gentgran/
├── controller/
│   ├── js/
│   │   ├── config.js           (NEW - Territory configuration)
│   │   ├── parsers/            (NEW - Specific parsers)
│   │   │   └── madrid-parser.js
│   │   ├── map.js              (MODIFY - Coordinates)
│   │   └── residencies.js      (MODIFY - Integrate parser)
│   └── layout.js               (MODIFY - Texts)
├── data/
│   ├── residencias-madrid.json (NEW - Local data)
│   └── centros-madrid.json     (NEW - Local data)
├── view/
│   └── pages/
│       └── index.html          (MODIFY - Titles)
├── README.md                   (UPDATE)
├── CHANGELOG.md                (CREATE)
└── LICENSE
```

---

## Troubleshooting

### Error: "Data does not load"

**Cause**: Incorrect path to JSON file or malformed file

**Solution**:
1. Verify file exists in `data/`
2. Validate JSON at https://jsonlint.com
3. Check path in `config.js`
4. Review browser console (F12) for specific errors

### Error: "Map does not display"

**Cause**: Incorrect coordinates or libraries not loaded

**Solution**:
1. Verify coordinates in `config.js` (format: `[latitude, longitude]`)
2. Check internet connection (needed for map tiles)
3. Verify Leaflet/Google Maps is correctly linked

### Error: "Filters do not work"

**Cause**: Inconsistent field names

**Solution**:
1. Ensure fields in JSON match those expected by code
2. Create a parser that normalizes field names
3. Verify district/neighborhood exist in data

---

## Final Validation

Before considering replication complete:

### Technical Checklist

- [ ] All data loads without 404 errors
- [ ] Parser correctly normalizes data
- [ ] Map centers on correct territory
- [ ] Searches return expected results
- [ ] Filters work correctly
- [ ] No errors in browser console
- [ ] Site is accessible (validate with Lighthouse)

### Content Checklist

- [ ] All texts adapted to territory
- [ ] Data sources documented
- [ ] README reflects new territory
- [ ] External links are correct
- [ ] Contact information is updated

### Deployment Checklist

- [ ] Site deployed to production
- [ ] Production URL is publicly accessible
- [ ] HTTPS is enabled
- [ ] Performance is acceptable (load < 3s)

---

## Support and Contributions

### Report Issues

If you encounter errors during replication:
1. Verify it is not an already reported issue
2. Create new issue at: https://github.com/alusilcof5/viuactiu_gentgran/issues
3. Include:
   - Territory you are trying to replicate
   - Steps to reproduce error
   - Complete error message
   - Browser and operating system

### Contribute Improvements

To contribute improvements to the replication process:
1. Fork repository
2. Create branch: `git checkout -b improvement/description`
3. Commit changes: `git commit -m "Improvement description"`
4. Push: `git push origin improvement/description`
5. Create Pull Request

---

## License

This project is under MIT license. See `LICENSE` for details.

**Permissions**:
- Commercial use
- Modification
- Distribution
- Private use

**Conditions**:
- Include original copyright notice
- Include copy of MIT license

---

## References

- **Original repository**: https://github.com/alusilcof5/viuactiu_gentgran
- **Barcelona demo**: https://viuactiu-gentgran.vercel.app
- **Project**: #20opendata 2025 - Barcelona Provincial Council
- **Technical documentation**: See [DATASOURCES.md](./DATASOURCES.md)

---

**Document version**: 1.0  
**Date**: October 2025  
**Contact**: https://github.com/alusilcof5