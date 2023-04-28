import { createCors } from "itty-cors";
import { Router } from "itty-router";
import { apiResponse } from "./utils/routes";
import { welcomeHander } from "./handlers/welcome";
import { notFoundHandler } from "./handlers/notFound";
import { charactersRouter } from "./routes/characters";
import { checkForTestRequest } from "./middleware/checkForTestRequest";

const { preflight, corsify } = createCors({ origins: ["*"] });

const router = Router();

// @ts-ignore
router.all("*", preflight);
router.all("*", checkForTestRequest);
router.get("/", welcomeHander);
router.all("/characters/*", charactersRouter.handle);
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
