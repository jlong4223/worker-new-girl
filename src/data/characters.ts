import { allCharacters } from "./allCharacters";
import { characterDetails } from "./characterDetails";

export const getAllCharacters = (size?: number) => {
  if (size) {
    return allCharacters.sort(() => 0.5 - Math.random()).slice(0, size);
  }

  return allCharacters;
};

export const getCharacterDataById = (id: string) => {
  const character = allCharacters.find((character) => {
    return character.id === id;
  });
  return character;
};

export const getCharacterDetailsById = (id: string) => {
  const detailsData = characterDetails.find((details) => {
    return details.characterRef === id;
  });
  return detailsData;
};
