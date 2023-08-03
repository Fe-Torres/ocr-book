import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../helper/api-gateway";
import { middyfy } from "../helper/lambda";
import { handleErrorResponse } from "../helper/handler-error";
import { Logger } from "../../../main/logs/Loger";
import { StatusCode, StatusMessage } from "../helper/enum";
import { JoiValidator } from "../helper/joiValidation";
import schema from "./schema";
import { makeReadImgUsecase } from "../../../main/factories/readImg";

const readImgBase64 = async (event): Promise<APIGatewayProxyResult> => {
  try {
    Logger.initialProcessMessage("ReadImgBase64 function");
    JoiValidator.validate(event.body, schema);

    const { imgBase64 } = event.body;
    const readImgUseCase = makeReadImgUsecase();
    const codeResult = await readImgUseCase.execute(imgBase64);
    Logger.endProcessMessage("ReadImgBase64 function");

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

export const main = middyfy(readImgBase64);
