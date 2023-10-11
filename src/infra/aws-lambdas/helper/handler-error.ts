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

  // Retornar erros genericos ou a mensagem de erro propriamente dita??
  // Penso em retornar a mensagem de erro pois as vezes pode ser o erro no código que foi enviado
  // Será interessante o usuário ter acesso a esse erro para entender onde está o problema na sintaxe
  Logger.error(error.message);
  return formatJSONResponse(
    { message: StatusMessage.INTERNAL_SERVER_ERROR },
    StatusCode.INTERNAL_SERVER_ERROR
  );
};
