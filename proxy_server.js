// proxy_server.js
// Servidor proxy para evitar problemas CORS con APIs públicas
// Ejecutar: node proxy_server.js
// El servidor escuchará en http://localhost:5001

import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5001;

app.use(cors()); // Permite todas las peticiones CORS

// Cache simple (memoria)
const cache = {};

// ==========================
// GET /api/ajuts
// ==========================
app.get("/api/ajuts", async (req, res) => {
  try {
    console.log("📡 Obtenint ajuts des de l'API CIDO...");

    const baseUrl = "https://api.diba.cat/dadesobertes/cido/v1/subvencions";

    const urlsParams = [
      {
        "filter[idEstat]": "2,3",
        "filter[idTipusSubvencio]": "21,22,23",
        "filter[beneficiaris.id]": "12",
        sort: "-maxDataPublicacioDocument",
      },
      {
        "filter[idEstat]": "2,3",
        "filter[idTipusSubvencio]": "21,22,23",
        "filter[materies.id]": "370",
        sort: "-maxDataPublicacioDocument",
      },
    ];

    let allData = [];
    let seenIds = new Set();

    for (const params of urlsParams) {
      try {
        const response = await axios.get(baseUrl, { params, timeout: 10000 });

        if (response.status === 200 && response.data?.data) {
          response.data.data.forEach((ajut) => {
            if (!seenIds.has(ajut.id)) {
              allData.push(ajut);
              seenIds.add(ajut.id);
            }
          });
          console.log(`  ✓ ${response.data.data.length} ajuts obtinguts`);
        } else {
          console.warn(`  ⚠ API retornó código ${response.status}`);
        }
      } catch (err) {
        console.error(`  ❌ Error en petición: ${err.message}`);
      }
    }

    if (allData.length === 0) {
      return res.status(500).json({
        error: "No s'han pogut obtenir dades",
        message: "Cap dels endpoints ha retornat dades",
      });
    }

    console.log(`✅ Total: ${allData.length} ajuts únics`);

    res.json({
      data: allData,
      meta: {
        total: allData.length,
        sources: ["beneficiaris", "materies"],
      },
    });
  } catch (err) {
    console.error("❌ Error inesperat:", err.message);
    res.status(500).json({
      error: err.message,
      message: "Error inesperat al connectar amb l'API",
    });
  }
});

// ==========================
// GET /api/barcelona-espais
// ==========================
app.get("/api/barcelona-espais", (req, res) => {
  try {
    // Datos de ejemplo
    const data = {
      success: true,
      result: {
        records: [
          {
            nom: "Casal d'Avis Gràcia",
            tipus: "Casal d'avis",
            adreca: "C/ Gran de Gràcia, 190",
            barri: "Gràcia",
            lat: 41.4036,
            lng: 2.1561,
          },
          {
            nom: "Centre Cívic Cotxeres Sants",
            tipus: "Centre cívic",
            adreca: "C/ Sants, 79",
            barri: "Sants",
            lat: 41.3748,
            lng: 2.1394,
          },
          {
            nom: "Casal d'Avis Poblenou",
            tipus: "Casal d'avis",
            adreca: "Rambla Poblenou, 42",
            barri: "Poblenou",
            lat: 41.4002,
            lng: 2.2016,
          },
          {
            nom: "Ateneu Fabricació Ciutat Meridiana",
            tipus: "Ateneu",
            adreca: "Pl. Provenç",
            barri: "Nou Barris",
            lat: 41.4677,
            lng: 2.1768,
          },
        ],
      },
    };

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Error al carregar dades de Barcelona",
    });
  }
});

// ==========================
// GET /api/generalitat-dependencia
// ==========================
app.get("/api/generalitat-dependencia", async (req, res) => {
  try {
    const url = "https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json";
    const params = {
      $limit: req.query.limit || 5000,
    };

    const response = await axios.get(url, { params, timeout: 15000 });

    if (response.status === 200) {
      res.json(response.data);
    } else {
      res.status(response.status).json({
        error: `API retornó código ${response.status}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Error al carregar dades de la Generalitat",
    });
  }
});

// ==========================
// GET /health
// ==========================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Proxy server is running",
    endpoints: {
      ajuts: `http://localhost:${PORT}/api/ajuts`,
      barcelona: `http://localhost:${PORT}/api/barcelona-espais`,
      generalitat: `http://localhost:${PORT}/api/generalitat-dependencia`,
    },
  });
});

// ==========================
// INICIO SERVIDOR
// ==========================
app.listen(PORT, "0.0.0.0", () => {
  console.log("=".repeat(60));
  console.log("🚀 Servidor proxy iniciat");
  console.log("=".repeat(60));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log("📌 Endpoints disponibles:");
  console.log("   - GET /api/ajuts (combina beneficiaris + matèries)");
  console.log("   - GET /api/barcelona-espais");
  console.log("   - GET /api/generalitat-dependencia");
  console.log("   - GET /health");
  console.log("=".repeat(60));
  console.log("⚠️  Recorda: Aquest servidor ha d'estar executant-se");
  console.log("    mentre utilitzes l'aplicació web");
  console.log("=".repeat(60));
  console.log("\n🔄 Esperant peticions...\n");
});

/* OPCIÓ SEGURA AMB MÉS CAPES DE SEGURETAT
import express from "express";
import cors from "cors";
import axios from "axios";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 5001;

// ==========================
// CONFIGURACIÓN DE SEGURIDAD
// ==========================

// Helmet → cabeceras de seguridad
app.use(helmet());

// CORS → solo permitir ciertos dominios
const allowedOrigins = ["http://localhost:3000", "https://tu-dominio.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No autorizado por CORS"));
      }
    },
  })
);

// Rate limiting → máximo 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, try again later." },
});
app.use(limiter);

// ==========================
// ENDPOINTS
// ==========================

app.get("/api/ajuts", async (req, res) => {
  try {
    const baseUrl = "https://api.diba.cat/dadesobertes/cido/v1/subvencions";

    const urlsParams = [
      {
        "filter[idEstat]": "2,3",
        "filter[idTipusSubvencio]": "21,22,23",
        "filter[beneficiaris.id]": "12",
        sort: "-maxDataPublicacioDocument",
      },
      {
        "filter[idEstat]": "2,3",
        "filter[idTipusSubvencio]": "21,22,23",
        "filter[materies.id]": "370",
        sort: "-maxDataPublicacioDocument",
      },
    ];

    let allData = [];
    let seenIds = new Set();

    for (const params of urlsParams) {
      try {
        const response = await axios.get(baseUrl, { params, timeout: 10000 });

        if (response.status === 200 && response.data?.data) {
          response.data.data.forEach((ajut) => {
            if (!seenIds.has(ajut.id)) {
              allData.push(ajut);
              seenIds.add(ajut.id);
            }
          });
        }
      } catch (err) {
        console.error("Error en petición:", err.message);
      }
    }

    if (allData.length === 0) {
      return res.status(500).json({
        error: "No s'han pogut obtenir dades",
      });
    }

    res.json({
      data: allData,
      meta: { total: allData.length, sources: ["beneficiaris", "materies"] },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Barcelona - ejemplo
app.get("/api/barcelona-espais", (req, res) => {
  res.json({
    success: true,
    result: {
      records: [
        { nom: "Casal d'Avis Gràcia", barri: "Gràcia" },
        { nom: "Centre Cívic Cotxeres Sants", barri: "Sants" },
      ],
    },
  });
});

// Generalitat - passthrough
app.get("/api/generalitat-dependencia", async (req, res) => {
  try {
    const url = "https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json";
    const params = { $limit: req.query.limit || 5000 };
    const response = await axios.get(url, { params, timeout: 15000 });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Proxy server is running" });
});

// ==========================
// INICIO SERVIDOR
// ==========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor seguro en http://localhost:${PORT}`);
});
 */