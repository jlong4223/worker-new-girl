import { Router } from "itty-router";

export const quotesRouter = Router({ base: "/quotes" });

quotesRouter.get("/", () => {
  return new Response("Hello world from quotes");
});
