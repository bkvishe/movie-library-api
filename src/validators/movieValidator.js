import Joi from 'joi';

const movieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  releaseDate: Joi.date().iso().required(),
  genre: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  posterUrl: Joi.string().min(1).required(),
});

export default movieSchema;