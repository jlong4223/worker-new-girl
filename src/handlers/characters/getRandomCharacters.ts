import { getCharacters } from "../../database/documents/characters/characters";
import { apiResponse } from "../../utils/routes";

export const getRandomCharactersHandler = async () => {
  const characters = await getCharacters();
  const randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];
  return apiResponse(randomCharacter);
};
