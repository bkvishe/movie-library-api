import { movies } from "../../data/movies.js";
import { createMovie } from "../services/moviesService.js"

export const getAllMovies = async (req, res) => {

    const movie = {
        movieId: "1",
        name: "name",
        details: "details",
        genre: "genre",
        actors: "actors",
        releaseDate: "releaseDate",
        director: "director",
        rating: "rating",
        duration: "duration",
        language: "language",
        posterUrl: "posterUrl",
      }

    const result = await createMovie(movie);

    console.log({result});

    return res.jsonResponse(201, {
        status: "success",
        message: "Data added successfully",
        data: movie
    });
};

export const addMovie = async (req, res) => {

    const movie = {
        movieId: "1",
        name: "name",
        details: "details",
        genre: "genre",
        actors: "actors",
        releaseDate: "releaseDate",
        director: "director",
        rating: "rating",
        duration: "duration",
        language: "language",
        posterUrl: "posterUrl",
      }

    const result = await createMovie(movie);

    console.log({result});

    return res.jsonResponse(201, {
        status: "success",
        message: "Data added successfully",
        data: movie
    });
};

export const getMovieById = (req, res) => {

    const id = Number(req.params.id);
    const movie = movies.find((m) => m._id === id);

    if (!movie) {
        return res.jsonResponse(404, {
            status: "error",
            message: "Data not found",
        });
    }

    return res.jsonResponse(200, {
        status: "success",
        message: "Data fetched successfully",
        data: movie
    });
};

export const updateMovie = (req, res) => {

    const id = Number(req.params.id);
    const index = movies.findIndex((m) => m._id === id);

    if (index < 0) {
        return res.jsonResponse(404, {
            status: "error",
            message: "Data not found",
        });
    }

    movies[index] = { 
        _id: id, 
        ...req.body 
    };

    return res.jsonResponse(200, {
        status: "success",
        message: "Data updated successfully",
        data: movies[index]
    });
};

export const deleteMovie = (req, res) => {
    const id = Number(req.params.id);
    const index = movies.findIndex((m) => m._id === id);

    if (index < 0) {
        return res.jsonResponse(404, {
            status: "error",
            message: "Data not found",
        });
    }

    movies.splice(index, 1);

    return res.jsonResponse(200, {
        status: "success",
        message: "Data deleted successfully"
    });
};
