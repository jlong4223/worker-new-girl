import { getCharacterType } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

export const getMainCharactersHandler = async () => {
  const mainCharacters = await getCharacterType("main");
  return apiResponse(mainCharacters);
};
