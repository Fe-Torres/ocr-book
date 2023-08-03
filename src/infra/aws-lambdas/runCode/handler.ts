import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../helper/api-gateway";
import { middyfy } from "../helper/lambda";
import { handleErrorResponse } from "../helper/handler-error";
import { ActionLog, Logger } from "../../../main/logs/Loger";
import { StatusCode, StatusMessage } from "../helper/enum";
import { JoiValidator } from "../helper/joiValidation";
import schema from "./schema";
import { makeRunCodeUsecase } from "../../../main/factories/runCode";

const runCode = async (event): Promise<APIGatewayProxyResult> => {
  try {
    Logger.processMessage("RunCodeFunction", ActionLog.INITIAL, event.body);
    JoiValidator.validate(event.body, schema);

    const { codeText } = event.body;
    const runCodeUsecase = makeRunCodeUsecase();
    const codeResult = await runCodeUsecase.execute(codeText);
    Logger.processMessage("RunCodeFunction", ActionLog.END, codeText);

    return formatJSONResponse(
      {
        message: StatusMessage.OK,
        codeResult,
      },
      StatusCode.OK
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const main = middyfy(runCode);
