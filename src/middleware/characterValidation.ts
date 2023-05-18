import Joi from "joi";
import { getValidation } from "./joiHelpers";

const characterBody = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  occupations: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  type: Joi.string().required(), // main or recurring
};

const { name, age, occupations, image, type } = characterBody;

const characterSchema = Joi.object({ name, age, occupations, image, type });

export const getCharacterBodyValidation = getValidation(characterSchema);
