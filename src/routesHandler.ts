import { createCors } from "itty-cors";
import { Router } from "itty-router";
import { returnResponse } from "./utils/routes";
import { welcomeHander } from "./handlers/welcome";
import { notFoundHandler } from "./handlers/notFound";

const { preflight, corsify } = createCors({ origins: ["*"] });

const router = Router();

// @ts-ignore
router.all("*", preflight);
router.get("/", welcomeHander);
router.all("*", notFoundHandler);

export const handleRequest = (request: Request) => {
  return router.handle(request).then(corsify);
};

export const handleErrorRequest = (request: Request) => {
  const statusCode = 500;
  return returnResponse(
    { message: "Theres been an error accessing the api" },
    statusCode
  );
};
