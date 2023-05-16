import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { setStatusCode } from "../routes";
import {
  characterDetails,
  characterToConvertForRes,
  generalFakeDBid,
  newCharacterBody,
  nickMillerDBData,
} from "../../test-helpers/testData";
import {
  setCharacterAndDetailsObjForRes,
  setCharacterObj,
} from "../conversions";

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

  it("sets the character with details", async () => {
    expect(
      setCharacterAndDetailsObjForRes(nickMillerDBData, characterDetails)
    ).toStrictEqual({
      ...nickMillerDBData,
      details: {
        ...characterDetails.data[0].data,
        id: characterDetails.data[0].ref.value.id,
      },
    });
  });

  it("sets the character with no details", async () => {
    expect(
      setCharacterAndDetailsObjForRes(nickMillerDBData, null)
    ).toStrictEqual({
      ...nickMillerDBData,
      details: {},
    });
  });
});
