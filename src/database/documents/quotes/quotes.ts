import { Collections } from "../../collections";
import { getQuotesByCharacterIdIndex } from "../../indexes";
import { getAllDocumentsRefsAndData } from "../../queries";

export const getAllQuotes = async () => {
  const quotes = await getAllDocumentsRefsAndData(Collections.QUOTES);
  return quotes;
};

export const getQuotesByCharacterId = async (id: string) => {
  const quotes = await getQuotesByCharacterIdIndex(id);
  return quotes;
};
