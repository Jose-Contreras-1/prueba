import Joi from "joi";
import { CreateAnimeDTO, UpdateAnimeDTO } from "../dto/AnimeDTO";

export const createAnimeSchema: Joi.ObjectSchema<CreateAnimeDTO> = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string().required(),
  published: Joi.date().required(),
  duration: Joi.number().required(),
  year: Joi.number().required(),
  type: Joi.string().required(),
  episodes: Joi.number().required(),
  photo: Joi.string().uri()
})

export const updateAnimeSchema: Joi.ObjectSchema<UpdateAnimeDTO> = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string().required(),
  published: Joi.date().required(),
  duration: Joi.number().required(),
  year: Joi.number().required(),
  type: Joi.string().required(),
  episodes: Joi.number().required(),
  photo: Joi.string().uri()
})