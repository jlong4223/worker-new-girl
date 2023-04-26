import { Paginate, Documents, Collection, Get, Ref } from "faunadb";
import { faunaClient } from "../../connection";
import {
  AllDocumentRefs,
  CharacterDocDataRef,
  CharacterParams,
} from "./interfaces";
import { T } from "vitest/dist/types-e3c9754d";

export async function getCharacters(
  { size }: CharacterParams = {
    size: 1000,
  }
) {
  const allDocumentRefs: AllDocumentRefs = await faunaClient.query(
    Paginate(Documents(Collection("Characters")), { size })
  );

  const documents: Array<T> = await faunaClient.query(
    allDocumentRefs.data.map((ref: any) =>
      Get(Ref(Collection("Characters"), ref.id))
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
