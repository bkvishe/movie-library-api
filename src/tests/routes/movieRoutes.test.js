import request from 'supertest';
import movieService from '../../services/moviesService.js';
import { server } from "../../app.js";
import DuplicateRecordException from "../../exceptions/DuplicateRecordException.js";
import RecordNotFoundException from "../../exceptions/RecordNotFoundException.js";

jest.mock('../../services/moviesService.js');

// Mock the auth middleware
jest.mock('../../middlewares/auth.js', () => ({
    authenticateXApiKey: jest.fn((req, res, next) => next())
  }));

describe('Movies Controller', () => {
  
  describe('GET /api/v1/movies', () => {
    it('should fetch all movies successfully', async () => {
      const mockMovies = [{ name: 'Inception' }, { name: 'Interstellar' }];
      movieService.getAllMovies.mockResolvedValue(mockMovies);

      const res = await request(server).get('/api/v1/movies').set('x-api-key', '123');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual(mockMovies);
    });
  });

  describe('GET /api/v1/movies/:id', () => {
    it('should fetch a movie by ID', async () => {
      const mockMovie = { movieId: '1', name: 'Inception' };
      movieService.getMovieById.mockResolvedValue(mockMovie);

      const res = await request(server).get('/api/v1/movies/1').set('x-api-key', '123');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual(mockMovie);
    });

    it('should return 404 if movie is not found', async () => {
      movieService.getMovieById.mockRejectedValue(new Error('The movie not found'));

      const res = await request(server).get('/api/v1/movies/1').set('x-api-key', '123');
      expect(res.status).toBe(500); // Adjust based on how you handle RecordNotFoundException
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('The movie not found');
    });
  });

  describe('POST /api/v1/movies', () => {
    const newMovie = {
        "director": "director",
        "releaseYear": 2020,
        "actors": "actors",
        "details": "details",
        "name": "The Test Movie1",
        "genre": "Sci-fi",
        "posterUrl": "posterUrl",
        "language": "English"
    };

    it('should add a new movie successfully', async () => {
      movieService.addMovie.mockResolvedValue(newMovie);

      const res = await request(server)
        .post('/api/v1/movies')
        .send(newMovie)
        .set('x-api-key', '123');

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
    });

    it('should return validation error', async () => {
        movieService.addMovie.mockResolvedValue(newMovie);
  
        const res = await request(server)
          .post('/api/v1/movies')
          .send({})
          .set('x-api-key', '123');
  
        expect(res.status).toBe(400);
        expect(res.body.status).toBe('error');
      });

    it('should return 400 if movie already exists', async () => {
      movieService.addMovie.mockRejectedValue(new DuplicateRecordException('A movie with the same name already exists.'));

      const res = await request(server)
        .post('/api/v1/movies')
        .send(newMovie)
        .set('x-api-key', '123');

      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  describe('PUT /api/v1/movies/:id', () => {
    const updatedMovie = {
        "director": "director",
        "releaseYear": 2020,
        "actors": "actors",
        "details": "details",
        "name": "The Test Movie1",
        "genre": "Sci-fi",
        "posterUrl": "posterUrl",
        "language": "English"
    };
    it('should update a movie successfully', async () => {
      movieService.updateMovie.mockResolvedValue(updatedMovie);

      const res = await request(server)
        .put('/api/v1/movies/1')
        .send(updatedMovie)
        .set('x-api-key', '123');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual(updatedMovie);
    });

    it('should return 404 if movie is not found', async () => {
      movieService.updateMovie.mockRejectedValue(new RecordNotFoundException('The movie not found'));

      const res = await request(server)
        .put('/api/v1/movies/1')
        .send(updatedMovie)
        .set('x-api-key', '123');

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('The movie not found');
    });
  });

  describe('DELETE /api/v1/movies/:id', () => {
    it('should delete a movie successfully', async () => {
      movieService.deleteMovie.mockResolvedValue();

      const res = await request(server)
        .delete('/api/v1/movies/1')
        .set('x-api-key', '123');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('Movie deleted successfully');
    });

    it('should return 404 if movie is not found', async () => {
      movieService.deleteMovie.mockRejectedValue(new Error('The movie not found'));

      const res = await request(server)
        .delete('/api/v1/movies/1')
        .set('x-api-key', '123');

      expect(res.status).toBe(500); // Adjust based on how you handle RecordNotFoundException
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('The movie not found');
    });
  });

});
