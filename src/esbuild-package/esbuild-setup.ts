import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export const setupBundle = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.15.15/esbuild.wasm",
  });
};

export const bundler = async (rawCode: string): Promise<any> => {
  return esbuild
    .build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        // "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    })
    .then((result): any => {
      return {
        code: result.outputFiles[0].text,
        err: "",
      };
    })
    .catch((e) => {
      return {
        code: "",
        err: e.message,
      };
    });
};
