import { AllDocumentRefs } from "./documents/characters/interfaces";
import { Indexes } from "./collections";
import { getDataByIndex } from "./queries";

export const getCharacterTypeIndex = async (
  type: string
): Promise<AllDocumentRefs> => {
  const charactersByType = await getDataByIndex(Indexes.CHARACTER_TYPE, type);
  return charactersByType;
};

export const getCharacterDetailsByRefIndex = async (
  characterRefID: string
): Promise<AllDocumentRefs> => {
  const characterDetails = await getDataByIndex(
    Indexes.CHARACTER_DETAILS,
    characterRefID
  );

  return characterDetails;
};
