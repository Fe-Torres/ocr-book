import { APIGatewayProxyResult } from "aws-lambda";
import { BaseApplicationError } from "../../../main/errors/baseApplicationError";
import { Logger } from "../../../main/logs/Loger";
import { formatJSONResponse } from "./api-gateway";
import { StatusCode, StatusMessage } from "./enum";

export const handleErrorResponse = (
  error: BaseApplicationError | Error
): APIGatewayProxyResult => {
  if (error instanceof BaseApplicationError) {
    return formatJSONResponse(
      { message: error.message },
      error.code || StatusCode.INTERNAL_SERVER_ERROR
    );
  }

  Logger.error(error.message);
  return formatJSONResponse(
    { message: StatusMessage.INTERNAL_SERVER_ERROR },
    StatusCode.INTERNAL_SERVER_ERROR
  );
};
