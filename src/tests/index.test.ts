import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

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
      expect(text).toMatchObject({ routeNote: "Welcome to the API" });
    }
  });

  it("should return the 404 response", async () => {
    const resp = await worker.fetch("/not-a-route");
    if (resp) {
      const text = await resp.json();
      expect(text).toMatchObject({ routeNote: "No route found", status: 404 });
    }
  });
});
