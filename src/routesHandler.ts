import { createCors } from "itty-cors";
import { Router } from "itty-router";
import { apiResponse } from "./utils/routes";
import { welcomeHander } from "./handlers/welcome";
import { notFoundHandler } from "./handlers/notFound";
import { charactersRouter } from "./routes/characters";
import { checkForTestRequest } from "./middleware/checkForTestRequest";
import { quotesRouter } from "./routes/quotes";
import { setFaunaSecret } from "@gearsnbeans/faunadb-utils";

const { preflight, corsify } = createCors({ origins: ["*"] });

const router = Router();

// @ts-ignore
router.all("*", preflight);
router.all("*", checkForTestRequest);
router.get("/", welcomeHander);
router.all("/characters/*", charactersRouter.handle);
router.all("/quotes/*", quotesRouter.handle);
router.all("*", notFoundHandler);

export const handleRequest = (request: Request) => {
  // @ts-ignore
  const secret = FAUNA_SECRET;

  setFaunaSecret(secret);

  return router
    .handle(request)
    .then(corsify)
    .catch((e) => handleErrorRequest(request, e));
};

export const handleErrorRequest = (request: Request, e: Error) => {
  const statusCode = 500;
  return apiResponse(
    {
      message: "Theres been an error accessing the api.",
      note: "This route may not exist or is currently under maintenance.",
      error: e.message,
      errorDetails: e.stack,
      request: {
        url: request.url,
        method: request.method,
        headers: request.headers,
      },
    },
    statusCode
  );
};
