import { UnstableDevWorker } from "wrangler";

export const testFetcherPOST = async (
  worker: UnstableDevWorker,
  path: string,
  body: any
) =>
  await worker.fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "test-header": "true",
    },
    body: JSON.stringify(body),
  });

export const testFetcherGET = async (worker: UnstableDevWorker, path: string) =>
  await worker.fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "test-header": "true",
    },
  });
