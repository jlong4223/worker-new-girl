export interface QuoteResponseObj {
  quote: string;
  characterId: string;
  id: string;
}

export interface QuotesRefFromDB {
  data: [QuotesBody];
}

export interface QuotesBody {
  ref: {
    id: string;
    collection: {};
  };
  ts: number;
  data: {
    quote: string;
    characterId: string;
  };
}
