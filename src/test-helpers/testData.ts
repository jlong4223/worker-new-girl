export const testHeader = { "test-header": "true" };

export const newCharacterBody = {
  name: "Testy Test Man",
  age: 99,
  occupation: "Test",
  image: "https://test.com",
  type: "main",
};

export const failingCharacterBody = {
  name: "Testy Test Man",
  age: 99,
  occupation: "Test",
  image: "https://test.com",
  type: "",
};

export const nickMillerDBid = "363193257409118285";
export const testManDBID = "363377348784947273";
export const generalFakeDBid = "123456789";

export const nickMillerDBData = {
  name: "Nick Miller",
  age: 31,
  occupation: "Bartender",
  image:
    "https://imgix.bustle.com/rehost/2016/9/13/b0008628-ab7e-4e5b-9276-8e9418fd879c.png?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
  type: "main",
  id: nickMillerDBid,
};

export const characterToConvertForRes = {
  data: { ...newCharacterBody },
  ref: { id: generalFakeDBid },
};

export const characterDetails = {
  data: [{ data: { funky: "bunch", of: "details" } }],
};
