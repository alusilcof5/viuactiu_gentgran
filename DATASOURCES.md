# Fuentes de Datos Abiertos

## Proyecto: ViuActiu Gent Gran
### **Reto**: #20opendata 2025 - Envejecimiento Saludable y Longevidad
[![#20opendata 2025](https://img.shields.io/badge/%2320opendata-2025-blue?style=for-the-badge&logo=databricks)](https://www.diba.cat/es/web/opendata)
[![Barcelona Open Data](https://img.shields.io/badge/Barcelona-Open%20Data-red?style=for-the-badge)](https://opendata-ajuntament.barcelona.cat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)


## Datasets Utilizados

### 1. Barcelona Open Data - Equipamientos Municipales

**Fuente**: Ayuntamiento de Barcelona - Open Data BCN  
**Dataset**: Equipamientos municipales (Residencias y Centros)  
**URL**: https://opendata-ajuntament.barcelona.cat/data/es/dataset/equipaments  
**Formato**: CSV / GeoJSON  
**Licencia**: Creative Commons Atribución 4.0 (CC BY 4.0)  
**Última actualización**: Octubre 2024  

**Datos extraídos**:
- Nombre del equipamiento
- Dirección postal
- Coordenadas geográficas (latitud/longitud)
- Distrito y barrio
- Tipo de servicio (residencia, centro de día, centro cívico)
- Teléfono de contacto
- Información de accesibilidad

**Uso en el proyecto**: Mapa interactivo de localización de servicios para personas mayores

---

### 2. Instituto Nacional de Estadística (INE) - Esperanza de Vida

**Fuente**: Instituto Nacional de Estadística  
**Dataset**: Indicadores de Mortalidad - Esperanza de vida al nacer por comunidades autónomas  
**URL**: https://www.ine.es/jaxiT3/Tabla.htm?t=1414  
**Formato**: JSON / CSV  
**Licencia**: Reutilización de información pública (Ley 37/2007)  
**Última actualización**: Datos 2022-2023  

**Datos extraídos**:
- Esperanza de vida total por comunidad autónoma
- Esperanza de vida por género (hombres/mujeres)
- Series temporales de evolución

**Uso en el proyecto**: Gráficos comparativos de longevidad por género y territorio

---

### 3. Idescat - Estadísticas de Catalunya

**Fuente**: Institut d'Estadística de Catalunya (Idescat)  
**Dataset**: Población por edad y sexo - Proyecciones demográficas  
**URL**: https://www.idescat.cat/pub/?id=aec&n=253  
**Formato**: JSON / API REST  
**Licencia**: Creative Commons Atribución 4.0 (CC BY 4.0)  
**Última actualización**: 2024  

**Datos extraídos**:
- Distribución poblacional por grupos de edad
- Pirámide poblacional desagregada por sexo
- Índice de envejecimiento
- Proyecciones futuras de envejecimiento

**Uso en el proyecto**: Contexto demográfico y análisis de tendencias

---

### 4. Barcelona Open Data - Divisiones Territoriales

**Fuente**: Ayuntamiento de Barcelona  
**Dataset**: Barrios y distritos de Barcelona  
**URL**: https://opendata-ajuntament.barcelona.cat/data/es/dataset/20170706-districtes-barris  
**Formato**: GeoJSON  
**Licencia**: CC BY 4.0  
**Última actualización**: 2024  

**Datos extraídos**:
- Geometrías de distritos
- Códigos de barrios
- Límites territoriales

**Uso en el proyecto**: Filtrado geográfico y visualización por distritos

---

## Procesamiento de Datos

### Metodología:
1. **Extracción**: Descarga manual/automática desde portales oficiales
2. **Limpieza**: Normalización de nombres, formatos y coordenadas
3. **Transformación**: Conversión a formato JSON para consumo web
4. **Validación**: Verificación de integridad y completitud de datos
5. **Actualización**: Proceso manual trimestral (próxima: enero 2025)

### Scripts de procesamiento:
Los datos son procesados mediante scripts JavaScript que:
- Validan coordenadas GPS
- Normalizan formatos de teléfono
- Categorizan tipos de servicios
- Generan índices para búsqueda rápida

---

## Frecuencia de Actualización

| Dataset | Frecuencia oficial | Actualización en el proyecto |
|---------|-------------------|------------------------------|
| Equipamientos BCN | Mensual | Trimestral |
| INE Esperanza de vida | Anual | Anual |
| Idescat Población | Anual | Anual |
| Divisiones territoriales | Ocasional | Según cambios oficiales |

---

##  Política de Datos Abiertos

**Todos los datos utilizados en este proyecto**:
- Son de acceso público y gratuito
- Están publicados bajo licencias abiertas
- Provienen de fuentes oficiales verificadas
- Se citan correctamente en la aplicación
- Permiten redistribución con atribución

**Cumplimiento normativo**:
- Ley 37/2007 de reutilización de información del sector público
- Directiva 2019/1024 de la UE sobre datos abiertos
- Creative Commons Attribution 4.0 International

---

## Contacto para Datos

Para consultas sobre los datasets originales:

**Barcelona Open Data**  
Email: opendata@ajuntament.barcelona.cat  
Portal: https://opendata-ajuntament.barcelona.cat

**INE - Instituto Nacional de Estadística**  
Consultas: www.ine.es/infoine  
Portal: https://www.ine.es

**Idescat**  
Email: comunica@idescat.cat  
Portal: https://www.idescat.cat

---

## Enlaces Directos a Datasets

```
# Equipamientos BCN (CSV)
https://opendata-ajuntament.barcelona.cat/data/dataset/8d59a8ea-fe93-4a77-8e17-03aad3b58042/resource/7f3497ba-b5c8-4d1e-8c77-b41c1dc69717/download

# INE Esperanza de vida (API)
https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/1414

# Idescat Población (API)
https://api.idescat.cat/emex/v1/dades.json?id=pop&lang=es
```

---

##  Relevancia para el Reto #20opendata

Este proyecto demuestra:
- **Uso central de datos abiertos**: El 100% de la información proviene de fuentes públicas
- **Interoperabilidad**: Combina datasets de múltiples instituciones
- **Perspectiva de género**: Datos desagregados por sexo (INE, Idescat)
- **Transparencia**: Documentación completa de fuentes y licencias
- **Replicabilidad**: Metodología clara para aplicar en otros territorios

---

**Última revisión**: 26 de octubre de 2025  
**Proyecto**: ViuActiu Gent Gran  
**Candidatura**: #20opendata 2025 - Diputación de Barcelona