// api/generalitat-dependencia.js
export default async function handler(req, res) {
  try {
    const url = "https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json";
    const limit = req.query.limit || 5000;
    const query = new URLSearchParams({ $limit: limit }).toString();
    const fullUrl = `${url}?${query}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s

    try {
      const response = await fetch(fullUrl, { signal: controller.signal });
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      if (err.name === "AbortError") console.error("Timeout en petición:", fullUrl);
      else console.error("Error en petición:", err.message);
      res.status(500).json({ error: err.message });
    } finally {
      clearTimeout(timeout);
    }
  } catch (err) {
    console.error("Error general:", err.message);
    res.status(500).json({ error: err.message });
  }
}
