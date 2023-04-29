import { IRequest } from "itty-router";

export const checkForTestRequest = (request: IRequest) => {
  const { headers } = request;
  const testHeader = headers.get("test-header");

  if (testHeader === "true") {
    request.isTest = true;
  }
};
