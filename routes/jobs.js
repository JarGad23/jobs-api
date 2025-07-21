const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  try {
    const jobs = await Job.find().limit(limit);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching jobs" });
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
