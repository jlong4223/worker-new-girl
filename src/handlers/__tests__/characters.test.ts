import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import {
  failingCharacterBody,
  newCharacterBody,
  nickMillerDBData,
  nickMillerDBid,
  testHeader,
  testManDBID,
} from "../../test-helpers/testData";
import { CharacterType } from "../../database/documents/characters/interfaces";

describe("Character Routes", () => {
  let worker: UnstableDevWorker;

  const characterObjResponse = {
    id: expect.any(String),
    name: expect.any(String),
    type: expect.any(String),
    image: expect.any(String),
    occupation: expect.any(String),
    age: expect.any(Number),
  };

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
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
    expect(resJSON).toStrictEqual(nickMillerDBData);
  });

  it("should return all characters", async () => {
    const resp = await worker.fetch("/characters");
    const resJSON = await resp.json();

    expect(resJSON).toEqual(
      expect.arrayContaining([expect.objectContaining(characterObjResponse)])
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

  it("should get main characters", async () => {
    const resp = await worker.fetch("/characters/main");
    const resJSON = await resp.json();

    expect(resJSON).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...characterObjResponse,
          type: CharacterType.MAIN,
        }),
      ])
    );
  });

  it("should get recurring characters", async () => {
    const resp = await worker.fetch("/characters/recurring");
    const resJSON = await resp.json();

    expect(resJSON).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...characterObjResponse,
          type: CharacterType.RECURRING,
        }),
      ])
    );
  });

  it("should patch/update character data by id", async () => {
    const resp = await worker.fetch(`/characters/${testManDBID}`, {
      method: "PATCH",
      headers: testHeader,
      body: JSON.stringify({ name: "TESTED PATCH" }),
    });

    const resJSON: any = await resp.json();

    expect(resJSON.data).toStrictEqual({
      ...newCharacterBody,
      name: "TESTED PATCH",
    });
  });
});
