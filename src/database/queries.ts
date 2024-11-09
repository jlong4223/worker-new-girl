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
  Select,
  Update,
  Let,
} from "faunadb";
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

/* DEPRECATED: Use getAllDocumentsRefsAndData instead */
const getAllRefsWithIDs = async ({
  collection,
  size,
}: GetAllRefsIDs): Promise<AllDocumentRefs> => {
  return await faunaClient.query(
    Paginate(Documents(Collection(collection)), { size })
  );
};

/* 
DEPRECATED: Use getAllDocumentsRefsAndData instead
Just leaving here as a reference as an alternative for how to get multiple refs data
Before you'd have to get all the refs (getAllRefsWithIDs), then map over them to get the data
Now just use getAllDocumentsRefsAndData and get the data directly with the `Map` query
*/
const getMultipleRefsDataByID = async ({
  collection,
  allDocumentRefs,
}: GetAllRefIDData): Promise<Array<T>> => {
  return await faunaClient.query(
    allDocumentRefs.data.map((ref: any) =>
      Get(Ref(Collection(collection), ref.id))
    )
  );
};

// NOTE
// is called getRawDataById in new package
// DEPRECATED
const getSingleRefDataByID = async (
  collection: string,
  id: string
): Promise<AllDocumentRefs> => {
  return await faunaClient.query(Get(Ref(Collection(collection), id)));
};

// NOTE: Paginate returns a default number of 64 documents
/* 
faunadb utils name getCollectionDocDataAndIds
will need to be modified if using that 

BUT 

can use getRawCollectionDocData 1for1
DEPRECATED
*/
const getAllDocumentsRefsAndData = async (
  collection: string,
  size?: number
): Promise<AllDocumentRefs> => {
  const defaultSize = 1000;
  const querySize = size ? size : defaultSize;
  return await faunaClient.query(
    Map(
      Paginate(Documents(Collection(collection)), { size: querySize }),
      Lambda("X", Get(Var("X")))
    )
  );
};

// NOTE one for one
// DEPRECATED
const createNewDocument = async (data: any, collection: string) => {
  return await faunaClient.query(
    Create(Collection(collection), {
      data,
    })
  );
};

// NOTE unused in favor of updateDocumentData in faunadb-utils
// DEPRECATED
const updateDocumentData = async (
  id: string,
  newData: any,
  collection: string
) => {
  return await faunaClient.query(
    Let(
      {
        documentRef: Ref(Collection(collection), id),
        document: Get(Var("documentRef")),
        currentData: Select(["data"], Var("document")),
      },
      Update(Var("documentRef"), { data: { ...newData } })
    )
  );
};

// NOTE unused in favor of getRawDataByIndex in faunadb-utils
// DEPRECATED
const getDataByIndex = async (
  index: string,
  indexTerm: string
): Promise<AllDocumentRefs> => {
  return await faunaClient.query(
    Map(Paginate(Match(Index(index), indexTerm)), Lambda("X", Get(Var("X"))))
  );
};

// NOTE not in the new package; will need to refresh my memory on this
// add it to new package
//. value is just the field name that gets returned by the index search
// DEPRECATED
const getDataByIndexWithValueSet = async (
  index: string,
  indexTerm: string
): Promise<any> => {
  return await faunaClient.query(Paginate(Match(Index(index), indexTerm)));
};

/* used this resource for setting up the index query
https://docs.fauna.com/fauna/current/build/fql/indexes/?lang=javascript#collection_indexes
*/

// TODO start swapping these out for my new @gearsnbeans/faunadb-utils package
// see which ones are one for one swaps and which ones need to be modified
// names may be different
