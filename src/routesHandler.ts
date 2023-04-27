import { createCors } from "itty-cors";
import { Router } from "itty-router";
import { apiResponse } from "./utils/routes";
import { welcomeHander } from "./handlers/welcome";
import { notFoundHandler } from "./handlers/notFound";
import { getCharactersHandler } from "./handlers/characters/getCharacters";
import { getRandomCharactersHandler } from "./handlers/characters/getRandomCharacters";
import { verifyBody } from "./middleware/verifyCharacters";
import { createCharacterHandler } from "./handlers/characters/createCharacter";

const { preflight, corsify } = createCors({ origins: ["*"] });

const router = Router();

// @ts-ignore
router.all("*", preflight);
router.get("/", welcomeHander);

// character routes
router.get("/characters", getCharactersHandler);
router.get("/characters/random", getRandomCharactersHandler);
// TODO needs to add a check for isJared on the query
// @ts-ignore
router.post("/characters", verifyBody, createCharacterHandler);

router.all("*", notFoundHandler);

export const handleRequest = (request: Request) => {
  return router.handle(request).then(corsify);
};

export const handleErrorRequest = (request: Request) => {
  const statusCode = 500;
  return apiResponse(
    { message: "Theres been an error accessing the api" },
    statusCode
  );
};
