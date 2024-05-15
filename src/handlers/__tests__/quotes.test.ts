import { expect, beforeAll, afterAll, describe, it } from "vitest";
import { UnstableDevWorker, unstable_dev } from "wrangler";
import { nickMillerDBid } from "../../test-helpers/testData";
import { setFaunaSecret } from "@gearsnbeans/faunadb-utils";

describe("Quote Routes", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    const faunaSecret = process.env.FAUNA_SECRET as string;

    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
      vars: {
        FAUNA_SECRET: faunaSecret,
      },
      config: "wrangler.toml",
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

  const characterQuotesResponse = {
    quotes: expect.arrayContaining([expect.any(String)]),
  };

  it("should get all quotes", async () => {
    const resp = await worker.fetch("/quotes");
    const resJSON = await resp.json();

    expect(resJSON).toEqual(
      expect.arrayContaining([expect.objectContaining(quoteObjResponse)])
    );
  });

  it("should get Nick Millers quotes by the character id", async () => {
    const resp = await worker.fetch(`/quotes/${nickMillerDBid}`);
    const resJSON = await resp.json();

    expect(resJSON).toEqual(characterQuotesResponse);
  });
});
