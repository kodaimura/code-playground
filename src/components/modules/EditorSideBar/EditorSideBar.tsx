import React from 'react';

import Button from '@mui/material/Button';

import FolderOpen from './FolderOpen';

/*
MyPage用のSideBar
*/

const EditorSideBar = (props: {
	setOpenFileNo: (arg: number) => void,
}) => {

	return (
		<>
		<Button
			size="small"
			style={{
				display: "block",
				textTransform: 'none',
				width:"100%",
				textAlign:"left",
				fontSize: "13px"}}
			onClick={() => props.setOpenFileNo(NaN)}
		>
		<span style={{color:"#555"}}>
		&nbsp;&nbsp;Code Playground
		</span>
		</Button>
		<FolderOpen 
			folder={{
				folderNo: 0, 
				folderName: "",
				parentFolderNo: 0, 
				description:"", 
				createAt:"", 
				updateAt:""
			}}
			setOpenFileNo={props.setOpenFileNo}
		/>
		</>
	)
}

export default EditorSideBar;