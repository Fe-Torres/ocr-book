export const formatJSONResponse = (
  response: Record<string, unknown>,
  statusCode: number
) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
