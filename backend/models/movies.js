import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  description: String,
  images: [String],
  category: String,
  director: String,
  year: Number,
  language: String,
  rating: Number
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
