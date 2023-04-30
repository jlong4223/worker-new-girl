import {
  Paginate,
  Documents,
  Collection,
  Ref,
  Get,
  Create,
  Match,
  Index,
  Lambda,
  Var,
  Map,
} from "faunadb";
import { faunaClient } from "./connection";
import { AllDocumentRefs } from "./documents/characters/interfaces";
import { T } from "vitest/dist/types-e3c9754d";
import { Indexes } from "./collections";

interface GetAllRefsIDs {
  collection: string;
  size?: number;
}

interface GetAllRefIDData {
  collection: string;
  allDocumentRefs: AllDocumentRefs;
}

export const getAllRefsWithIDs = async ({
  collection,
  size,
}: GetAllRefsIDs): Promise<AllDocumentRefs> => {
  return await faunaClient.query(
    Paginate(Documents(Collection(collection)), { size })
  );
};

export const getSingleRefDataByID = async (
  collection: string,
  id: string
): Promise<AllDocumentRefs> => {
  return await faunaClient.query(Get(Ref(Collection(collection), id)));
};

/* 
DEPRECATED: Use getAllDocumentsRefsAndData instead
Just leaving hear as a reference as an alternative for how to get multiple refs data
*/
export const getMultipleRefsDataByID = async ({
  collection,
  allDocumentRefs,
}: GetAllRefIDData): Promise<Array<T>> => {
  return await faunaClient.query(
    allDocumentRefs.data.map((ref: any) =>
      Get(Ref(Collection(collection), ref.id))
    )
  );
};

// NOTE: Paginate returns a default number of 64 documents
export const getAllDocumentsRefsAndData = async (
  collection: string
): Promise<AllDocumentRefs> => {
  return await faunaClient.query(
    Map(Paginate(Documents(Collection(collection))), Lambda("X", Get(Var("X"))))
  );
};

export const createNewDocument = async (data: any, collection: string) => {
  return await faunaClient.query(
    Create(Collection(collection), {
      data,
    })
  );
};

export const getCharacterTypeIndex = async (
  type: string
): Promise<AllDocumentRefs> => {
  const mainCharacters: AllDocumentRefs = await faunaClient.query(
    Map(
      Paginate(Match(Index(Indexes.CHARACTER_TYPE), type)),
      Lambda("X", Get(Var("X")))
    )
  );

  return mainCharacters;
};
