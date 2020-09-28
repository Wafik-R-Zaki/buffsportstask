module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test/jest/setupTests.js"],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
  }
};
