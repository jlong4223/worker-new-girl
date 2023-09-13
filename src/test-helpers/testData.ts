export const testHeader = { "test-header": "true" };

export const newCharacterBody = {
  name: "Testy Test Man",
  age: 99,
  occupations: ["Test"],
  image: "https://test.com",
  type: "main",
};

export const failingCharacterBody = {
  name: "Testy Test Man",
  age: 99,
  occupations: ["Test"],
  image: "https://test.com",
  type: "",
};

export const nickMillerDBid = "363193257409118285";
export const testManDBID = "363377348784947273";
export const generalFakeDBid = "123456789";

export const nickMillerDBData = {
  name: "Nick Miller",
  age: 31,
  occupations: ["Bartender", "Author", "Manager"],
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
  data: [
    {
      data: { funky: "bunch", of: "details" },
      ref: { value: { id: "123456789" } },
    },
  ],
};

export const failingCharacterIdMessage = {
  customMessage:
    "There was an error getting the character with the id of 1234567890",
  error: {
    description: "Document not found.",
    message: "instance not found",
    name: "NotFound",
    requestResult: {
      endTime: 1694626786769,
      method: "POST",
      path: "",
      query: null,
      requestContent: {
        get: {
          id: "1234567890",
          ref: {
            collection: "Characters",
          },
        },
      },
      requestRaw:
        '{"get":{"ref":{"collection":"Characters"},"id":"1234567890"}}',
      responseContent: {
        errors: [
          {
            code: "instance not found",
            description: "Document not found.",
            position: [],
          },
        ],
      },
      responseHeaders: {
        "content-length": "92",
        "content-type": "application/json;charset=utf-8",
        date: "Wed, 13 Sep 2023 17:39:46 GMT",
        traceparent: "00-0000000000000000397db3eca7709e99-57d41e6b545d00f6-00",
        "x-byte-read-ops": "0",
        "x-byte-write-ops": "0",
        "x-compute-ops": "1",
        "x-faunadb-build": "230908.200318-c0fece8",
        "x-query-bytes-in": "61",
        "x-query-bytes-out": "92",
        "x-query-time": "1",
        "x-read-ops": "0",
        "x-storage-bytes-read": "0",
        "x-storage-bytes-write": "0",
        "x-txn-retries": "0",
        "x-txn-time": "1694626786733861",
        "x-write-ops": "0",
      },
      responseRaw:
        '{"errors":[{"position":[],"code":"instance not found","description":"Document not found."}]}',
      startTime: 1694626786576,
      statusCode: 404,
    },
  },
};
