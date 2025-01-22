/** @type {import('rollup').RollupOptions} */

import typescript2 from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser"; // 压缩代码插件

export default {
  input: "./src/index.ts",
  output: {
    file: "./bin/index.js",
    format: "esm",
    plugins: [terser()],
  },
  external: ["sharp", "mockjs"],
  plugins: [typescript2()],
};
