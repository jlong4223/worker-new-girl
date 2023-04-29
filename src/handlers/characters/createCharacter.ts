import { IRequest } from "itty-router";
import { createNewCharacter } from "../../database/documents/characters/characters";
import { CharactersBody } from "../../database/documents/characters/interfaces";
import { apiResponse } from "../../utils/routes";

export const createCharacterHandler = async (request: IRequest) => {
  const character: CharactersBody = request.verifiedBody;

  const data: any = await createNewCharacter(character, request.isTest);

  return apiResponse({
    message: "Character created",
    newCharacterID: data.ref.id,
  });
};
