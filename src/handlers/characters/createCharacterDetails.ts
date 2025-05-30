import { IRequest } from "itty-router";
import { createCharacterDetails } from "../../database/documents/characters/characters";
import { getCharacterDetailsByRefIndex } from "../../database/fauna_deprecated/indexes";
import { setCharacterDetailsForNewDoc } from "../../utils/conversions";
import { characterDetailsExistRes } from "../../utils/responses";
import { apiResponse } from "../../utils/routes";

export const createCharacterDetailsHandler = async (request: IRequest) => {
	const body = await request.json();
	const { id } = request.params;
	const { isTest } = request;

	const anyCurrentDetails = await getCharacterDetailsByRefIndex(id);

	if (anyCurrentDetails.data.length > 0) {
		return characterDetailsExistRes(anyCurrentDetails.data[0].data);
	}

	const { newCharacterDetailsObj } = setCharacterDetailsForNewDoc({ id, body });

	const characterWithDetails = await createCharacterDetails(
		newCharacterDetailsObj,
		isTest
	);

	return apiResponse({
		message: "Create character details",
		setCharacterDetails: true,
		characterWithDetails,
	});
};
