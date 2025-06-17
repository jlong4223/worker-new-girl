import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Unstable_DevWorker, unstable_dev } from "wrangler";
import { nickMillerDBid } from "../../test-helpers/testData";

describe.skip("Quote Routes", () => {
	let worker: Unstable_DevWorker;

	beforeAll(async () => {
		const faunaSecret = process.env.FAUNA_SECRET as string;
		const faunaSecretV10 = process.env.V10_FAUNA_SECRET as string;

		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
			vars: {
				FAUNA_SECRET: faunaSecret,
				V10_FAUNA_SECRET: faunaSecretV10,
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
