import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = "https://analisi.transparenciacatalunya.cat/resource/yavr-pn8q.json";
    const params = { $limit: req.query.limit || 5000 };
    const response = await axios.get(url, { params, timeout: 15000 });
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
