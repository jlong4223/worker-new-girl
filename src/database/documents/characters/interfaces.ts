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

export interface RefObjectAndData extends RefObject {
  data: CharactersBody;
  ts: number;
}

export interface CharacterDocDataRef {
  data: [CharactersBodyWithID];
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

export interface CharactersBodyWithID extends CharactersBody {
  id: string;
}

export enum CharacterType {
  MAIN = "main",
  RECURRING = "recurring",
}
