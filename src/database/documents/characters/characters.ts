import {
  AllDocumentRefs,
  CharacterDocDataRef,
  CharacterParams,
} from "./interfaces";
import { T } from "vitest/dist/types-e3c9754d";
import { Collections } from "../../collections";
import { CharactersBody } from "./interfaces";
import {
  createNewDocument,
  getAllRefsWithIDs,
  getMultipleRefsDataByID,
  getSingleRefDataByID,
} from "../../queries";

const { CHARACTERS } = Collections;

export async function getCharacters({ size = 1000 }: CharacterParams = {}) {
  const collection = CHARACTERS;

  const allDocumentRefs: AllDocumentRefs = await getAllRefsWithIDs({
    collection,
    size,
  });

  const documents: Array<T> = await getMultipleRefsDataByID({
    collection,
    allDocumentRefs,
  });

  const documentsData = documents.map(
    (document: any): CharacterDocDataRef => document.data
  );
  return documentsData;
}

export const getCharacterByID = async (id: string) => {
  const collection = CHARACTERS;
  const document = await getSingleRefDataByID(collection, id);
  return document.data;
};

export const createNewCharacter = async (character: CharactersBody) => {
  const newCharacterResult = await createNewDocument(character, CHARACTERS);
  return newCharacterResult;
};
