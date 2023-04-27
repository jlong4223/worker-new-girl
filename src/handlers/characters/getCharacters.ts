import { apiResponse } from "../../utils/routes";
import {
  getCharacterByID,
  getCharacters,
} from "../../database/documents/characters/characters";
import { queryNotSupportedRes } from "../../utils/responses";
import { IRequest } from "itty-router";

interface RouteOptions {
  query: {
    size?: number;
    random?: boolean;
  };
}

export const getCharactersHandler = async ({ query }: RouteOptions) => {
  const isThereAQuery = Object.keys(query).length > 0;

  if (isThereAQuery) {
    const { size } = query;
    if (!!size) {
      const sizeNumber = Number(size);
      const documentData = await getCharacters({ size: sizeNumber });
      return apiResponse(documentData);
    }
    return queryNotSupportedRes(query);
  }

  const documentData = await getCharacters();
  return apiResponse(documentData);
};

export const getCharactersByIDHandler = async ({ params }: any) => {
  const { id } = params;
  const documentData = await getCharacterByID(id);
  return apiResponse(documentData);
};
