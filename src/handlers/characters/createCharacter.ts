import { IRequest } from "itty-router";
import { createNewCharacter } from "../../database/documents/characters/characters";
import { CharactersBody } from "../../database/documents/characters/interfaces";
import { apiResponse } from "../../utils/routes";

export const createCharacterHandler = async (request: IRequest) => {
  const character: CharactersBody = request.character;
  // TODO try making a schema style thing like mongoose to set this up?  do i need it? maybe not
  const data: any = await createNewCharacter(character);

  return apiResponse({
    message: "Character created",
    newCharacterID: data.ref.id,
  });
};
