import {
	getDataByIndexWithValueSet,
	getRawDataByIndex,
	IndexResult,
	RawDocumentRefs,
} from "@gearsnbeans/faunadb-utils";
import { Indexes } from "./collections";

export const getCharacterTypeIndex = async (
	type: string
): Promise<RawDocumentRefs> => {
	const charactersByType = await getRawDataByIndex(
		Indexes.CHARACTER_TYPE,
		type
	);
	return charactersByType;
};

export const getCharacterDetailsByRefIndex = async (
	characterRefID: string
): Promise<RawDocumentRefs> => {
	const characterDetails = await getRawDataByIndex(
		Indexes.CHARACTER_DETAILS,
		characterRefID
	);

	return characterDetails;
};

export const getQuotesByCharacterIdIndex = async (
	characterID: string
): Promise<IndexResult> => {
	const quotes = await getDataByIndexWithValueSet(
		Indexes.CHARACTER_ID,
		characterID
	);
	return quotes;
};
