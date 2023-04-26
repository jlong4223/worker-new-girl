import { Paginate, Documents, Collection, Get, Ref, Create } from "faunadb";
import { faunaClient } from "../../connection";
import {
  AllDocumentRefs,
  CharacterDocDataRef,
  CharacterParams,
} from "./interfaces";
import { T } from "vitest/dist/types-e3c9754d";
import { Collections } from "../../collections";

const { CHARACTERS } = Collections;

export async function getCharacters(
  { size }: CharacterParams = {
    size: 1000,
  }
) {
  const allDocumentRefs: AllDocumentRefs = await faunaClient.query(
    Paginate(Documents(Collection(CHARACTERS)), { size })
  );

  const documents: Array<T> = await faunaClient.query(
    allDocumentRefs.data.map((ref: any) =>
      Get(Ref(Collection(CHARACTERS), ref.id))
    )
  );

  const documentsData = documents.map(
    (document: any): CharacterDocDataRef => document.data
  );
  return documentsData;
}

export const getRandomCharacter = async () => {
  const characters = await getCharacters();
  const randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];
  return randomCharacter;
};

export const createNewCharacter = async (character: any) => {
  const newCharacterResult = await faunaClient.query(
    Create(Collection(CHARACTERS), {
      data: character,
    })
  );

  return newCharacterResult;
};
