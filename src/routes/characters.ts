import { Router } from "itty-router";
import { getCharactersHandler } from "../handlers/characters/getCharacters";
import { getRandomCharactersHandler } from "../handlers/characters/getRandomCharacters";
import { verifyBody } from "../middleware/verifyCharacters";
import { createCharacterHandler } from "../handlers/characters/createCharacter";

export const charactersRouter = Router();

charactersRouter.get("/characters", getCharactersHandler);
charactersRouter.get("/characters/random", getRandomCharactersHandler);

// TODO needs to add a check for isJared on the query
// @ts-ignore
charactersRouter.post("/characters", verifyBody, createCharacterHandler);
