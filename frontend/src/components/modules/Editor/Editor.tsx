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
	if (lang === "node") {
		return "javascript"
	} else if (lang === "Racket") {
		return "scheme"
	} else {
		return lang.toLowerCase()
	}
}


export const Editor = (props: {
	lang: string,
	onChange?: (
		value: string, 
		event: React.ChangeEvent<HTMLInputElement>) => void,
	onInput?: (
		event: React.ChangeEvent<HTMLInputElement>) => void,
	code: string,
}) => {
	
	return (
		<AceEditor
			mode={langToAceMode(props.lang)}
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
  				if (props.onChange) props.onChange(value, event);
  			}}
  			onInput={(event) => {
  				if (props.onInput) props.onInput(event);
  			}}
  			width="100%"
  			height="600px"
  			value={props.code}
    	/>
	)
	
}