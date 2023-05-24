## Running locally

Welcome to Cloudflare Workers!

- Run `npm run dev` in your terminal to start a development server
- Open a browser tab at http://localhost:8787/ to see your worker in action
- Run `npm run publish` to publish a new worker version

Learn more at https://developers.cloudflare.com/workers/

## Resources used

[Useful Guide to setting up a project with FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers)

- has helpful details/explanation on the update query

[FaunaDB CRUD Docs](https://docs.fauna.com/fauna/current/build/fql/crud?lang=javascript)

[FaunaDB Index Docs Used](https://docs.fauna.com/fauna/current/learn/tutorials/fql/indexes/pagination?lang=javascript)

- may want to ref this when trying to ref other documents https://stackoverflow.com/questions/70689174/how-to-join-two-collections-in-fauna-db

## Directory structure and use cases

- `src/index.ts` - The entry point
- `src/database/documents` - Direct Database access through function calls
- `src/database/queries` - Shareable Queries to be used with `faunadb.query` function
- `src/handlers` - Request handlers for different routes
  - These may import document functions along with other logic
  - Direct database calls or queries should not be used here
  - functions mentioned in above bullet go in the database documents dir or queries

## Testing against the DB locally

- need to include `test-header = "true"` in the request headers for all POST/PUT/DELETE/PACTH requests
- Test data is stored in the DB for 1 day before being automatically deleted
- GET requests do not need the header

## package.json Scripts

- deploy: this is for production deployment
