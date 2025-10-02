import axios from "axios";

export default async function handler(req, res) {
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

    res.status(200).json({
      data: allData,
      meta: { total: allData.length, sources: ["beneficiaris", "materies"] },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
