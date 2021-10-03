/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
}

// const path = require("path");

// process.env.NODE_ENV = "test";

// module.exports = {
//   rootDir: path.resolve(__dirname),
//   roots: ["<rootDir>"],
//   moduleFileExtensions: ["js", "jsx", "json"],
//   moduleNameMapper: {
//   },
//   testRegex: "(/test/.*|(\\.|/)(test|spec))\\.js?$",
//   transform: {
//   },
// };