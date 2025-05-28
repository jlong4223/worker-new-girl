import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Unstable_DevWorker } from "wrangler";
import { unstable_dev } from "wrangler";
import { CharacterType } from "../../database/documents/characters/interfaces";
import { v10ApiErrors } from "../../database/documents/errors";
import {
	failingCharacterBody,
	newCharacterBody,
	nickMillerDBData,
	nickMillerDBid,
	testHeader,
	testManDBID,
} from "../../test-helpers/testData";

describe("Character Routes", () => {
	let worker: Unstable_DevWorker;

	const characterObjResponse = {
		id: expect.any(String),
		name: expect.any(String),
		type: expect.any(String),
		image: expect.any(String),
		occupations: expect.any(Array),
		age: expect.any(Number),
	};

	const characterFailingObjResponse = {
		idProvided: expect.any(String),
		customMessage: expect.any(String),
		message: expect.any(String),
	};

	const detailsObj = {
		likes: expect.any(String),
		actor: expect.any(String),
		// expect array of strings
		nicknames: Array(expect.any(String)),
	};

	const characterDetailsObjResponse = {
		...characterObjResponse,
		details: expect.any(Object), // TODO plug the details obj in here when done
	};

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

	it.skip("should create new character", async () => {
		const resp = await worker.fetch("/characters", {
			method: "POST",
			headers: testHeader,
			body: JSON.stringify(newCharacterBody),
		});

		const resJSON = await resp.json();
		expect(resJSON).toStrictEqual({
			message: "Character created",
			newCharacterID: expect.any(String),
			characterName: newCharacterBody.name,
		});
	});

	it("should return the character by id", async () => {
		const resp = await worker.fetch(`/characters/${nickMillerDBid}`);

		const resJSON = await resp.json();
		expect(resJSON).toStrictEqual(nickMillerDBData);
	});

	// TODO unskip these tests when data is moved to the new database
	it.skip("should return an error message if the character id is not found", async () => {
		const resp = await worker.fetch(`/characters/1234567890`);

		const resJSON = await resp.json();
		expect(resJSON).toStrictEqual({
			customMessage:
				"There was an error getting the character with the id of 1234567890",
		});
	});

	it("should return all characters", async () => {
		const resp = await worker.fetch("/characters");
		const resJSON = await resp.json();

		expect(resJSON).toEqual(
			expect.arrayContaining([expect.objectContaining(characterObjResponse)])
		);
	});

	it.skip("should fail validation when creating a new character with a missing field", async () => {
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

	it.skip("should patch/update character data by id", async () => {
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

	it.skip("should not allow a new field in the patch request", async () => {
		const resp = await worker.fetch(`/characters/${testManDBID}`, {
			method: "PATCH",
			headers: testHeader,
			body: JSON.stringify({ newField: "TESTED FIELD" }),
		});

		const resJSON: any = await resp.json();

		expect(resJSON).toStrictEqual({
			error: '"newField" is not allowed',
			routeNote: "Validation error",
			status: 400,
		});
	});

	it("get extra details on a character by id", async () => {
		const resp = await worker.fetch(`/characters/${nickMillerDBid}/details`);
		const resJSON = await resp.json();

		expect(resJSON).toStrictEqual(characterDetailsObjResponse);
	});

	it("gets no details on a character when empty", async () => {
		const resp = await worker.fetch(`/characters/${testManDBID}/details`, {
			method: "GET",
		});

		const resJSON = await resp.json();
		expect(resJSON).toStrictEqual(characterFailingObjResponse);
	});

	it('should send an error message when the "id" is not found for extra details', async () => {
		const resp = await worker.fetch(`/characters/1234567890/details`);
		const resJSON = await resp.json();

		expect(resJSON).toStrictEqual({
			customMessage: "Details not found. Check that the `id` is correct",
			idProvided: "1234567890",
			message: v10ApiErrors.NOT_FOUND_MESSAGE,
		});
	});

	it('gets 3 characters using the "size" query param', async () => {
		const resp = await worker.fetch("/characters?size=3");
		const resJSON = await resp.json();

		expect(resJSON).toHaveLength(3);
	});

	it("should not allow a query that is not supported receive data", async () => {
		const badQuery = "fakeQuery=3";
		const resp = await worker.fetch(`/characters?${badQuery}`);
		const resJSON = await resp.json();

		expect(resJSON).toStrictEqual({
			queryProvided: {
				fakeQuery: "3",
			},
			routeNote: "Query not supported",
			status: 400,
		});
	});
});
