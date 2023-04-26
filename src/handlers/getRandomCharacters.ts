import { getRandomCharacter } from "../database/documents/characters/characters";
import { returnResponse } from "../utils/routes";

export const getRandomCharactersHandler = async () => {
  const data = await getRandomCharacter();
  return returnResponse(data);
};
