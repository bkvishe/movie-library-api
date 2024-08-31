import express from 'express';
import { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie } from '../controllers/moviesController.js';
import validate from '../middlewares/validate.js';
import movieSchema from '../validators/movieValidator.js';

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', validate(movieSchema), addMovie);
router.get('/:id', getMovieById);
router.put('/:id', validate(movieSchema), updateMovie);
router.delete('/:id', deleteMovie);

export default router;
