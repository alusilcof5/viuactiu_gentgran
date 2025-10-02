export default function handler(req, res) {
  res.status(200).json({
    success: true,
    result: {
      records: [
        { nom: "Casal d'Avis Gràcia", barri: "Gràcia" },
        { nom: "Centre Cívic Cotxeres Sants", barri: "Sants" },
      ],
    },
  });
}
