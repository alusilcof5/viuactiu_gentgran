export default async function handler(req, res) {
  try {
    const url = "https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json";
    const limit = req.query.limit || 5000;

    const fullUrl = `${url}?$limit=${limit}`;
    const response = await fetch(fullUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error en generalitat-dependencia:", err.message);
    res.status(500).json({ error: err.message });
  }
}
