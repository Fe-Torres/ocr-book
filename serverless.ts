import type { AWS } from "@serverless/typescript";
import { runCode, readImgBase64 } from "./src/infra/aws-lambdas";

// Validar a transformação de uma env
const providerRegion = "us-east-1";

const serverlessConfiguration: AWS = {
  service: "ocr-book-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: providerRegion,
    httpApi: {
      shouldStartNameWithService: true,
      cors: {
        allowedOrigins: [
          "https://ocr-book.vercel.app/",
          "https://ocr-book.vercel.app",
        ],
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {
    runCode,
    readImgBase64,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};
module.exports = serverlessConfiguration;
