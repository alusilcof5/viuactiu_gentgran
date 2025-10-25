# ViuActiu Gent Gran

**Author:** Ana Lucía Silva Córdoba

ViuActiu Gent Gran is a web platform designed to centralize and facilitate access to resources and services for older adults in Catalonia, promoting active and healthy aging.

The application uses open data from public administrations to provide updated information on dependency services, financial aid, and citizen participation spaces, improving autonomy, well-being, and social inclusion for older adults.

This platform is a candidate for the **#20opendata 2025 Challenge: Ranking of digital tools for healthy aging**, organized by Barcelona Open Data Initiative and Diputació de Barcelona.

---

## 🎯 Objective

The mission of ViuActiu Gent Gran is to empower older adults and their families through an accessible platform that:

- **Centralizes essential resources**, such as interactive maps of day centers and residences
- **Facilitates access to information** about financial aid and public subsidies
- **Promotes citizen participation** through links to spaces managed by public administrations
- **Reduces the digital divide** with a clear and easy-to-use interface

---

## ✨ Key Features

- **Dependency Services**: Interactive maps showing day centers, residences, and other services for seniors in Catalonia
- **Financial Aid**: Detailed information about public subsidies available for older adults and their families
- **Citizen Participation**: Links to participation spaces managed by public administrations, fostering social inclusion
- **Open Data**: Use of official APIs from Generalitat de Catalunya, Diputació de Barcelona, and Barcelona City Council, ensuring reliability and updates
- **Gender Perspective**: Implementation of sex-disaggregated data using datasets available from official APIs

---

## 👥 Gender Perspective

ViuActiu Gent Gran integrates a **cross-cutting gender perspective** through:

### 📊 Demographic Dashboard with Gender Analysis

- **Sex-disaggregated data** across all age groups (65+, 70+, 75+, 80+, 85+, 90+)
- **Comparative visualizations** between women and men
- **Gender gap calculations** that increase with age
- **Social impact indicators**: widowhood (72% women), loneliness (38% women affected)

### 🎯 Key Findings

- Women represent **56.2%** of the population aged 65+
- Gender gap of **+5.9pp** in the 65+ population, growing to **+8.5pp** at 85+
- Life expectancy: **86.2 years** (women) vs **80.3 years** (men)
- Higher risk of **unwanted loneliness** and **widowhood** among older women

### 🔗 Visualization

Access the complete dashboard: [Longevity Pyramid](https://viuactiu-gentgran-iota.vercel.app/piramide-longevitat.html)

### 📚 Data Sources with Gender Perspective

- **INE (National Statistics Institute)**: Population by age and sex (2024)
- **Future datasets** from service APIs will include sex disaggregation when available

---

## 🛠 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (responsive and accessible web interface)
- **Backend**: Node.js and Python (for server logic and data handling)
- **Open Data APIs**:
  - Generalitat de Catalunya
  - Diputació de Barcelona (Open Data) – JSON, XML, CSV formats
  - Barcelona City Council
- **Deployment**: Hosted on Vercel for scalability and performance

> **Note:** The application is hosted on Vercel for online testing.

---

## 🏆 Compliance with #20opendata 2025 Challenge

ViuActiu Gent Gran aligns with the challenge criteria:

### ✅ Open Data as Core
The platform is based exclusively on open data from official sources, ensuring reliability and updates.

### ✅ Healthy Aging
Promotes autonomy, well-being, and social participation through centralized resources and interactive maps, covering areas such as health, economy, social participation, and communication.

### ✅ Gender Perspective
**Fully implemented** with sex-disaggregated data visualization and gender gap analysis using datasets from official APIs.

### ✅ Technical Quality
- **Territoriality**: Designed for Catalonia, but adaptable to other regions with open data
- **Interoperability**: Uses standard formats (JSON, XML) and modern technologies
- **Updates**: Data is updated through periodic API queries (configurable, e.g., daily)
- **Applicability**: Accessible interface, tested on Chrome, Firefox, and mobile devices

### ✅ Replicability
MIT License and use of open data allow adapting the platform to other territories by connecting new local APIs.

---

## 🌍 Replicability in Other Contexts

The platform is highly replicable:

- **Open Data**: Can connect to APIs from other regions (e.g., other autonomous communities with open data portals)
- **Configuration**: Code allows changing data sources in the server configuration file (e.g., `server.js` or `proxy_server.py`)
- **MIT License**: Allows reuse and adaptation of code for new contexts

### To Adapt the Platform:

1. Update API URLs in the configuration
2. Customize maps and resources according to the new territory
3. Adjust the interface to reflect local needs

---

## 🚀 Installation and Execution

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran
```

### 2. Install Dependencies

**Python** (if using the Python proxy server):
```bash
pip install -r requirements.txt
```

### 3. Run the Application

**Python:**
```bash
python proxy_server.py
```

**Or use Live Server** for frontend development

---

## 📚 Open Data Sources Used

- **Barcelona Open Data Portal** – https://opendata-ajuntament.barcelona.cat
- **Generalitat de Catalunya** – Department of Social Rights (data on services and residences)
- **Diputació de Barcelona** – Catalog of social facilities

*(License: Data with CC BY 4.0 license – use and redistribution allowed with source citation)*

---

## 🔌 APIs Consumed

The ViuActiu Gent Gran project integrates various open data APIs provided by Catalan public administrations to offer updated and accurate information on services and resources for older adults:

### 1. Generalitat de Catalunya – Services for People with Dependency
- **Description**: API providing information on services available for people with dependency in Catalonia, including day centers and residences
- **Documentation**: https://administraciodigital.gencat.cat/ca/dades/dades-obertes/inici/

### 2. Diputació de Barcelona – Open Data
- **Description**: API that allows consulting, filtering, ordering, and retrieving open data from Diputació de Barcelona in formats such as JSON, XML, or CSV
- **Documentation**: https://do.diba.cat/

### 3. Barcelona City Council – Residences for Older Adults
- **Description**: API providing information on residences for older adults in Barcelona city
- **Documentation**: https://opendata-ajuntament.barcelona.cat/data/ca/dataset/serveissocials-residenciesgentgran

---

## 📄 License

This project is under the **MIT License**, which allows free use, modification, and distribution, provided that the copyright notice and disclaimer are included.

---

## 🤝 Contributions

Contributions are accepted through pull requests.

For suggestions or improvements, open an issue on GitHub to discuss changes before implementing them.

---

## 📧 Contact

**Author:** Ana Lucía Silva Córdoba  
**Linkedin:** https://www.linkedin.com/in/ana-lucia-silva-cordoba/
**Repository:** https://github.com/alusilcof5/viuactiu_gentgran  
**Live Demo:** https://viuactiu-gentgran-iota.vercel.app/

---

**#20opendata2025** | **#HealthyAging** | **#OpenData** | **#GenderPerspective**


