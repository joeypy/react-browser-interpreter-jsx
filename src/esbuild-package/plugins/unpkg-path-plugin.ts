import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);

        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(args.path, args.importer + "/").href,
          };
        }

        return {
          path: `https://www.unpkg.com/${args.path}`,
          namespace: "a",
        };
        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //     namespace: "a",
        //   };
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from 'medium-test-pkg';
              console.log(message);
            `,
          };
        }

        const { data } = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data,
        };
      });
    },
  };
};
