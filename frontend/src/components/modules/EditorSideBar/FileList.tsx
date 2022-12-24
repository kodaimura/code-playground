import React, {useState} from 'react';

import Button from '@mui/material/Button';

import FileMenu from './FileMenu';
import {FileInfo} from '../../../types/types';


/*
EditorSideVarのファイル一覧表示
hier: フォルダの階層数(インデント用)
*/

const FileList = (props:{
	parentFolderNo: number,
	hier: number,
	setOpenFileNo: (arg: number) => void,
	filesInfo: FileInfo[],
	setFilesInfo: (arg: FileInfo[]) => void
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [target, setTarget] = useState<FileInfo>();


	return (
		<>
		{props.filesInfo.map((
			elem: FileInfo,
			index: number
		) => {
			return (
				<div 
					key={index}
					onContextMenu={(e)=>{
						setAnchorEl((anchorEl === e.currentTarget)? null : e.currentTarget);
						setTarget(elem);
						e.preventDefault();
					}}
				>
				<Button
					size="small"
					style={{
						paddingLeft: props.hier * 15,
						display: "block",
						textTransform: 'none',
						width:"100%",
						textAlign:"left",
						fontSize: "13px"}}
					onClick={() => props.setOpenFileNo(elem.fileNo)}
				>
					<span style={{color:"#555"}}>
					&nbsp;&nbsp;&nbsp;{elem.fileName}.{elem.fileEx}
					</span>
				</Button>
				</div>
			)
		})}
		<FileMenu 
			anchorEl={anchorEl} 
			targetFile={target} 
			setFilesInfo={props.setFilesInfo} />
		</>
	)
}

export default FileList;