const setResponse = (body: any) => JSON.stringify(body);

export const setStatusCodeWithHeaders = (statusCode?: number) => ({
  status: statusCode || 200,
  headers: { "Content-Type": "application/json" },
});

export const apiResponse = (body: any, statusCode?: number): Response =>
  new Response(setResponse(body), setStatusCodeWithHeaders(statusCode));
// new Response(setResponse(body), setStatusCode(statusCode));
