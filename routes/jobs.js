const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/", async (req, res) => {
  try {
    const { title, sort } = req.query;
    const query = {};

    if (title) {
      // Wyszukiwanie stanowiska (case-insensitive)
      query.title = { $regex: title, $options: "i" };
    }

    const sortOptions = {};
    if (sort === "location" || sort === "seniorityLevel") {
      sortOptions[sort] = 1; // 1 = rosnąco
    }

    const jobs = await Job.find(query).sort(sortOptions);
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
