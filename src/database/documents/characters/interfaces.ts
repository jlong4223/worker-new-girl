import { RawDocument } from "@gearsnbeans/faunadb-utils";

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
  [x: string]: any;
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
  occupations: string[];
  image: string;
  type: string;
}

export interface CharactersBodyWithID extends CharactersBody {
  id: string;
}

export interface CharacterDetailsRes extends CharactersBodyWithID {
  details: any;
}

export interface CharacterAllData extends CharacterDetailsRes {
  quotes: any;
}

// TODO update this as i add more details
export interface CharacterDetailsBody {
  characterRef: string;
  likes: string[];
  actor: string;
}

export enum CharacterType {
  MAIN = "main",
  RECURRING = "recurring",
}

export interface CharacterDoc extends RawDocument {
  name: string;
  age: number;
  occupations: string[];
  image: string;
  type: string;
  id: string;
}
