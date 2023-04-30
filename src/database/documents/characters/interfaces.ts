export interface AllDocumentRefs {
  data: [
    {
      id: string;
      ref: RefObject;
    }
  ];
}

export interface RefObject {
  "@ref": {
    id: string;
    collection: {
      "@ref": {
        id: string;
        collection: {
          "@ref": {
            id: string;
          };
        };
      };
    };
  };
}

export interface CharacterDocDataRef {
  data: [
    {
      name: string;
      details: string;
    }
  ];
}

export interface CharacterParams {
  size?: number;
  random?: boolean;
  isTest?: boolean;
}

// TODO need to update this when ready to add real data
export interface CharactersBody {
  name: string;
  age: number;
  occupation: string;
  image: string;
  type: string;
}

export enum CharacterType {
  MAIN = "main",
  RECURRING = "recurring",
}
