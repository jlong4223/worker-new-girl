import { createNewCharacter } from "../database/documents/characters/characters";
import { CharactersBody } from "../middleware/verifyCharacters";
import { returnResponse } from "../utils/routes";

interface CharacterResponse {
  ref: { id: string };
  ts: number;
  data: {};
}

export const createCharacterHandler = async (request: any) => {
  const character: CharactersBody = request.character;
  const data: any = await createNewCharacter(character);

  return returnResponse({
    message: "Character created",
    newCharacterID: data.ref.id,
  });
};
