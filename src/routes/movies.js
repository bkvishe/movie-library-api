import express from 'express';
import { getAllMovies, addMovie, getMovieById, updateMovie, deleteMovie } from '../controllers/moviesController.js';
import { authenticateXApiKey } from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import movieSchema from '../validators/movieValidator.js';

const router = express.Router();

router.get('/', authenticateXApiKey, getAllMovies);
router.post('/', authenticateXApiKey, validate(movieSchema), addMovie);
router.get('/:id', authenticateXApiKey, getMovieById);
router.put('/:id', authenticateXApiKey, validate(movieSchema), updateMovie);
router.delete('/:id', authenticateXApiKey, deleteMovie);

export default router;
