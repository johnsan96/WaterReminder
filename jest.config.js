module.exports = {
   /*  transform: {
      "^.+\\.svg$": "jest-transform-stub",
    }, */
    preset: "jest-expo",
    testEnvironment: "jsdom",
   /*  setupFilesAfterEnv: [
      "<rootDir>/tests.setup.js",
      "@testing-library/jest-native/extend-expect",
    ], */
    "transformIgnorePatterns": [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
  };
  