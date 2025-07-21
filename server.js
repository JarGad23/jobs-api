const express = require("express");
const mongoose = require("mongoose");
const jobsRoutes = require("./routes/jobs");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/jobs", jobsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
