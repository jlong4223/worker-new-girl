import { apiResponse } from "../../utils/routes";
import { getCharacterByID } from "../../database/documents/characters/characters";

export const getCharactersByIDHandler = async ({ params }: any) => {
  const { id } = params;
  const isTest = false;
  try {
    const documentData = await getCharacterByID(id, isTest);
    return apiResponse(documentData);
  } catch (error) {
    const errorMessage = {
      customMessage: `There was an error getting the character with the id of ${id}`,
      error,
    };
    return apiResponse(errorMessage, 200);
  }
};
