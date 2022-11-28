import Editor from '@monaco-editor/react';

export type TCode = string | undefined;

interface Props {
  initialValue: TCode;
  setInput: React.Dispatch<React.SetStateAction<TCode>>;
}

export const CodeEditor: React.FC<Props> = ({ initialValue, setInput }) => {
  return (
    <Editor
      height="500px"
      theme="vs-dark"
      defaultValue="// some comment"
      defaultLanguage="typescript"
      value={initialValue}
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
      }}
    />
  );
};
