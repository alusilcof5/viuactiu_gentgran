<div style="text-align: center;">
  <img src="vista/images/logo_trans.png" alt="logo" width="60">
</div>
# ViuActiu Gent Gran

[![#20opendata 2025](https://img.shields.io/badge/%2320opendata-2025-blue?style=for-the-badge&logo=databricks)](https://www.diba.cat/es/web/opendata)
[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red?style=for-the-badge)](https://opendata-ajuntament.barcelona.cat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Herramienta digital basada en datos abiertos para promover el envejecimiento saludable y la longevidad**

**Proyecto presentado al reto #20opendata 2025**  
*Diputación de Barcelona - Iniciativa Barcelona Open Data*

# Índex


- [Demo en Vivo](#demo-en-vivo)
- [Sobre el Proyecto](#sobre-el-proyecto)
  - [Objetivo](#objetivo)
- [Funcionalidades Principales](#funcionalidades-principales)
  - [Mapa Interactivo](#mapa-interactivo)
  - [Visualización de Datos](#visualización-de-datos)
  - [Búsqueda y Filtros](#búsqueda-y-filtros)
- [Datos Abiertos Utilizados](#datos-abiertos-utilizados)
- [Tecnologías](#tecnologías)
  - [Frontend](#frontend)
  - [Datos](#datos)
  - [Despliegue](#despliegue)
- [Instalación y Uso Local](#instalación-y-uso-local)
  - [Requisitos previos](#requisitos-previos)
  - [Opción 1: Abrir directamente](#opción-1-abrir-directamente)
  - [Opción 2: Con servidor local](#opción-2-con-servidor-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ámbitos de Interés Abordados](#ámbitos-de-interés-abordados)
- [Casos de Uso](#casos-de-uso)
  - [Para Familias](#para-familias)
  - [Para Trabajadores Sociales](#para-trabajadores-sociales)
  - [Para Investigadores](#para-investigadores)
  - [Para Políticas Públicas](#para-políticas-públicas)
- [Replicabilidad en Otros Territorios](#replicabilidad-en-otros-territorios)
- [Métricas de Impacto](#métricas-de-impacto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)
---

## Demo en Vivo

**Aplicación**: [https://viuactiu-gentgran.vercel.app](https://viuactiu-gentgran-ok10okx12-anas-projects-7a7f6fb5.vercel.app/)

---

## Sobre el Proyecto

**ViuActiu Gent Gran** es una plataforma web interactiva que ayuda a familias, profesionales y personas mayores a encontrar y visualizar servicios de atención y participación para la tercera edad en Barcelona, utilizando **exclusivamente datos abiertos** de instituciones públicas.

### Objetivo

Facilitar el acceso a información sobre residencias, centros de día y espacios de participación social, mientras se contextualiza con datos de longevidad y envejecimiento demográfico, promoviendo decisiones informadas sobre el envejecimiento activo y saludable.

---

## Funcionalidades Principales

###  Mapa Interactivo
- Localización de residencias y centros de día en Barcelona
- Filtrado por distrito y tipo de servicio
- Información detallada: dirección, teléfono, accesibilidad
- Visualización geográfica en tiempo real

###  Visualización de Datos
- **Perspectiva de género**: Esperanza de vida hombres vs mujeres
- Comparativa longevidad Catalunya vs España
- Evolución histórica de la esperanza de vida
- Análisis de feminización del envejecimiento

###  Búsqueda y Filtros
- Por nombre de centro
- Por distrito o barrio
- Por tipo de servicio (residencia, centro de día, centro cívico)
- Por capacidad y servicios específicos

---

##  Datos Abiertos Utilizados

**Fuentes principales**:

| Fuente | Dataset | Uso |
|--------|---------|-----|
| **Barcelona Open Data** | Equipamientos municipales | Mapa de residencias y centros |
| **INE** | Esperanza de vida por CCAA | Gráficos de longevidad |
| **Idescat** | Población y demografía | Contexto demográfico |
| **BCN Open Data** | Divisiones territoriales | Filtrado por distritos |

**Documentación completa**: Ver [DATASOURCES.md](./DATASOURCES.md)

**Licencias**: CC BY 4.0 y Ley 37/2007 de reutilización de información pública

---

## Tecnologías

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Chart.js - Visualización de gráficos
- Leaflet API - Mapas interactivos
- Responsive Design (Mobile-first)

### Datos
- Formato: JSON estático
- Sin backend ni base de datos
- Procesamiento en cliente

### Despliegue
- **Hosting**: Vercel
- **CI/CD**: Automático con Git push
- **HTTPS**: Certificado gratuito incluido

---

## Instalación y Uso Local

### Requisitos previos
- Navegador web moderno
- (Opcional) Servidor local para desarrollo

### Opción 1: Abrir directamente
```bash
# Clonar repositorio
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran

# Abrir en navegador
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


## 🌍 Ámbitos de Interés Abordados

-  **Vivienda**: Localización de residencias
-  **Servicios sociales**: Centros de día y atención
-  **Salud y bienestar**: Datos de longevidad
-  **Espacios públicos**: Centros cívicos y comunitarios
-  **Inclusión social**: Información de accesibilidad
-  **Participación social**: Centros de actividades

---

##  Casos de Uso

### Para Familias
> *"Mi padre necesita una residencia en el distrito de Gràcia con accesibilidad adaptada"*

**Solución**: Filtrar mapa por distrito + ver información de contacto y servicios

### Para Trabajadores Sociales
> *"Necesito un listado actualizado de centros de día en Horta-Guinardó"*

**Solución**: Mapa interactivo con datos oficiales del Ayuntamiento

### Para Investigadores
> *"Quiero analizar la distribución territorial de servicios para mayores"*

**Solución**: Visualización geoespacial + datos de longevidad por género

### Para Políticas Públicas
> *"¿Qué distritos tienen déficit de residencias?"*

**Solución**: Análisis visual de densidad de servicios

---

##  Replicabilidad en Otros Territorios

Esta herramienta puede adaptarse a cualquier ciudad con portal de datos abiertos:

### Pasos para replicar:
1. **Identificar portal open data** de tu municipio
2. **Descargar datasets** de equipamientos/servicios sociales
3. **Actualizar JSON** en carpeta `/data/`
4. **Ajustar coordenadas** del mapa en `js/map.js`
5. **Desplegar** en Vercel/Netlify/GitHub Pages

### Requisitos mínimos:
- Dataset de residencias/centros con coordenadas GPS
- (Opcional) Datos demográficos locales

---

##  Métricas de Impacto

### Datos técnicos:
- **Carga inicial**: < 2 segundos
- **Peso total**: < 5 MB
- **Dispositivos soportados**: Desktop, tablet, móvil
- **Accesibilidad**: Nivel AA (WCAG 2.1)

### Alcance esperado:
- **Usuarios objetivo**: Familias con personas mayores dependientes
- **Profesionales**: Trabajadores sociales, gerontólogos
- **Territorios replicables**: +200 municipios en Catalunya

---

##  Contribuciones

¡Las contribuciones son bienvenidas!

### Cómo contribuir:
1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m "Añadir nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

##  Licencia

**Código**: MIT License - Ver [LICENSE](./LICENSE)  
**Datos**: CC BY 4.0 y Ley 37/2007 de reutilización

---

##  Contacto

**Proyecto**: ViuActiu Gent Gran desenvolupat per **Ana Lucía Silva Córdoba**.   
**LinkedIn**: [Ana Lucía Silva Córdoba](https://www.linkedin.com/in/ana-lucia-silva-cordoba/).

**GitHub**: [@alusilcof5](https://github.com/alusilcof5)  
**Repositorio**: [viuactiu_gentgran](https://github.com/alusilcof5/viuactiu_gentgran)

**Reto**: #20opendata 2025  
**Organizador**: Diputación de Barcelona - Barcelona Open Data  
**Web del reto**: https://www.diba.cat/es/web/opendata

---

<div align="center">

** Proyecto presentado al reto #20opendata 2025**

[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red)](https://opendata-ajuntament.barcelona.cat)
[![Diputación Barcelona](https://img.shields.io/badge/Diputaci%C3%B3n-Barcelona-orange)](https://www.diba.cat)

*Promoviendo el envejecimiento saludable a través de datos abiertos*

</div>