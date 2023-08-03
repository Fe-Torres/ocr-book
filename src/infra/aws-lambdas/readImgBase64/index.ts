import { handlerPath } from "../helper/handler-resolver";

export const readImgBase64 = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/read-image",
      },
    },
  ],
};
