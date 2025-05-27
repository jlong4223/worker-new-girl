import { allCharacters } from "./allCharacters";

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
