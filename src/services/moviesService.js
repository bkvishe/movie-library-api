import { Movie } from "../models/movieModel.js";

export const createMovie = async (data) => {
  try {

    const newMovie = new Movie(data);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error(`Error creating movie: ${error.message}`);
  }
};
