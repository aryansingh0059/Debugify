import React, { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

/**
 * Controlled Monaco Editor component for code input with bug highlighting.
 */
const CodeEditor = ({ code, setCode, language, bugs = [] }) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (!model) return;

      const markers = bugs
        .filter(bug => bug.line && !isNaN(bug.line))
        .map((bug) => ({
          startLineNumber: Number(bug.line),
          startColumn: 1,
          endLineNumber: Number(bug.line),
          endColumn: 1000,
          message: bug.issue,
          severity: monacoRef.current.MarkerSeverity.Error,
        }));

      monacoRef.current.editor.setModelMarkers(model, "owner", markers);
    }
  }, [bugs, code]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  return (
    <div className="h-full border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group bg-[#0d0f1a]">
      <Editor
        height="100%"
        language={language || "javascript"}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
          fontFamily: "'Fira Code', 'Monaco', monospace",
          fontLigatures: true,
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          renderLineHighlight: "all",
          lineNumbers: "on",
          lineDecorationsWidth: 5,
        }}
      />
    </div>
  );
};

export default CodeEditor;
