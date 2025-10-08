# **ViuActiu Gent Gran**

**Autora:** Ana Lucía Silva Córdoba  

ViuActiu Gent Gran és una plataforma web destinada a centralitzar i facilitar l’accés a recursos i ajuts per a les persones grans a Catalunya. El seu objectiu és promoure un envelliment actiu i saludable mitjançant la recopilació d’informació actualitzada sobre serveis, ajuts públics i espais de participació ciutadana.  

---

## **Descripció del projecte**

La plataforma proporciona informació clara i accessible sobre:  

- **Serveis de dependència:**  
  Mapes interactius de centres de dia, residències i altres serveis d’atenció a les persones grans a Catalunya.  

- **Ajuts econòmics:**  
  Informació detallada sobre subvencions i ajuts públics disponibles per a les persones grans i les seves famílies.  

- **Recursos oberts:**  
  Accés a dades obertes oficials sobre la tercera edat i els serveis socials.  

- **Participació ciutadana:**  
  Enllaços i accés a espais de participació gestionats per les administracions públiques, fomentant la inclusió activa de la gent gran a la societat.  

La plataforma utilitza dades obertes oficials provinents de la Generalitat de Catalunya, la Diputació de Barcelona i l’Ajuntament de Barcelona, garantint la fiabilitat i actualitat de la informació.  

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


