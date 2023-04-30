import { getCharacterType } from "../../database/documents/characters/characters";
import { CharacterType } from "../../database/documents/characters/interfaces";
import { apiResponse } from "../../utils/routes";

export const getMainCharactersHandler = async () => {
  const mainCharacters = await getCharacterType(CharacterType.MAIN);
  return apiResponse(mainCharacters);
};
