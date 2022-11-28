import { useEffect, useState, useRef } from 'react';
import { CodeEditor, TCode } from './components/CodeEditor';
import { setupBundle, bundler } from './esbuild-package/esbuild-setup';

export const App = () => {
  const [inputCode, setInputCode] = useState<string | undefined>('');
  const iframe = useRef<any>();
  const isEsbuildInitialize = useRef<any>(false);

  const onClick = async () => {
    iframe.current.srcdoc = html;
    const result = await bundler(inputCode!);
    iframe.current.contentWindow.postMessage(result.code, '*');
  };

  useEffect(() => {
    if (!isEsbuildInitialize.current) {
      setupBundle();
      isEsbuildInitialize.current = true;
    }
  }, []);

  const html = `
    <html lang="en">
    <head> </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener(
          'message',
          (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '<div>';
              console.error(err);
            }
          },
          false
        );
      </script>
    </body>
  </html>
  `;

  return (
    <div>
      <CodeEditor initialValue={inputCode} setInput={setInputCode} />
      {/* <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        cols={50}
        rows={10}
      ></textarea> */}
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview code"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      ></iframe>
    </div>
  );
};

// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const App = () => <h1>Hi there!</h1>

// ReactDOM.createRoot(document.getElementById('root')).render( <App/>)
