const asanas = require("./yoga-asanas.json");


const getAsanas = (req, res) => {
  res.json(asanas.map((a) => a.sanskrit_name));
};

const searchAsanas = (req, res) => {
  const query = req.query.name;
  const searchResult = asanas.filter((asana) =>
    asana.english_name.toLowerCase().includes(query.toLowerCase())
  );
  res.json(searchResult);
};

const getAsanasByCategory = (req, res) => {
  const category = req.params.id;
  res.json(asanas.filter((a) => a.pose_meta.includes(category)));
};

const getAsanaById = (req, res) => {
  const asana = asanas.find((asana) => asana.id == req.params.id);
  res.json(asana);
};

// getAsanas by difficulty
const getAsanasByDifficulty = (req, res) => {
  const difficulty = req.params.id;
  res.json(asanas.filter((a) => a.difficulty == difficulty));
};
module.exports = {
  getAsanas,
  searchAsanas,
  getAsanaById,
  getAsanasByCategory,
  getAsanasByDifficulty,
};
