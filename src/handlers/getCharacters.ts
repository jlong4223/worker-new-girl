import { returnResponse } from "../utils/routes";
import { getCharacters } from "../database/documents/characters/characters";
import { queryNotSupportedRes } from "../utils/responses";

interface RouteOptions {
  query: {
    size?: number;
    random?: boolean;
  };
}
// query to handle:
// ?size
// ?random

export const getCharactersHandler = async ({ query }: RouteOptions) => {
  const isThereAQuery = Object.keys(query).length > 0;

  if (isThereAQuery) {
    const { size } = query;
    if (!!size) {
      const sizeNumber = Number(size);
      const documentData = await getCharacters({ size: sizeNumber });
      return returnResponse(documentData);
    }
    return queryNotSupportedRes(query);
  }

  const documentData = await getCharacters();
  return returnResponse(documentData);
};
