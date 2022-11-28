import { Button } from '@mantine/core';
import Editor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

export type TCode = string | undefined;

interface Props {
  input: TCode;
  setInput: React.Dispatch<React.SetStateAction<TCode>>;
}

export const CodeEditor: React.FC<Props> = ({ input, setInput }) => {
  const onFormatClick = () => {
    const formatted = prettier.format(input!, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
    });

    setInput(formatted);
  };
  return (
    <div>
      <Button onClick={onFormatClick}>Format</Button>
      <Editor
        height="500px"
        theme="vs-dark"
        // defaultValue="// some comment"
        defaultLanguage="javascript"
        value={input}
        onChange={setInput}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
