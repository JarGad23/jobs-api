const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: String,
    companyLogoUrl: String,
    address: String,
    category: String,
    role: String,
    location: String,
    workMode: String,
    position: String,
    responsibilities: [String],
    benefits: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
