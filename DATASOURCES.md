# Open Data Sources

## Project: ViuActiu Gent Gran
### **Challenge**: #20opendata 2025 – Healthy Ageing and Longevity
[![#20opendata 2025](https://img.shields.io/badge/%2320opendata-2025-blue?style=for-the-badge&logo=databricks)](https://www.diba.cat/es/web/opendata)
[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red?style=for-the-badge)](https://opendata-ajuntament.barcelona.cat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## Datasets Used

### 1. Barcelona Open Data – Municipal Facilities

**Source**: Barcelona City Council – Open Data BCN  
**Dataset**: Municipal facilities (Residences and Centers)  
**URL**: https://opendata-ajuntament.barcelona.cat/data/es/dataset/equipaments  
**Format**: CSV / GeoJSON  
**License**: Creative Commons Attribution 4.0 (CC BY 4.0)  
**Last update**: October 2024  

**Extracted data**:
- Facility name  
- Postal address  
- Geographic coordinates (latitude/longitude)  
- District and neighborhood  
- Type of service (residence, day center, civic center)  
- Contact phone  
- Accessibility information  

**Use in the project**: Interactive map showing services for older adults

---

### 2. National Statistics Institute (INE) – Life Expectancy

**Source**: Instituto Nacional de Estadística (INE)  
**Dataset**: Mortality Indicators – Life expectancy at birth by autonomous communities  
**URL**: https://www.ine.es/jaxiT3/Tabla.htm?t=1414  
**Format**: JSON / CSV  
**License**: Public Information Reuse Act (Law 37/2007)  
**Last update**: Data 2022–2023  

**Extracted data**:
- Total life expectancy by region  
- Life expectancy by gender (male/female)  
- Time series evolution  

**Use in the project**: Comparative charts of longevity by gender and region

---

### 3. Idescat – Statistics of Catalonia

**Source**: Statistical Institute of Catalonia (Idescat)  
**Dataset**: Population by age and sex – Demographic projections  
**URL**: https://www.idescat.cat/pub/?id=aec&n=253  
**Format**: JSON / REST API  
**License**: Creative Commons Attribution 4.0 (CC BY 4.0)  
**Last update**: 2024  

**Extracted data**:
- Population distribution by age groups  
- Population pyramid by gender  
- Ageing index  
- Future ageing projections  

**Use in the project**: Demographic context and trend analysis

---

### 4. Barcelona Open Data – Territorial Divisions

**Source**: Barcelona City Council  
**Dataset**: Neighborhoods and districts of Barcelona  
**URL**: https://opendata-ajuntament.barcelona.cat/data/es/dataset/20170706-districtes-barris  
**Format**: GeoJSON  
**License**: CC BY 4.0  
**Last update**: 2024  

**Extracted data**:
- District geometries  
- Neighborhood codes  
- Territorial boundaries  

**Use in the project**: Geographic filtering and district-based visualization

---

## Data Processing

### Methodology:
1. **Extraction**: Manual/automated download from official portals  
2. **Cleaning**: Normalization of names, formats, and coordinates  
3. **Transformation**: Conversion to JSON format for web consumption  
4. **Validation**: Integrity and completeness check  
5. **Update**: Manual quarterly process (next: January 2025)

### Processing scripts:
Data is processed using JavaScript scripts that:
- Validate GPS coordinates  
- Normalize phone number formats  
- Categorize service types  
- Generate indexes for fast search  

---

## Update Frequency

| Dataset | Official frequency | Project update frequency |
|----------|-------------------|---------------------------|
| BCN Facilities | Monthly | Quarterly |
| INE Life Expectancy | Annual | Annual |
| Idescat Population | Annual | Annual |
| Territorial Divisions | Occasional | Based on official updates |

---

## Open Data Policy

**All data used in this project**:
- Are publicly accessible and free of charge  
- Are published under open licenses  
- Come from verified official sources  
- Are properly cited within the application  
- Allow redistribution with attribution  

**Regulatory compliance**:
- Law 37/2007 on Reuse of Public Sector Information  
- EU Directive 2019/1024 on Open Data  
- Creative Commons Attribution 4.0 International Promoviendo el envejecimiento saludable a través de datos abiertos 

---

## Data Contact Information

For inquiries about the original datasets:

**Barcelona Open Data**  
Email: opendata@ajuntament.barcelona.cat  
Portal: https://opendata-ajuntament.barcelona.cat  

**INE – National Statistics Institute**  
Inquiries: www.ine.es/infoine  
Portal: https://www.ine.es  

**Idescat**  
Email: comunica@idescat.cat  
Portal: https://www.idescat.cat  



## Direct Dataset Links
```
# Equipamientos BCN (CSV)
https://opendata-ajuntament.barcelona.cat/data/dataset/8d59a8ea-fe93-4a77-8e17-03aad3b58042/resource/7f3497ba-b5c8-4d1e-8c77-b41c1dc69717/download

# INE Esperanza de vida (API)
https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/1414

# Idescat Población (API)
https://api.idescat.cat/emex/v1/dades.json?id=pop&lang=es
```

---


---

## Relevance to the #20opendata Challenge

This project demonstrates:
- **Central use of open data**: 100% of the information comes from public sources  
- **Interoperability**: Combines datasets from multiple institutions  
- **Gender perspective**: Data disaggregated by sex (INE, Idescat)  
- **Transparency**: Complete documentation of sources and licenses  
- **Replicability**: Clear methodology applicable to other regions  

---

**Last review**: October 26, 2025  
**Project**: ViuActiu Gent Gran  
**Submission**: #20opendata 2025 – Diputació de Barcelona
