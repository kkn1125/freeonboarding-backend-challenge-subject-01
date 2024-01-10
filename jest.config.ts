import type { Config } from "jest";

const config: Config = {
  verbose: true,
  coverageDirectory: "./coverage",
  rootDir: "./",
  testMatch: ["<rootDir>/__tests__/**/*.spec.ts"],
  preset: "ts-jest",
};

export default config;
