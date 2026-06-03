module.exports = {
  preset: "jest-expo",

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.ts",
    "@testing-library/jest-native/extend-expect",
  ],

  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|expo-router|react-native-paper)/)",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
};
