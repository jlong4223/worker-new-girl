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

export const setCharacterAndDetailsObjForRes = (
  character: CharactersBodyWithID,
  details: any
): CharacterDetailsRes => {
  return {
    ...character,
    details: details?.data[0]?.data ?? {},
  };
};

export const setCharacterDetailsForNewDoc = ({
  id,
  body,
}: {
  id: string;
  body: any;
}) => {
  const newCharacterDetailsObj = {
    characterRef: id,
    ...body,
  };

  return { newCharacterDetailsObj };
};
