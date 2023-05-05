export interface AllDocumentRefs {
  data: [
    {
      id: string;
      ref: RefObject;
      data?: object;
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

export interface CharacterDetailsRes extends CharactersBodyWithID {
  details: any;
}

export enum CharacterType {
  MAIN = "main",
  RECURRING = "recurring",
}
