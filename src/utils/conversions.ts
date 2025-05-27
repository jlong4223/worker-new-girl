import {
  CharacterAllData,
  CharacterDetailsRes,
  CharacterDoc,
  CharactersBodyWithID,
} from "../database/documents/characters/interfaces";

export const setCharacterObj = (character: any) => {
  return {
    ...character.data,
    id: character.ref.id,
  };
};

export const setCharacterObjV10 = (
  character: CharacterDoc
): CharactersBodyWithID => {
  const { name, age, occupations, image, type, id } = character;
  return {
    name,
    age,
    occupations,
    image,
    type,
    id,
  };
};

export const setCharacterAndDetailsObjForRes = (
  character: CharactersBodyWithID,
  details: any
): CharacterDetailsRes => {
  return {
    ...character,
    details: details ?? {},
  };
};

export const setCharacterAllDataObjForRes = (
  character: CharactersBodyWithID,
  details: any,
  quotes: any
): CharacterAllData => {
  const detailsData = details?.data[0]?.data ?? {};
  const detailsId = details?.data[0]?.ref.value.id;

  return {
    ...character,
    details: {
      ...detailsData,
      ...(detailsId && { id: detailsId }),
    },
    quotes: [...quotes.data],
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

export const setQuoteObj = (quote: any) => {
  return {
    ...quote.data,
    id: quote.ref.id,
  };
};
