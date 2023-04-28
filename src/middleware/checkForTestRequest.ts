import { IRequest } from "itty-router";
import { apiResponse } from "../utils/routes";
import {
  charactersForGetResponse,
  characterCreatedResponse,
} from "../test-helpers/responseFixtures";

export const checkForTestRequest = (request: IRequest) => {
  const { headers, url, method } = request;
  const testHeader = headers.get("test-header");

  if (testHeader === "true") {
    const pathName = new URL(url).pathname;
    return handlePathName(pathName, method);
  }
};

const handlePathName = (pathName: string, method: string) => {
  switch (pathName) {
    case "/characters":
      if (method === "GET") return apiResponse(charactersForGetResponse);

      if (method === "POST") return apiResponse(characterCreatedResponse);

    default:
      return apiResponse({
        message: "This route doesnt exist in tests",
        note: "make she the response youre making matches the real route response. If possible, share the response between the two",
      });
  }
};
