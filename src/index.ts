import { handleErrorRequest, handleRequest } from "./routesHandler";

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env);
    } catch (e: any | unknown) {
      handleErrorRequest(request, e);
    }
  },
};
