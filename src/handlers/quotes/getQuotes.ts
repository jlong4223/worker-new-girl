import { QuoteResponseObj } from "../../database/documents/quotes/interfaces";
import { getAllQuotes } from "../../database/documents/quotes/quotes";
import { setQuoteObj } from "../../utils/conversions";
import { apiResponse } from "../../utils/routes";

export const getQuotesHandler = async () => {
  const quotes = await getAllQuotes();
  const quotesData = quotes.data.map(
    (quote): QuoteResponseObj => setQuoteObj(quote)
  );

  return apiResponse(quotesData);
};
