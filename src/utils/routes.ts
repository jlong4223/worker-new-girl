const setResponse = (body: any) => JSON.stringify(body);

export const setStatusCode = (statusCode?: number) => ({
  status: statusCode || 200,
});

export const apiResponse = (body: any, statusCode?: number): Response =>
  new Response(setResponse(body), setStatusCode(statusCode));
