import { Router } from "itty-router";
import { getQuotesHandler } from "../handlers/quotes/getQuotes";

export const quotesRouter = Router({ base: "/quotes" });

quotesRouter.get("/", getQuotesHandler);
