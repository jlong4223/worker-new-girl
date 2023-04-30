export const setCharacterObj = (character: any) => {
  return {
    ...character.data,
    id: character.ref.id,
  };
};
