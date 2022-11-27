import { useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { setupBundle, bundler } from "./esbuild-package/esbuild-setup";

export const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const isEsbuildInitialize = useRef(false);

  const onClick = async () => {
    // const result = await esbuild.transform(input, { loader: "jsx" });
    const result = await bundler("hola");
    console.log("result:", result);
    setCode(result.code);
  };

  useEffect(() => {
    if (!isEsbuildInitialize.current) {
      setupBundle();
      isEsbuildInitialize.current = true;
    }
  }, []);

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={50}
        rows={10}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};
