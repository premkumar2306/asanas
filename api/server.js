require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {
  getAsanas,
  searchAsanas,
  getAsanaById,
  getAsanasByCategory,
  getAsanasByDifficulty,
} = require("./asanasService.js");
const app = express();

// Use environment variable for port or default to 7000
const PORT = process.env.PORT || 7001;

// Use morgan for logging
app.use(morgan("combined"));

// Use helmet for security
app.use(helmet());

// Use cors for cross origin resource sharing
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Yoga Asanas API");
});

app.get("/asanas", getAsanas);

app.get("/asanas/search", searchAsanas);

app.get("/asanas/:id", getAsanaById);

app.get("/asanas/category/:id", getAsanasByCategory);

app.get("/asanas/difficulty/:id", getAsanasByDifficulty);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});