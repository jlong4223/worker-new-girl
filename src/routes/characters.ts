import { Router } from "itty-router";
import {
  getCharactersByIDHandler,
  getCharactersHandler,
} from "../handlers/characters/getCharacters";
import { verifyBody } from "../middleware/verifyCharacters";
import { createCharacterHandler } from "../handlers/characters/createCharacter";
import { getRandomCharactersHandler } from "../handlers/characters/getRandomCharacters";

export const charactersRouter = Router();

charactersRouter.get("/characters", getCharactersHandler);
charactersRouter.get("/characters/random", getRandomCharactersHandler);
charactersRouter.get("/characters/:id", getCharactersByIDHandler);

// TODO needs to add a check for isJared on the query
// @ts-ignore
charactersRouter.post("/characters", verifyBody, createCharacterHandler);
