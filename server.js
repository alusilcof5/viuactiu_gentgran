import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 5001;

// ==========================
// CONFIGURACIÓN DE SEGURIDAD
// ==========================

app.use(helmet());

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, try again later." },
});
app.use(limiter);

// ==========================
// ENDPOINTS
// ==========================

// Función helper para fetch con timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

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
      const query = new URLSearchParams(params).toString();
      const url = `${baseUrl}?${query}`;

      try {
        const data = await fetchWithTimeout(url, {}, 10000);
        if (data?.data) {
          data.data.forEach((ajut) => {
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
      return res.status(500).json({ error: "No se han podido obtener datos" });
    }

    res.json({ data: allData, meta: { total: allData.length, sources: ["beneficiaris", "materies"] } });
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
    const params = new URLSearchParams({ $limit: req.query.limit || 5000 }).toString();
    const fullUrl = `${url}?${params}`;

    const data = await fetchWithTimeout(fullUrl, {}, 15000);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Proxy server is running" });
});

// ==========================
// INICIO SERVIDOR LOCAL
// ==========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor seguro en http://localhost:${PORT}`);
});
