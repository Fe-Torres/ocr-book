/* eslint-disable max-len */
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  testPathIgnorePatterns: ["<rootDir>/.*\\/Mock\\/.*"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
