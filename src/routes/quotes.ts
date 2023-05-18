import { Router } from "itty-router";
import { getQuotesHandler } from "../handlers/quotes/getQuotes";
import { getQuotesByCharacterIdHandler } from "../handlers/quotes/getQuotesByCharacterId";

export const quotesRouter = Router({ base: "/quotes" });

quotesRouter.get("/", getQuotesHandler);
quotesRouter.get("/:id", getQuotesByCharacterIdHandler);
