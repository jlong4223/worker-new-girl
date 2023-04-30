import {
  AllDocumentRefs,
  CharacterDocDataRef,
  CharacterParams,
  CharacterType,
} from "./interfaces";
import { T } from "vitest/dist/types-e3c9754d";
import { Collections } from "../../collections";
import { CharactersBody } from "./interfaces";
import {
  createNewDocument,
  getAllRefsWithIDs,
  getCharacterTypeIndex,
  getMultipleRefsDataByID,
  getSingleRefDataByID,
} from "../../queries";

const { CHARACTERS, CHARACTERS_TEST } = Collections;

export async function getCharacters({
  size = 1000,
  isTest,
}: CharacterParams = {}) {
  const collection = isTest ? CHARACTERS_TEST : CHARACTERS;

  const allDocumentRefs: AllDocumentRefs = await getAllRefsWithIDs({
    collection,
    size,
  });

  const documents: Array<T> = await getMultipleRefsDataByID({
    collection,
    allDocumentRefs,
  });

  const documentsData = documents.map((document: any): CharacterDocDataRef => {
    return {
      ...document.data,
      id: document.ref.id,
    };
  });
  return documentsData;
}

export const getCharacterByID = async (id: string, isTest: boolean) => {
  const collection = isTest ? CHARACTERS_TEST : CHARACTERS;
  const document = await getSingleRefDataByID(collection, id);
  return document.data;
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
    (character: any) => {
      return {
        ...character.data,
        id: character.ref.id,
      };
    }
  );

  return characterDataAndID;
};
