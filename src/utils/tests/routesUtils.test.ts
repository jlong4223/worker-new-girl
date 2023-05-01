import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { setStatusCode } from "../routes";
import {
  characterToConvertForRes,
  generalFakeDBid,
  newCharacterBody,
} from "../../test-helpers/testData";
import { setCharacterObj } from "../conversions";

describe("Route utils", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should set the default status code to 200", () => {
    expect(setStatusCode()).toMatchObject({ status: 200 });
  });

  it("should set the status code to 404", () => {
    expect(setStatusCode(404)).toMatchObject({ status: 404 });
  });

  it("should set the proper character object for the response", () => {
    const characterObjResponse = setCharacterObj(characterToConvertForRes);
    expect(characterObjResponse).toStrictEqual({
      ...newCharacterBody,
      id: generalFakeDBid,
    });
  });
});
