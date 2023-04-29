import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import {
  failingCharacterBody,
  newCharacterBody,
  nickMillerDBData,
  nickMillerDBid,
  testHeader,
} from "../../test-helpers/testData";

describe("Routes", () => {
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
    const resp = await worker.fetch("/characters", {
      method: "POST",
      headers: testHeader,
      body: JSON.stringify(newCharacterBody),
    });

    const resJSON = await resp.json();

    expect(resJSON).toMatchObject({
      message: "Character created",
      newCharacterID: expect.any(String),
    });
  });

  it("should return the character by id", async () => {
    const resp = await worker.fetch(`/characters/${nickMillerDBid}`);

    const resJSON = await resp.json();
    expect(resJSON).toMatchObject(nickMillerDBData);
  });

  it("should return all characters", async () => {
    const resp = await worker.fetch("/characters");
    const resJSON = await resp.json();

    expect(resJSON).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          age: expect.any(Number),
          occupation: expect.any(String),
          image: expect.any(String),
          type: expect.any(String),
        }),
      ])
    );
  });

  it("should fail validation when creating a new character with a missing field", async () => {
    const resp = await worker.fetch("/characters", {
      method: "POST",
      headers: testHeader,
      body: JSON.stringify(failingCharacterBody),
    });

    const resJSON = await resp.json();

    expect(resJSON).toMatchObject({
      error: '"type" is not allowed to be empty',
      routeNote: "Validation error",
      status: 400,
    });
  });

  it("should return the 404 response", async () => {
    const resp = await worker.fetch("/not-a-route");
    if (resp) {
      const resJSON = await resp.json();
      expect(resJSON).toMatchObject({
        routeNote: "No route found",
        status: 404,
      });
    }
  });
});
