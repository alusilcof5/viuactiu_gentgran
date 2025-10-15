# **ViuActiu Gent Gran**

**Autora:** Ana Lucía Silva Córdoba  

ViuActiu Gent Gran es una plataforma web diseñada para centralizar y facilitar el acceso a recursos y servicios para personas mayores en Cataluña, promoviendo un envejecimiento activo y saludable.  
La aplicación utiliza datos abiertos de administraciones públicas para ofrecer información actualizada sobre servicios de dependencia, ayudas económicas y espacios de participación ciudadana, mejorando la autonomía, el bienestar y la inclusión social de las personas mayores.

Esta plataforma es candidata al **Reto #20opendata 2025: Ranking de herramientas digitales para el envejecimiento saludable**, organizado por **Iniciativa Barcelona Open Data** y la **Diputació de Barcelona**.

---

## **Objetivo**

La misión de *ViuActiu Gent Gran* es empoderar a las personas mayores y sus familias mediante una plataforma accesible que:

- Centraliza recursos esenciales, como mapas interactivos de centros de día y residencias.  
- Facilita el acceso a información sobre ayudas económicas y subvenciones públicas.  
- Promueve la participación ciudadana a través de enlaces a espacios gestionados por administraciones públicas.  
- Reduce la brecha digital con una interfaz clara y fácil de usar.

---

## **Características principales**

- **Servicios de dependencia:** Mapas interactivos que muestran centros de día, residencias y otros servicios para mayores en Cataluña.  
- **Ayudas económicas:** Información detallada sobre subvenciones públicas disponibles para personas mayores y sus familias.  
- **Participación ciudadana:** Enlaces a espacios de participación gestionados por administraciones públicas, fomentando la inclusión social.  
- **Datos abiertos:** Uso de APIs oficiales de la Generalitat de Catalunya, Diputació de Barcelona y Ayuntamiento de Barcelona, garantizando fiabilidad y actualización.  
- **Perspectiva de género (en desarrollo):** Próximamente, la plataforma incluirá datos desagregados por sexo (por ejemplo, uso de servicios por hombres vs. mujeres) para abordar necesidades específicas de género, utilizando datasets disponibles en las APIs oficiales.

---

## **Tecnologías utilizadas**

- **Frontend:** HTML5, CSS3, JavaScript (interfaz web responsiva y accesible).  
- **Backend:** Node.js y Python (para lógica de servidor y manejo de datos).  
- **APIs de datos abiertos:**  
  - Generalitat de Catalunya.  
  - Diputació de Barcelona (Dades Obertes) – formatos JSON, XML, CSV.  
  - Ayuntamiento de Barcelona.  
- **Despliegue:** Alojado en **Vercel** para escalabilidad y rendimiento.


--> Nota: La aplicación está alojada en Vercel para pruebas en línea.
---

## **Cumplimiento con el Reto #20opendata 2025**

*ViuActiu Gent Gran* se alinea con los criterios del reto:

- **Datos abiertos como núcleo:** La plataforma se basa exclusivamente en datos abiertos de fuentes oficiales, asegurando fiabilidad y actualización.  
- **Envejecimiento saludable:** Promueve la autonomía, el bienestar y la participación social mediante recursos centralizados y mapas interactivos, cubriendo ámbitos como salud, economía, participación social y comunicación.  
- **Perspectiva de género:** En desarrollo, con un plan para integrar datos desagregados por sexo (por ejemplo, estadísticas de uso de servicios por género) a partir de datasets de las APIs oficiales.  
- **Calidad técnica:**  
  - **Territorialidad:** Diseñada para Cataluña, pero adaptable a otras regiones con datos abiertos.  
  - **Interoperabilidad:** Usa formatos estándar (JSON, XML) y tecnologías modernas.  
  - **Actualización:** Los datos se actualizan mediante consultas periódicas a las APIs (configurable, por ejemplo, diaria).  
  - **Aplicabilidad:** Interfaz accesible, probada en Chrome, Firefox y dispositivos móviles.  
- **Replicabilidad:** La **Licencia MIT** y el uso de datos abiertos permiten adaptar la plataforma a otros territorios conectando nuevas APIs locales.

---

## Replicabilidad en otros contextos

La plataforma es altamente replicable:

- Datos abiertos: Puede conectarse a APIs de otras regiones (por ejemplo, otras comunidades autónomas con portales de datos abiertos).

- Configuración: El código permite cambiar las fuentes de datos en el archivo de configuración del servidor (por ejemplo,Replicabilidad en otros contextos

La plataforma es altamente replicable:

Datos abiertos: Puede conectarse a APIs de otras regiones (por ejemplo, otras comunidades autónomas con portales de datos abiertos).
Replicabilidad en otros contextos

La plataforma es altamente replicable:

Datos abiertos: Puede conectarse a APIs de otras regiones (por ejemplo, otras comunidades autónomas con portales de datos abiertos).

- Configuración: El código permite cambiar las fuentes de datos en el archivo de configuración del servidor (por ejemplo, server.js o proxy_server.py).

- Licencia MIT: Permite la reutilización y adaptación del código para nuevos contextos.

Para adaptar la plataforma:

- Actualiza las URLs de las APIs en la configuración.

- Personaliza los mapas y recursos según el nuevo territorio.

- Ajusta la interfaz para reflejar las necesidades locales.
Configuración: El código permite cambiar las fuentes de datos en el archivo de configuración del servidor (por ejemplo, config.js o proxy_server.py).

Licencia MIT: Permite la reutilización y adaptación del código para nuevos contextos.

### Para adaptar la plataforma:

Actualiza las URLs de las APIs en la configuración.

Personaliza los mapas y recursos según el nuevo territorio.

Ajusta la interfaz para reflejar las necesidades locales. config.js o proxy_server.py).

- Licencia MIT: Permite la reutilización y adaptación del código para nuevos contextos.

Para adaptar la plataforma:

Actualiza las URLs de las APIs en la configuración.

Personaliza los mapas y recursos según el nuevo territorio.

Ajusta la interfaz para reflejar las necesidades locales.

---

## **Instalación y ejecución**

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio:
```bash
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran
```

---

## **Instal·lació i execució**

Segueix aquests passos per executar el projecte localment:

1. **Clonar el repositori**
```bash
git clone https://github.com/alusilcof5/viuactiu_gentgran.git
cd viuactiu_gentgran
```

2. **Instal·lar dependències**

Python (si es vol utilitzar el servidor *proxy* en Python):  
```bash
pip install -r requirements.txt
```

3. **Executar l’aplicació**

Python:  
```bash
python proxy_server.py
```
Go live  

---

## **🛠 Tecnologies utilitzades**

- **HTML5, CSS3 i JavaScript:** per a la interfície web.  
- **Node.js:** per a la lògica de servidor i *proxy*.  
- **Python:** com a alternativa per al servidor *proxy* i el tractament de dades.  
- **APIs de dades obertes:** de la Generalitat de Catalunya, la Diputació de Barcelona i l’Ajuntament de Barcelona.  

---

### **Fonts de dades obertes utilitzades**

- **Portal Open Data Ajuntament de Barcelona** – [https://opendata-ajuntament.barcelona.cat](https://opendata-ajuntament.barcelona.cat)  
- **Generalitat de Catalunya – Departament de Drets Socials** (dades sobre serveis i residències)  
- **Diputació de Barcelona – Catàleg d’equipaments socials**  

(*Llicència: Dades amb llicència CC BY 4.0 – ús i redistribució permesos citant la font.*)

---

### **APIs consumides**

El projecte **ViuActiu Gent Gran** integra diverses APIs de dades obertes proporcionades per administracions públiques catalanes per oferir informació actualitzada i precisa sobre serveis i recursos per a les persones grans:

#### 1. Generalitat de Catalunya – Serveis per a persones amb dependència

- **Descripció:** API que proporciona informació sobre els serveis disponibles per a persones amb dependència a Catalunya, incloent-hi centres de dia i residències.  
- **Documentació:** [https://administraciodigital.gencat.cat/ca/dades/dades-obertes/inici/](https://administraciodigital.gencat.cat/ca/dades/dades-obertes/inici/)

#### 2. Diputació de Barcelona – Dades Obertes

- **Descripció:** API que permet consultar, filtrar, ordenar i recuperar dades obertes de la Diputació de Barcelona en formats com JSON, XML o CSV.  
- **Documentació:** [https://do.diba.cat/](https://do.diba.cat/)

#### 3. Ajuntament de Barcelona – Residències per a la gent gran

- **Descripció:** API que proporciona informació sobre les residències per a persones grans a la ciutat de Barcelona.  
- **Documentació:** [https://opendata-ajuntament.barcelona.cat/data/ca/dataset/serveissocials-residenciesgentgran](https://opendata-ajuntament.barcelona.cat/data/ca/dataset/serveissocials-residenciesgentgran)

---

## **📄 Llicència**

Aquest projecte està sota la **Llicència MIT**, que en permet l’ús, modificació i distribució lliure, sempre que s’inclogui l’avís de drets d’autor i la renúncia de responsabilitat.

---

## **🤝 Contribucions**

S’accepten contribucions mitjançant **pull requests**.  
Per a suggeriments o millores, obre un **issue** a GitHub per debatre els canvis abans d’implementar-los.


_________________--

