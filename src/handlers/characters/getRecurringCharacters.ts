import { getCharacterType } from "../../database/documents/characters/characters";
import { CharacterType } from "../../database/documents/characters/interfaces";
import { apiResponse } from "../../utils/routes";

export const getRecurringCharactersHandler = async () => {
  const recurringCharacters = await getCharacterType(CharacterType.RECURRING);
  return apiResponse(recurringCharacters);
};
