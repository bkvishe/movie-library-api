import dynamoose from "dynamoose";

// Define the schema and model (can be in a separate model file)
const movieSchema = new dynamoose.Schema({
  movieId: String,
  name: String,
  nameSearch: String,
  details: String,
  genre: String,
  genreSearch: String,
  actors: String,
  releaseYear: Number,
  director: String,
  language: String,
  languageSearch: String,
  posterUrl: String,
});

export const Movie = dynamoose.model(process.env.MOVIES_TABLE, movieSchema, {
  create: false, 
  update: false,
  waitForActive: false,
});
