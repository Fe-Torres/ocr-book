export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
