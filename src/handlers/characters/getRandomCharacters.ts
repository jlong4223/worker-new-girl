import { getRandomCharacter } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

export const getRandomCharactersHandler = async () => {
  const data = await getRandomCharacter();
  return apiResponse(data);
};
