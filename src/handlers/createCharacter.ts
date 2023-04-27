import { IRequest } from "itty-router";
import { createNewCharacter } from "../database/documents/characters/characters";
import { CharactersBody } from "../database/documents/characters/interfaces";
import { returnResponse } from "../utils/routes";

export const createCharacterHandler = async (request: IRequest) => {
  const character: CharactersBody = request.character;
  const data: any = await createNewCharacter(character);

  return returnResponse({
    message: "Character created",
    newCharacterID: data.ref.id,
  });
};
