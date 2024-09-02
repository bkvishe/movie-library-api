import movieService from '../../services/moviesService.js';
import { Movie } from '../../models/movieModel.js';
import DuplicateRecordException from '../../exceptions/DuplicateRecordException.js';
import RecordNotFoundException from '../../exceptions/RecordNotFoundException.js';

// Mock the Movie model
jest.mock('../../models/movieModel.js');

describe('Movie Service', () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    describe('getAllMovies', () => {
        it('should return all movies when no search keyword is provided', async () => {
            const mockMovies = [{ name: 'Inception' }, { name: 'Interstellar' }];
            Movie.scan.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(mockMovies),
            });

            const result = await movieService.getAllMovies();
            expect(result).toEqual(mockMovies);
        });

        it('should filter movies based on search keyword', async () => {
            const mockMovies = [{ name: 'Inception' }];
            Movie.scan.mockReturnValueOnce({
                filter: jest.fn().mockReturnThis(),
                contains: jest.fn().mockReturnThis(),
                or: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue(mockMovies),
                toJSON: jest.fn().mockReturnValue(mockMovies),
            });

            const result = await movieService.getAllMovies('Inception');
            expect(result).toEqual(mockMovies);
        });
    });

    describe('getMovieById', () => {
        it('should return a movie by ID', async () => {
            const mockMovie = { movieId: '1', name: 'Inception' };
            Movie.get.mockResolvedValue(mockMovie);

            const result = await movieService.getMovieById('1');
            expect(result).toEqual(mockMovie);
        });

        it('should throw RecordNotFoundException if movie does not exist', async () => {
            Movie.get.mockResolvedValue(null);

            await expect(movieService.getMovieById('1')).rejects.toThrow(RecordNotFoundException);
        });
    });

    describe('addMovie', () => {
        const movieData = {
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
            // Mocking the scan method to simulate no existing movie
            Movie.scan.mockReturnValueOnce({
                eq: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue({ count: 0 }),
            });

            // Mock the save method to simulate a successful save operation
            Movie.prototype.save = jest.fn().mockResolvedValue({
                movieId: 'test-uuid',
                ...movieData,
            });

            await movieService.addMovie(movieData);

            expect(Movie.prototype.save).toHaveBeenCalled();
        });

        it('should throw DuplicateRecordException if movie already exists', async () => {
            const movieData = { name: 'Inception' };
            Movie.scan = jest.fn().mockReturnValue({
                eq: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue({ count: 1 }),
            });

            await expect(movieService.addMovie(movieData)).rejects.toThrow(DuplicateRecordException);
        });
    });


    describe('updateMovie', () => {
        it('should update a movie successfully', async () => {
            const movieId = '1';
            const updateData = {
                "director": "director",
                "releaseYear": 2020,
                "actors": "actors",
                "details": "details",
                "name": "The Movie Updated",
                "genre": "Sci-fi",
                "posterUrl": "posterUrl",
                "language": "English"
            };
            const existingMovie = {
                movieId: '1',
                "director": "director",
                "releaseYear": 2020,
                "actors": "actors",
                "details": "details",
                "name": "The Movie",
                "genre": "Sci-fi",
                "posterUrl": "posterUrl",
                "language": "English"
            };

            Movie.get.mockResolvedValue(existingMovie);
            Movie.scan.mockReturnValueOnce({
                filter: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                and: jest.fn().mockReturnThis(),
                not: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue([])
            });
            Movie.update.mockResolvedValue(updateData);

            const result = await movieService.updateMovie(movieId, updateData);
            expect(result).toEqual(updateData);
        });


        it('should throw DuplicateRecordException if another movie with the same name exists', async () => {
            const movieId = '1';
            const updateData = {
                "director": "director",
                "releaseYear": 2020,
                "actors": "actors",
                "details": "details",
                "name": "The Movie Updated",
                "genre": "Sci-fi",
                "posterUrl": "posterUrl",
                "language": "English"
            };
            const existingMovie = {
                movieId: '1',
                "director": "director",
                "releaseYear": 2020,
                "actors": "actors",
                "details": "details",
                "name": "The Movie Updated",
                "genre": "Sci-fi",
                "posterUrl": "posterUrl",
                "language": "English"
            };

            Movie.get.mockResolvedValue(existingMovie);
            Movie.scan.mockReturnValueOnce({
                filter: jest.fn().mockReturnThis(),
                eq: jest.fn().mockReturnThis(),
                and: jest.fn().mockReturnThis(),
                not: jest.fn().mockReturnThis(),
                exec: jest.fn().mockResolvedValue({ count: 1 })
            });

            await expect(movieService.updateMovie(movieId, updateData)).rejects.toThrow(DuplicateRecordException);
        });

        it('should throw RecordNotFoundException if movie does not exist', async () => {
            const movieId = '1';
            const updateData = { name: 'Inception Updated' };

            Movie.get.mockResolvedValue(null);

            await expect(movieService.updateMovie(movieId, updateData)).rejects.toThrow(RecordNotFoundException);
        });
    });

    describe('deleteMovie', () => {
        it('should delete a movie successfully', async () => {
            const movieId = '1';
            const mockMovie = { movieId: '1', name: 'Inception' };

            Movie.get.mockResolvedValue(mockMovie);
            Movie.delete.mockResolvedValue({});

            await movieService.deleteMovie(movieId);
            expect(Movie.delete).toHaveBeenCalledWith(movieId);
        });

        it('should throw RecordNotFoundException if movie does not exist', async () => {
            const movieId = '1';

            Movie.get.mockResolvedValue(null);

            await expect(movieService.deleteMovie(movieId)).rejects.toThrow(RecordNotFoundException);
        });
    });
});
