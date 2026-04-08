import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  input: "src/lib/index.js",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      interop: "auto",
    },
    {
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    peerDepsExternal({ packageJsonPath: resolve(__dirname, "package.json") }),
    nodeResolve({ extensions: [".js", ".jsx"] }),
    babel({
      babelHelpers: "bundled",
      presets: [["@babel/preset-react", { runtime: "automatic" }]],
      extensions: [".js", ".jsx"],
    }),
    postcss({
      extract: resolve(__dirname, "dist/index.css"),
      minimize: false,
    }),
  ],
};
