import Joi from 'joi';

const movieSchema = Joi.object({
  name: Joi.string().min(1).required(),
  details: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required(),
  releaseYear: Joi.string().min(4).required(),
  director: Joi.string().min(2).required(),
  posterUrl: Joi.string().min(1).required(),
  language: Joi.string().min(2).required(),
  actors: Joi.string().min(2).required(),
});

export default movieSchema;