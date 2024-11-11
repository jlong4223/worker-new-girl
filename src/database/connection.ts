import faunadb from "faunadb";

export const faunaClient = new faunadb.Client({
  // @ts-ignore
  secret: "",
});
