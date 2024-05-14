import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { setFaunaSecret } from "@gearsnbeans/faunadb-utils";

describe("General Routes", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    // TODO somethiing to try is to setFaunaKey here and remove the hard coded key in the index.ts file to the env var; gotta figure out how to do that
    // get it from the env
    const faunaSecret = process.env.FAUNA_SECRET as string;
    setFaunaSecret(faunaSecret);

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
      expect(text).toMatchObject({
        message: "Welcome to the New Girl API",
        name: "New girl",
        seasons: 7,
        episodes: 148,
        location: "Los Angeles",
        creator: "Elizabeth Meriwether",
        genre: "Comedy/Sitcom",
        rottenTomatoes: [
          {
            season: 1,
            tomatoMeter: "87%",
            audienceScore: "86%",
          },
          {
            season: 2,
            tomatoMeter: "89%",
            audienceScore: "89%",
          },
          {
            season: 3,
            tomatoMeter: "94%",
            audienceScore: "84%",
          },
          {
            season: 4,
            tomatoMeter: "100%",
            audienceScore: "88%",
          },
          {
            season: 5,
            tomatoMeter: "100%",
            audienceScore: "80%",
          },
          {
            season: 6,
            tomatoMeter: "",
            audienceScore: "88%",
          },
          {
            season: 7,
            tomatoMeter: "100%",
            audienceScore: "76%",
          },
        ],
        network: "Fox",
        firstAired: "September 20, 2011",
        lastAired: "May 14, 2018",
        whereToWatch: ["Hulu", "Peacock"],
        episodeRunTime: "21-24 minutes",
      });
    }
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
