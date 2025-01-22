/** @type {import('rollup').RollupOptions} */

import typescript2 from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: {
    file: "./bin/index.js",
    format: "esm",
  },
  plugins: [typescript2()],
};
