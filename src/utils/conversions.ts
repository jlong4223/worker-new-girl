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
  const detailsData = details?.data[0]?.data ?? {};
  const detailsId = details?.data[0]?.ref.value.id;

  return {
    ...character,
    details: {
      ...detailsData,
      ...(detailsId && { id: detailsId }),
    },
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
