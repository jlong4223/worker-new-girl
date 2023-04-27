import { Paginate, Documents, Collection, Ref, Get, Create } from "faunadb";
import { faunaClient } from "./connection";
import { AllDocumentRefs } from "./documents/characters/interfaces";
import { T } from "vitest/dist/types-e3c9754d";

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

export const createNewDocument = async (data: any, collection: string) => {
  return await faunaClient.query(
    Create(Collection(collection), {
      data,
    })
  );
};
