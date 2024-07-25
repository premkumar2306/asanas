// change to rquire
const express = require("express");
const {
  getAsanas,
  searchAsanas,
  getAsanaById,
  getAsanasByCategory,
  getAsanasByDifficulty,
} = require("./asanasService.js");
const app = express();

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

app.get("/", (req, res) => {
  res.send("Welcome to Yoga Asanas API");
});

app.get("/asanas", getAsanas);

app.get("/asanas/search", searchAsanas);

app.get("/asanas/:id", getAsanaById);

app.get("/asanas/category/:id", getAsanasByCategory);

app.get("/asanas/difficulty/:id", getAsanasByDifficulty);
