const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/", async (req, res) => {
  try {
    const { role, location, position } = req.query;
    const query = {};

    if (role) {
      // Wyszukiwanie stanowiska (case-insensitive)
      query.role = { $regex: role, $options: "i" };
    }

    if (location) {
      // Filtrowanie po lokalizacji (case-insensitive)
      query.location = { $regex: location, $options: "i" };
    }

    if (position) {
      // Filtrowanie po pozycji (case-insensitive)
      query.position = { $regex: position, $options: "i" };
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

module.exports = router;
