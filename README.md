<div style="text-align: center;">
  <img src="vista/images/logo_trans.png" alt="logo" width="60">
  <p style="font-size: 34px;">ViuActiu Gent Gran</p>

</div>

**A digital tool based on open data to promote healthy aging and longevity**


[![#20opendata 2025](https://img.shields.io/badge/%2320opendata-2025-blue?style=for-the-badge&logo=databricks)](https://www.diba.cat/es/web/opendata)
[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red?style=for-the-badge)](https://opendata-ajuntament.barcelona.cat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)



**Project submitted to the #20opendata 2025 challenge**  
*Diputació de Barcelona – Barcelona Open Data Initiative*

---

# Index

- [Live Demo](#live-demo)
- [About the Project](#about-the-project)
  - [Objective](#objective)
- [Main Features](#main-features)
  - [Interactive Map](#interactive-map)
  - [Data Visualization](#data-visualization)
  - [Search and Filters](#search-and-filters)
- [Open Data Used](#open-data-used)
- [Technologies](#technologies)
  - [Frontend](#frontend)
  - [Data](#data)
  - [Deployment](#deployment)
- [Installation and Local Use](#installation-and-local-use)
  - [Prerequisites](#prerequisites)
  - [Option 1: Open Directly](#option-1-open-directly)
  - [Option 2: Local Server](#option-2-local-server)
- [Project Structure](#project-structure)
- [Areas of Interest Addressed](#areas-of-interest-addressed)
- [Use Cases](#use-cases)
  - [For Families](#for-families)
  - [For Social Workers](#for-social-workers)
  - [For Researchers](#for-researchers)
  - [For Public Policy](#for-public-policy)
- [Replicability in Other Territories](#replicability-in-other-territories)
- [Impact Metrics](#impact-metrics)
- [Contributions](#contributions)
- [License](#license)
- [Contact](#contact)

---

## Live Demo
**Application**: [https://viuactiu-gentgran.vercel.app](https://viuactiu-gentgran-ok10okx12-anas-projects-7a7f6fb5.vercel.app/)

---

## About the Project
**ViuActiu Gent Gran** is an interactive web platform that helps families, professionals, and older adults find and visualize elderly care and participation services in Barcelona, using **exclusively open data** from public institutions.

### Objective
Facilitate access to information on residences, day centers, and social participation spaces, while contextualizing with longevity and demographic aging data, promoting informed decisions about active and healthy aging.

---

## Main Features
### Interactive Map
- Location of residences and day centers in Barcelona  
- Filter by district and type of service  
- Detailed information: address, phone, accessibility  
- Real-time geographic visualization  

### Data Visualization
- **Gender perspective**: Life expectancy men vs. women  
- Longevity comparison Catalonia vs. Spain  
- Historical evolution of life expectancy  
- Analysis of aging feminization  

### Search and Filters
- By center name  
- By district or neighborhood  
- By type of service (residence, day center, civic center)  
- By capacity and specific services  

---

## Open Data Used
**Main sources**:

| Source | Dataset | Use |
|--------|----------|-----|
| **Barcelona Open Data** | Municipal facilities | Map of residences and centers |
| **INE** | Life expectancy by region | Longevity graphs |
| **Idescat** | Population and demographics | Demographic context |
| **BCN Open Data** | Territorial divisions | District filtering |

**Full documentation**: See [DATASOURCES.md](./DATASOURCES.md) and [REPLICABILITY.md](./REPLICABILITY.md)

**Licenses**: CC BY 4.0 and Law 37/2007 on public information reuse  

---

## Technologies
### Frontend
- HTML5, CSS3, Vanilla JavaScript  
- Chart.js – Data visualization  
- Leaflet API – Interactive maps  
- Responsive Design (Mobile-first)  

### Data
- Format: Static JSON  
- No backend or database  
- Client-side data processing  

### Deployment
- **Hosting**: Vercel  
- **CI/CD**: Automatic with Git push  
- **HTTPS**: Free SSL included  

---

## Installation and Local Use
### Prerequisites
- Modern web browser  
- (Optional) Local server for development  

### Option 1: Open Directly
```bash
# Clone repository
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran

# Open in browser
open index.html

```

### Opción 2: Con servidor local
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Visitar http://localhost:8000
```

---

## Estructura del Proyecto

```
viuactiu_gentgran/
├── index.html              # Página principal
├── README.md               # Este archivo
├── DATASOURCES.md          # Documentación de datos abiertos
├── DEPLOYMENT.md           # Guía de despliegue
│
├── data/                   # Datasets 
│   ├── residencias.json    # BCN Open Data - Residencias
│   ├── centros.json        # BCN Open Data - Centros de día
│   ├── longevidad.json     # INE - Esperanza de vida
│   └── distritos.json      # BCN - Divisiones territoriales
│
├── css/                    #  Estilos
│   └── styles.css
│
├── js/                     # ⚙️ Lógica de la aplicación
│   ├── map.js              # Mapa interactivo
│   ├── charts.js           # Gráficos y visualizaciones
│   └── filters.js          # Sistema de filtrado
│
└── assets/                 #  Recursos
    ├── images/
    └── icons/
```

---


##  Areas of Interest Addressed

-  Housing: Location of residences

- Social Services: Day and care centers

- Health and Well-being: Longevity data

- Public Spaces: Civic and community centers

- Social Inclusion: Accessibility information

- Social Participation: Activity centers

---

##  Use Cases

### For Families
> “My father needs a residence in the Gràcia district with accessibility.”  
**Solution:** Filter the map by district and view contact information and available services.

### For Social Workers
> “I need an updated list of day centers in Horta-Guinardó.”  
**Solution:** Interactive map with official City Council data.

### For Researchers
> “I want to analyze the territorial distribution of elderly services.”  
**Solution:** Geospatial visualization combined with gender-based longevity data.

###  For Public Policy
> “Which districts have a shortage of residences?”  
**Solution:** Visual analysis of service density and geographic availability.

---

##  Replicability in Other Territories

This tool can be adapted to any city with an open data portal.

###  Steps to Replicate
1. **Identify** the open data portal of your municipality.  
2. **Download** datasets of facilities or social services.  
3. **Update** JSON files in the `/data/` folder.  
4. **Adjust** coordinates in `js/map.js`.  
5. **Deploy** on Vercel, Netlify, or GitHub Pages.

### ⚙️ Minimum Requirements
- Dataset of residences or centers **with GPS coordinates**.  
- *(Optional)* Local demographic and aging data.

---

##  Impact Metrics

###  Technical Data
- **Initial load:** < 2 seconds  
- **Total size:** < 5 MB  
- **Supported devices:** Desktop, tablet, mobile  
- **Accessibility:** Level AA (WCAG 2.1)

###  Expected Reach
- **Target users:** Families with dependent older adults  
- **Professionals:** Social workers, gerontologists  
- **Replicable territories:** +200 municipalities in Catalonia  

---

##  Contributions

Contributions are welcome! Help us improve and expand the project.

###  How to Contribute
1. **Fork** the repository  
2. **Create** a new branch:  
   ```bash
   git checkout -b feature/new-feature
   git commit -m "Add new feature"
   git push origin feature/new-feature
3. Open a Pull Requestt

---

##  License

Code: MIT License – see LICENSE

---

##  Contacto

**Proyecto**: ViuActiu Gent Gran desenvolupat per **Ana Lucía Silva Córdoba**.   
**LinkedIn**: [Ana Lucía Silva Córdoba](https://www.linkedin.com/in/ana-lucia-silva-cordoba/).

**GitHub**: [@alusilcof5](https://github.com/alusilcof5)  
**Repositorio**: [viuactiu_gentgran](https://github.com/alusilcof5/viuactiu_gentgran)
**Link**: https://viuactiu-gentgran-anas-projects-7a7f6fb5.vercel.app/
**Reto**: #20opendata 2025  
**Organizador**: Diputación de Barcelona - Barcelona Open Data  
**Web del reto**: https://www.diba.cat/es/web/opendata

---

<div align="center">

[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red)](https://opendata-ajuntament.barcelona.cat)
[![Diputación Barcelona](https://img.shields.io/badge/Diputaci%C3%B3n-Barcelona-orange)](https://www.diba.cat)

*Promoting healthy aging through open data*

</div>