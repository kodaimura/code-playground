import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-terminal";

/*
プログラム実行結果を表示
*/

const Console = (
	props: {
		result: string 
	}
) => {

	return (
		<AceEditor 
    		theme="terminal"
    		highlightActiveLine={false}
    		showPrintMargin={false}
    		fontSize={15}
    		showGutter={true}
    		setOptions={{
  				showLineNumbers: false,
  				tabSize: 4,
  			}}
    		readOnly={true}
  			width="100%"
  			height="300px"
  			value={props.result}
    	/>
    )
}

export default Console;