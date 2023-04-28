import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { testFetcherGET, testFetcherPOST } from "../../test-helpers/fetcher";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return the home route welcome response", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.json();
      expect(text).toMatchObject({ message: "Welcome to the API" });
    }
  });

  it("should create new character", async () => {
    const resp = await testFetcherPOST(worker, "/characters", {
      name: "Nick Miller",
      age: 30,
      occupation: "Bartender",
      image: "www.google.com/image.png",
      type: "main",
    });

    const text = await resp.json();

    expect(text).toMatchObject({
      message: "Character created",
      newCharacterID: 1,
    });
  });

  it("should return all characters", async () => {
    const resp = await testFetcherGET(worker, "/characters");
    const text = await resp.json();

    expect(text).toMatchObject([
      {
        name: "Nick Miller",
        age: 30,
        occupation: "Bartender",
        image: "www.google.com/image.png",
        type: "main",
      },
    ]);
  });

  it("should return the 404 response", async () => {
    const resp = await worker.fetch("/not-a-route");
    if (resp) {
      const text = await resp.json();
      expect(text).toMatchObject({ routeNote: "No route found", status: 404 });
    }
  });
});
