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
}
