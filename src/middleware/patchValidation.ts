import Joi from "joi";
import { getValidation } from "./joiHelpers";

const characterBody = {
  name: Joi.string(),
  age: Joi.number(),
  occupation: Joi.string(),
  image: Joi.string(),
  type: Joi.string(),
};

const { name, age, occupation, image, type } = characterBody;

const characterSchema = Joi.object({ name, age, occupation, image, type });

export const getCharacterPatchValidation = getValidation(characterSchema);
