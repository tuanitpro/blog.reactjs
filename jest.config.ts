import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  coverageReporters: ["lcov"],
  preset: "ts-jest",
  testEnvironment: "jsdom", // ✅ needed for React (browser APIs)
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // ✅ mock CSS, images, etc.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.ts",

    "^@static/(.*)$": "<rootDir>/src/static/$1",
  },
};

export default config;
