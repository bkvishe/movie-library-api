import movieService from "../services/moviesService.js"

export const getAllMovies = async (req, res, next) => {

    try {
        const searchKeyword = req?.query?.keyword;
        const movies = await movieService.getAllMovies(searchKeyword);
        return res.jsonResponse(200, {
            status: "success",
            message: "Movies fetched successfully",
            data: movies
        });
    }
    catch (error) {
        next(error);
    }
};

export const getMovieById = async (req, res, next) => {

    try {
        const id = req.params.id;
        const movie = await movieService.getMovieById(id);

        return res.jsonResponse(200, {
            status: "success",
            message: "Movie fetched successfully",
            data: movie
        });
    }
    catch (error) {
        next(error);
    }
};

export const addMovie = async (req, res, next) => {

    try {
        const result = await movieService.addMovie(req.body);

        return res.jsonResponse(201, {
            status: "success",
            message: "Movie added successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};

export const updateMovie = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await movieService.updateMovie(id, req.body);

        return res.jsonResponse(200, {
            status: "success",
            message: "Movie updated successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        const id = req.params.id;

        await movieService.deleteMovie(id);

        return res.jsonResponse(200, {
            status: "success",
            message: "Movie deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
