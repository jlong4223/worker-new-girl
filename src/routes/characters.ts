import { Router } from "itty-router";
import { getCharactersHandler } from "../handlers/characters/getCharacters";
import { getCharactersByIDHandler } from "../handlers/characters/getCharactersByIDHandler";
import { getCharacterBodyValidation } from "../middleware/characterValidation";
import { createCharacterHandler } from "../handlers/characters/createCharacter";
import { getRandomCharactersHandler } from "../handlers/characters/getRandomCharacters";
import { getMainCharactersHandler } from "../handlers/characters/getMainCharacters";
import { getRecurringCharactersHandler } from "../handlers/characters/getRecurringCharacters";
import { patchCharacterHandler } from "../handlers/characters/patchCharacter";
import { getCharacterPatchValidation } from "../middleware/patchValidation";
import { getDetailedCharacterHandler } from "../handlers/characters/getDetailedCharacter";
import { createCharacterDetailsHandler } from "../handlers/characters/createCharacterDetails";
import { patchCharacterDetailsHandler } from "../handlers/characters/patchCharacterDetails";
import { getCharacterQuotesHandler } from "../handlers/characters/getCharacterQuotes";
import { getCharacterAllDataHandler } from "../handlers/characters/getCharacterAllData";

export const charactersRouter = Router({ base: "/characters" });

charactersRouter.get("/", getCharactersHandler);
charactersRouter.get("/random", getRandomCharactersHandler);
charactersRouter.get("/main", getMainCharactersHandler);
charactersRouter.get("/recurring", getRecurringCharactersHandler);
charactersRouter.get("/:id", getCharactersByIDHandler);
charactersRouter.get("/:id/details", getDetailedCharacterHandler);
charactersRouter.get("/:id/quotes", getCharacterQuotesHandler);
charactersRouter.get("/:id/alldata", getCharacterAllDataHandler);

// TODO recreate when data is in D1 then protect these routes
// charactersRouter.patch(
//   "/:id",
//   // @ts-ignore
//   getCharacterPatchValidation,
//   patchCharacterHandler
// );

// charactersRouter.patch("/:id/details", patchCharacterDetailsHandler);

// // TODO needs to add a check for isJared on the query
// charactersRouter.post(
//   "/",
//   // @ts-ignore
//   getCharacterBodyValidation,
//   createCharacterHandler
// );

// charactersRouter.post("/:id/details", createCharacterDetailsHandler);
