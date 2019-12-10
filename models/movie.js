const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  actorId: String
});

module.exports = mongoose.model("Movie", movieSchema);
