import { Router } from "itty-router";
import {
  getCharactersByIDHandler,
  getCharactersHandler,
} from "../handlers/characters/getCharacters";
import { getCharacterBodyValidation } from "../middleware/characterValidation";
import { createCharacterHandler } from "../handlers/characters/createCharacter";
import { getRandomCharactersHandler } from "../handlers/characters/getRandomCharacters";
import { getMainCharactersHandler } from "../handlers/characters/getMainCharacters";
import { getRecurringCharactersHandler } from "../handlers/characters/getRecurringCharacters";

export const charactersRouter = Router();

charactersRouter.get("/characters", getCharactersHandler);
charactersRouter.get("/characters/random", getRandomCharactersHandler);
charactersRouter.get("/characters/main", getMainCharactersHandler);
charactersRouter.get("/characters/recurring", getRecurringCharactersHandler);
charactersRouter.get("/characters/:id", getCharactersByIDHandler);

// TODO needs to add a check for isJared on the query
charactersRouter.post(
  "/characters",
  // @ts-ignore
  getCharacterBodyValidation,
  createCharacterHandler
);
