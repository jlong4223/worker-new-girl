import {
  AllDocumentRefs,
  CharacterDocDataRef,
  CharacterParams,
  CharacterType,
} from "./interfaces";
import { Collections } from "../../collections";
import { CharactersBody } from "./interfaces";
import {
  createNewDocument,
  getAllDocumentsRefsAndData,
  getCharacterTypeIndex,
  getSingleRefDataByID,
  updateDocumentData,
} from "../../queries";
import { setCharacterObj } from "../../../utils/conversions";

const { CHARACTERS, CHARACTERS_TEST } = Collections;

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

export const getCharacterByID = async (id: string, isTest: boolean) => {
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
