/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.ts'],
  setupFilesAfterEnv: ["<rootDir>/__tests__/mock/prisma.ts"],
};