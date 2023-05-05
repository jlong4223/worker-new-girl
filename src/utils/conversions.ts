import {
  CharacterDetailsRes,
  CharactersBodyWithID,
} from "../database/documents/characters/interfaces";

export const setCharacterObj = (character: any) => {
  return {
    ...character.data,
    id: character.ref.id,
  };
};

export const setCharacterAndDetailsObj = (
  character: CharactersBodyWithID,
  details: any
): CharacterDetailsRes => {
  return {
    ...character,
    details: details?.data[0]?.data ?? {},
  };
};
