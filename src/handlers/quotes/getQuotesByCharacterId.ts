import { getQuotesByCharacterId } from "../../database/documents/quotes/quotes";
import { apiResponse } from "../../utils/routes";

export const getQuotesByCharacterIdHandler = async ({ params }: any) => {
  const { id: characterId } = params;
  const quotes = await getQuotesByCharacterId(characterId);

  const quotesWithCorrectKeyName = {
    quotes: [...quotes.data],
  };

  return apiResponse(quotesWithCorrectKeyName);
};
