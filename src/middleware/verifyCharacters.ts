import Joi from "joi";
import { getValidation } from "./joiHelpers";

const characterBody = {
  name: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.number().required(),
};

const { name, age, weight } = characterBody;

const characterSchema = Joi.object({ name, age, weight });

export const getCharacterBodyValidation = getValidation(characterSchema);
