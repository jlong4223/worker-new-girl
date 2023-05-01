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
import { patchCharacterHandler } from "../handlers/characters/patchCharacter";

export const charactersRouter = Router({ base: "/characters" });

charactersRouter.get("/", getCharactersHandler);
charactersRouter.get("/random", getRandomCharactersHandler);
charactersRouter.get("/main", getMainCharactersHandler);
charactersRouter.get("/recurring", getRecurringCharactersHandler);
charactersRouter.get("/:id", getCharactersByIDHandler);

// TODO protect these routes
charactersRouter.patch("/:id", patchCharacterHandler);

// TODO needs to add a check for isJared on the query
charactersRouter.post(
  "/",
  // @ts-ignore
  getCharacterBodyValidation,
  createCharacterHandler
);
