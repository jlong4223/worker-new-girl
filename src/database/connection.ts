import faunadb from "faunadb";

export const faunaClient = new faunadb.Client({
  // @ts-ignore
  secret: FAUNA_SECRET ?? "fnAFCCznjeAATXszZR6chXVs0v4-8o5c3yn8mKcb",
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
