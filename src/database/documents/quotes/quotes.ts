import { getRawCollectionDocData } from "@gearsnbeans/faunadb-utils";
import { Collections } from "../../fauna_deprecated/collections";
import { getQuotesByCharacterIdIndex } from "../../indexes";

export const getAllQuotes = async () => {
	const quotes = await getRawCollectionDocData(Collections.QUOTES);
	return quotes;
};

export const getQuotesByCharacterId = async (id: string) => {
	const quotes = await getQuotesByCharacterIdIndex(id);
	return quotes;
};
