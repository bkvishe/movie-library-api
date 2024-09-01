import { v4 as uuidv4 } from 'uuid';

import { Movie } from "../models/movieModel.js";
import DuplicateRecordException from "../exceptions/DuplicateRecordException.js";
import RecordNotFoundException from "../exceptions/RecordNotFoundException.js";


const movieService = {

  getAllMovies: async (searchKeyword) => {
    if(searchKeyword){
      return await Movie.scan()
        .filter("name")
        .contains(searchKeyword)
        .or()
        .filter("director")
        .contains(searchKeyword)
        .or()
        .filter("genre")
        .contains(searchKeyword)
        .or()
        .filter("language")
        .contains(searchKeyword)
        .or()
        .filter("actors")
        .contains(searchKeyword)
        .exec();
    }
    return await Movie.scan().exec();
  },

  getMovieById: async (movieId) => {
    const movie = await Movie.get(movieId);
    if(!movie){
      throw new RecordNotFoundException("The movie not found");
    }
    return movie;
  },

  addMovie: async (movieData) => {
    const existingMovies = await Movie.scan("name").eq(movieData.name).exec();

    if (existingMovies.count > 0) {
      throw new DuplicateRecordException("A movie with the same name already exists.");
    }

    const newMovie = new Movie({
      movieId: uuidv4(),
      ...movieData
    });
    console.log({newMovie});
    await newMovie.save();
    return newMovie;
  },

  updateMovie: async (movieId, updateData) => {
    const movie = await Movie.get(movieId);
    if(!movie){
      throw new RecordNotFoundException("The movie not found");
    }    
    const existingMovies = await Movie.scan()
    .filter("name")
    .eq(updateData.name)
    .and()
    .filter("movieId")
    .not()
    .eq(movieId)
    .exec();
    
    if(existingMovies.count){
      throw new DuplicateRecordException("A movie with the same name already exists.");
    }
    const updatedMovie = await Movie.update({ movieId }, updateData);
    return updatedMovie;
  },

  deleteMovie: async (movieId) => {
    const movie = await Movie.get(movieId);
    if(!movie){
      throw new RecordNotFoundException("The movie not found");
    }
    await Movie.delete(movieId);
  },
};

export default movieService;
