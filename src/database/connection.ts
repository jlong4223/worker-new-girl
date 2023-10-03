import faunadb from "faunadb";

export const faunaClient = new faunadb.Client({
  // @ts-ignore
  secret: FAUNA_SECRET || process.env.FAUNA_SECRET,
});

export const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Sum,
  Delete,
  Add,
  Select,
  Let,
  Var,
  Update,
} = faunadb.query;
