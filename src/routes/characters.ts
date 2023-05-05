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
import { getCharacterPatchValidation } from "../middleware/patchValidation";
import { getDetailedCharacterHandler } from "../handlers/characters/getDetailedCharacter";
import { createCharacterDetailsHandler } from "../handlers/characters/createCharacterDetails";

export const charactersRouter = Router({ base: "/characters" });

charactersRouter.get("/", getCharactersHandler);
charactersRouter.get("/random", getRandomCharactersHandler);
charactersRouter.get("/main", getMainCharactersHandler);
charactersRouter.get("/recurring", getRecurringCharactersHandler);
charactersRouter.get("/:id", getCharactersByIDHandler);
charactersRouter.get("/:id/details", getDetailedCharacterHandler);

// TODO protect these routes
charactersRouter.patch(
  "/:id",
  // @ts-ignore
  getCharacterPatchValidation,
  patchCharacterHandler
);

// TODO needs to add a check for isJared on the query
charactersRouter.post(
  "/",
  // @ts-ignore
  getCharacterBodyValidation,
  createCharacterHandler
);

charactersRouter.post("/:id/details", createCharacterDetailsHandler);
