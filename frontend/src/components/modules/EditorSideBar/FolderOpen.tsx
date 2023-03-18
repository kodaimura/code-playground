import React, {useState, useEffect} from 'react';

import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import FolderMenu from './FolderMenu';
import FileList from './FileList';
import FolderList from './FolderList';
import {Folder, FileInfo} from '../../../types/types';
import {getFolders, getFilesInfo} from '../../../apis/requests';


/*
FolderListのフォルダ1つ
*/

const FolderOpen = (props:{
	folder: Folder,
	hier: number,
	setOpenFileNo: (arg: number) => void,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [filesInfo, setFilesInfo] = useState<FileInfo[]>([]);
	const [open, setOpen] = useState(-1);

	useEffect(() => {
		getFolders(props.folder.folderNo)
		.then(data => {
			if (data) {
				setFolders(data);
			}
		})

		getFilesInfo(props.folder.folderNo)
		.then(data => {
			if (data) {
				setFilesInfo(data);
			}
		})
	}, [props.folder])


	return (
		<>
		<Button
			size="small"
			style={{
				paddingLeft: props.hier * 15,
				textTransform: 'none',
				fontSize: "13px",
				display: "block",
				textAlign: "left",
				width:"100%"}}
			onClick={() => setOpen(open * -1)}
			onContextMenu={(e)=>{
				e.preventDefault();
				setAnchorEl((anchorEl === e.currentTarget)? null : e.currentTarget);
			}}
		>
		{(open === 1)?
			<div style={{display: "inline-flex", alignItems: "center"}}>
				<ArrowDropDownIcon color="action" fontSize="small"/>
				<FolderOpenIcon color="action" fontSize="small"/>
				<span style={{color:"#555"}}>&nbsp;{props.folder.folderName}</span>
			</div> :
			<div style={{display: "inline-flex", alignItems: "center"}}>
				<ArrowRightIcon color="action" fontSize="small"/>
				<FolderIcon color="action" fontSize="small"/>
				<span style={{color:"#555"}}>&nbsp;{props.folder.folderName}</span>
			</div>
		}
		</Button>

		{(open === 1)?
			<>
			<FolderList 
				hier={props.hier + 1} 
				folders={folders} 
				setOpenFileNo={props.setOpenFileNo}
			/>
			<FileList 
				parentFolderNo={props.folder.folderNo} 
				hier={props.hier + 1} 
				filesInfo={filesInfo}
				setFilesInfo={setFilesInfo} 
				setOpenFileNo={props.setOpenFileNo} 
			/>
			</> : ""
		}

		<FolderMenu 
			anchorEl={anchorEl} 
			targetFolder={props.folder} 
			setFolders={setFolders}
			setFilesInfo={setFilesInfo}
		/>
		</>
	)
}


FolderOpen.defaultProps = {
	hier: 0
};
export default FolderOpen;