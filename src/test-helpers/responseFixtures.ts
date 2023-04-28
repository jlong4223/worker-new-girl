// POST /characters
export const characterCreatedResponse = {
  message: "Character created",
  newCharacterID: 1,
};

// GET /characters
export const charactersForGetResponse = [
  {
    name: "Nick Miller",
    age: 30,
    occupation: "Bartender",
    image: "www.google.com/image.png",
    type: "main",
  },
];
