/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  setupFiles: ["<rootDir>/jest.setup.js"], // Add this line
  // transform: {
  //   "^.+\\.ts$": "ts-jest",
  // },
};