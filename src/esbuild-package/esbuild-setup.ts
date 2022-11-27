import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export const setupBundle = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "/esbuild.wasm",
  });
};

export const bundler = async (rawCode: string): Promise<any> => {
  return esbuild
    .build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
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

