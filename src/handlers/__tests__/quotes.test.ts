import { expect, beforeAll, afterAll, describe, it } from "vitest";
import { UnstableDevWorker, unstable_dev } from "wrangler";

describe("Quote Routes", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  const quoteObjResponse = {
    id: expect.any(String),
    quote: expect.any(String),
    characterId: expect.any(String),
  };

  it("should get all quotes", async () => {
    const resp = await worker.fetch("/quotes");
    const resJSON = await resp.json();

    expect(resJSON).toStrictEqual([quoteObjResponse]);
  });
});
