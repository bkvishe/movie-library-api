import dynamoose from "dynamoose";

// Define the schema and model (can be in a separate model file)
const movieSchema = new dynamoose.Schema({
  movieId: String,
  name: String,
  details: String,
  genre: String,
  actors: String,
  releaseYear: String,
  director: String,
  rating: String,
  duration: String,
  language: String,
  posterUrl: String,
});

export const Movie = dynamoose.model(process.env.MOVIES_TABLE, movieSchema, {
  create: false, 
  update: false,
  waitForActive: false,
});
