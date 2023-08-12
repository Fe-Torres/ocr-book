import { handlerPath } from "../helper/handler-resolver";

export const runCode = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/run-code",
      },
    },
  ],
};
