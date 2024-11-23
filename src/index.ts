import { handleErrorRequest, handleRequest } from "./routesHandler";

export interface Env {
  FAUNA_SECRET: string;
  V10_FAUNA_SECRET: string;
}

addEventListener("fetch", (event: FetchEvent) => {
  try {
    event.respondWith(handleRequest(event.request));
  } catch (e: any | unknown) {
    event.respondWith(handleErrorRequest(event.request, e));
  }
});
