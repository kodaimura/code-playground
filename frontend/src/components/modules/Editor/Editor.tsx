import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-scheme";
import "ace-builds/src-noconflict/mode-lisp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-golang";
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-julia';

const langToAceMode = (lang: string): string => {
    switch (lang.toLowerCase()) {
        case 'node':
            return 'javascript';
        case 'racket':
            return 'scheme';
        default:
            return lang.toLowerCase();
    }
};

interface EditorProps {
    lang: string;
    onChange?: (value: string, event: any) => void;
    onInput?: (event: any) => void;
    code: string;
}

export const Editor: React.FC<EditorProps> = ({ lang, onChange, onInput, code }) => {
    return (
        <AceEditor
            mode={langToAceMode(lang)}
            theme="monokai"
            editorProps={{ $blockScrolling: true }}
            highlightActiveLine={true}
            showPrintMargin={true}
            fontSize={15}
            showGutter={true}
            setOptions={{
                showLineNumbers: true,
                tabSize: 4,
            }}
            onChange={(value, event) => {
                if (onChange) onChange(value, event);
            }}
            onInput={(event) => {
                if (onInput) onInput(event);
            }}
            width="100%"
            height="600px"
            value={code}
        />
    );
};
