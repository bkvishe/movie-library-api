import Joi from 'joi';

const currentYear = new Date().getFullYear();

const movieSchema = Joi.object({
  name: Joi.string().min(1).required(),
  details: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required(),
  releaseYear: Joi.number().integer().min(1500).max(currentYear).required(),
  posterUrl: Joi.string().min(1).required(),
  language: Joi.string().min(2).required(),
  director: Joi.string().min(2).required(),
  actors: Joi.string().min(2).required(),
});

export default movieSchema;