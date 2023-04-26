import { returnResponse } from "../utils/routes";

// an interface that extends the Request type
// and adds a character property
interface RequestWithCharacter extends Request {
  character: CharactersBody;
}

// TODO need to update this when ready to add real data
export interface CharactersBody {
  name: string;
  age: number;
  weight: number;
}

export const verifyBody = async (request: RequestWithCharacter) => {
  const body: CharactersBody = await request.json();
  const { name, age, weight } = body;

  if (!(name && age && weight)) {
    return returnResponse(
      {
        message: "Missing property",
      },
      400
    );
  }

  request.character = body;
};
