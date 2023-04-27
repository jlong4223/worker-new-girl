import Joi from "joi";
import { getValidation } from "./joiHelpers";

const characterBody = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  occupation: Joi.string().required(),
  image: Joi.string().required(),
  type: Joi.string().required(), // main or recurring
};

const { name, age, occupation, image, type } = characterBody;

const characterSchema = Joi.object({ name, age, occupation, image, type });

export const getCharacterBodyValidation = getValidation(characterSchema);
