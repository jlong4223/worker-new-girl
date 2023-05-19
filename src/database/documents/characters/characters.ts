import {
  AllDocumentRefs,
  CharacterDetailsRes,
  CharacterDocDataRef,
  CharacterParams,
  CharacterType,
  CharactersBodyWithID,
} from "./interfaces";
import { Collections } from "../../collections";
import { CharactersBody } from "./interfaces";
import {
  createNewDocument,
  getAllDocumentsRefsAndData,
  getSingleRefDataByID,
  updateDocumentData,
} from "../../queries";
import {
  setCharacterAndDetailsObjForRes,
  setCharacterObj,
} from "../../../utils/conversions";
import {
  getCharacterDetailsByRefIndex,
  getCharacterTypeIndex,
} from "../../indexes";
import { apiResponse } from "../../../utils/routes";
import { getQuotesByCharacterId } from "../quotes/quotes";

const {
  CHARACTERS,
  CHARACTERS_TEST,
  CHARACTERS_DETAILS,
  CHARACTERS_TEST_DETAILS,
} = Collections;

export async function getCharacters({ isTest, size }: CharacterParams = {}) {
  const collection = isTest ? CHARACTERS_TEST : CHARACTERS;
  const documentData: AllDocumentRefs = await getAllDocumentsRefsAndData(
    collection,
    size
  );

  const characterData = documentData.data.map(
    (character: any): CharacterDocDataRef => setCharacterObj(character)
  );

  return characterData;
}

export const getCharacterByID = async (
  id: string,
  isTest: boolean
): Promise<CharactersBodyWithID> => {
  const collection = isTest ? CHARACTERS_TEST : CHARACTERS;
  const document = await getSingleRefDataByID(collection, id);
  return setCharacterObj(document);
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
  const charactersDataWithRef: AllDocumentRefs = await getCharacterTypeIndex(
    type
  );

  const characterDataAndID = charactersDataWithRef.data.map(
    (characterData: any) => setCharacterObj(characterData)
  );

  return characterDataAndID;
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
    const details = await getCharacterDetailsByRefIndex(id);

    return setCharacterAndDetailsObjForRes(character, details);
  } catch (err) {
    return apiResponse(err);
  }
};

export const getCharacterQuotes = async (id: string, isTest: boolean) => {
  try {
    const character = await getCharacterByID(id, isTest);
    const quotes = await getQuotesByCharacterId(id);

    const characterWithQuotes = {
      ...character,
      quotes: [...quotes.data],
    };

    return characterWithQuotes;
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
