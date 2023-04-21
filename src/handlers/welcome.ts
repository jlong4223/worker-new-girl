import { returnResponse } from "../utils/routes";

export const welcomeHander = async () => {
  const body = {
    message: "Welcome to the API",
  };
  return returnResponse(body);
};
