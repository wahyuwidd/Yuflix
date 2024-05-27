module.exports = function (api) {
  api.cache(true);
  require('dotenv').config();
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    ],
  };
};
