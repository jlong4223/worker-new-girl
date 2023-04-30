import { getCharacterType } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

export const getRecurringCharactersHandler = async () => {
  const recurringCharacters = await getCharacterType("recurring");
  return apiResponse(recurringCharacters);
};
