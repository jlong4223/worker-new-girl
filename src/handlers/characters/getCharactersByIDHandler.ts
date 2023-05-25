import { apiResponse } from "../../utils/routes";
import { getCharacterByID } from "../../database/documents/characters/characters";

export const getCharactersByIDHandler = async ({ params }: any) => {
  const { id } = params;
  const isTest = false;
  const documentData = await getCharacterByID(id, isTest);

  return apiResponse(documentData);
};
