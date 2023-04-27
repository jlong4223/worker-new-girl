## Running locally

Welcome to Cloudflare Workers!

- Run `npm run dev` in your terminal to start a development server
- Open a browser tab at http://localhost:8787/ to see your worker in action
- Run `npm run publish` to publish a new worker version

Learn more at https://developers.cloudflare.com/workers/

## Resources used

[Useful Guide to setting up a project with FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers)

[FaunaDB CRUD Docs](https://docs.fauna.com/fauna/current/build/fql/crud?lang=javascript)

## Directory structure and use cases

- `src/index.ts` - The entry point
- `src/database/documents` - Direct Database access through function calls
- `src/database/queries` - Shareable Queries to be used with `faunadb.query` function
- `src/handlers` - Request handlers for different routes
  - These may import document functions along with other logic
  - Direct database calls or queries should not be used here
  - functions mentioned in above bullet go in the database documents dir or queries
