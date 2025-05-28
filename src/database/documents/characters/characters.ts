import {
	createNewDocument,
	updateDocumentData,
} from "@gearsnbeans/faunadb-utils";
import {
	getAllCharacters,
	getCharacterByType,
	getCharacterDataById,
	getCharacterDetailsById,
} from "../../../data/characters";
import {
	setCharacterAllDataObjForRes,
	setCharacterAndDetailsObjForRes,
	setCharacterObjV10,
} from "../../../utils/conversions";
import { apiResponse } from "../../../utils/routes";
import { Collections } from "../../collections";
import {
	getCharacterDetailsByRefIndex,
	getQuotesByCharacterIdIndex,
} from "../../indexes";
import { v10ApiErrors } from "../errors";
import {
	CharacterDetailsRes,
	CharacterDoc,
	CharacterParams,
	CharacterType,
	CharactersBody,
	CharactersBodyWithID,
} from "./interfaces";

const {
	CHARACTERS,
	CHARACTERS_TEST,
	CHARACTERS_DETAILS,
	CHARACTERS_TEST_DETAILS,
} = Collections;

export async function getCharacters({ size }: CharacterParams = {}) {
	const data = getAllCharacters(size);
	const characterData: CharactersBodyWithID[] = data.map((character) =>
		setCharacterObjV10(character as CharacterDoc)
	);

	return characterData;
}

export const getCharacterByID = async (
	id: string,
	isTest: boolean
): Promise<CharactersBodyWithID> => {
	const document = getCharacterDataById(id);
	return setCharacterObjV10(document as CharacterDoc);
};

export const createNewCharacter = async (
	character: CharactersBody,
	isTest: boolean
) => {
	const collection = isTest ? CHARACTERS_TEST : CHARACTERS;
	const newCharacterResult = await createNewDocument(character, collection);
	return newCharacterResult;
};

export const getCharacterType = async (type: CharacterType) => {
	const charactersByType = getCharacterByType(type);
	return charactersByType;
};

export const updateCharacter = async (
	id: string,
	body: CharactersBody,
	isTest: boolean
) => {
	const collection = isTest ? CHARACTERS_TEST : CHARACTERS;
	const updatedCharacter = await updateDocumentData(id, body, collection);
	return updatedCharacter;
};

export const getCharacterDetails = async (
	id: string,
	isTest: boolean
): Promise<CharacterDetailsRes | unknown> => {
	try {
		const character = await getCharacterByID(id, isTest);
		const details = getCharacterDetailsById(id);

		return setCharacterAndDetailsObjForRes(character, details);
	} catch (err: any | unknown) {
		const errorMessage = {
			customMessage: "Details not found. Check that the `id` is correct",
			message: v10ApiErrors.NOT_FOUND_MESSAGE,
			idProvided: id,
		};
		return errorMessage;
	}
};

export const getCharacterQuotes = async (id: string, isTest: boolean) => {
	try {
		const character = await getCharacterByID(id, isTest);
		const quotes = await getQuotesByCharacterIdIndex(id);

		const characterWithQuotes = {
			...character,
			quotes: [...quotes.data],
		};

		return characterWithQuotes;
	} catch (err) {
		// TODO test these - had to remove the apiResponse and just return the error in above function
		// maybe create shareable error function errorRes(err, id) id is optional
		return apiResponse(err);
	}
};

export const getCharacterAllData = async (id: string, isTest: boolean) => {
	try {
		const character = await getCharacterByID(id, isTest);
		const details = getCharacterDetailsById(id);
		const quotes = await getQuotesByCharacterIdIndex(id);

		return setCharacterAllDataObjForRes(character, details, quotes);
	} catch (err) {
		return apiResponse(err);
	}
};

export const createCharacterDetails = async (
	details: CharacterDetailsRes,
	isTest: boolean
) => {
	const collection = isTest ? CHARACTERS_TEST_DETAILS : CHARACTERS_DETAILS;
	const newDetails = await createNewDocument(details, collection);
	return newDetails;
};

export const updateCharacterDetails = async (
	characterId: string,
	body: any,
	isTest: boolean
) => {
	const collection = isTest ? CHARACTERS_TEST_DETAILS : CHARACTERS_DETAILS;
	const details = await getCharacterDetailsByRefIndex(characterId);
	const detailsId = details.data[0].ref.value.id;

	const updatedDetails = await updateDocumentData(detailsId, body, collection);
	return updatedDetails;
};
