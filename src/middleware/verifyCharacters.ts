import { CharactersBody } from "../database/documents/characters/interfaces";
import { apiResponse } from "../utils/routes";

// an interface that extends the Request type
// and adds a character property
interface RequestWithCharacter extends Request {
  character: CharactersBody;
}

export const verifyBody = async (request: RequestWithCharacter) => {
  const body: CharactersBody = await request.json();
  const { name, age, weight } = body;

  if (!(name && age && weight)) {
    return apiResponse(
      {
        message: "Missing property",
      },
      400
    );
  }

  request.character = body;
};
