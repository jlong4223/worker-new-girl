import { Collection, Documents, Get, Paginate, Ref } from "faunadb";
import { faunaClient } from "../database/connection";
import { returnResponse } from "../utils/routes";

interface AllDocumentRefs {
  data: [
    {
      id: string;
      ref: RefObject;
    }
  ];
}

interface RefObject {
  "@ref": {
    id: string;
    collection: {
      "@ref": {
        id: string;
        collection: {
          "@ref": {
            id: string;
          };
        };
      };
    };
  };
}

export const faunaHandler = async () => {
  const allDocumentRefs: AllDocumentRefs = await faunaClient.query(
    Paginate(Documents(Collection("Characters")), { size: 1000 })
  );

  const documentData = await faunaClient.query(
    allDocumentRefs.data.map((ref: any) =>
      Get(Ref(Collection("Characters"), ref.id))
    )
  );

  return returnResponse(documentData);
};
