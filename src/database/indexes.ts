import { Paginate, Match, Index, Lambda, Get, Var, Map } from "faunadb";
import { faunaClient } from "./connection";
import { AllDocumentRefs } from "./documents/characters/interfaces";
import { Indexes } from "./collections";

export const getCharacterTypeIndex = async (
  type: string
): Promise<AllDocumentRefs> => {
  const mainCharacters: AllDocumentRefs = await faunaClient.query(
    Map(
      Paginate(Match(Index(Indexes.CHARACTER_TYPE), type)),
      Lambda("X", Get(Var("X")))
    )
  );

  return mainCharacters;
};

// TODO - Refactor this to use the same query as getCharacterTypeIndex and move that to queries.ts
export const getCharacterDetailsByRefIndex = async (
  characterRefID: string
): Promise<any> => {
  const characterDetails: any = await faunaClient.query(
    Map(
      Paginate(Match(Index(Indexes.CHARACTER_DETAILS), characterRefID)),
      Lambda("X", Get(Var("X")))
    )
  );

  return characterDetails;
};
