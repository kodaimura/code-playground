import React, {useState, useEffect} from 'react';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

import FileNameForm from './FileNameForm';
import DeleteDialog from '../../parts/DeleteDialog';
import {FileInfo} from '../../../types/types';
import {deleteFile, getFilesInfo} from '../../../utils/requests';


/*
FileListのファイルを右クリックした時のメニュー
*/

const FileMenu = (props:{
	anchorEl: HTMLElement | null,
	targetFile: FileInfo | undefined,
    setFilesInfo: (arg: FileInfo[]) => void
}) => {
	const [menu, setMenu] = useState(0);
	const [open, setOpen] = useState(true);


	useEffect(() => {
		setMenu(0);
        setOpen(Boolean(props.anchorEl));
    }, [props.anchorEl])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(1);
        setOpen(false);
    };

    const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(2);
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteFile(props.targetFile!.fileNo);
        setMenu(0);
        getFilesInfo(props.targetFile!.parentFolderNo)
        .then(data => {
            if (data) props.setFilesInfo(data);
        });
    }


	return (
		<>
		<Menu
            anchorEl={props.anchorEl}
            open={open}
            onClose={handleClose}
        >
        <MenuItem onClick={handleClick1}>Rename</MenuItem>
        <Divider />
        <MenuItem onClick={handleClick2}>Delete File</MenuItem>
        </Menu>


        {(menu === 1 && props.targetFile)? 
            <FileNameForm
                file={props.targetFile}
                parentFolderNo={props.targetFile.parentFolderNo}
                setFilesInfo={props.setFilesInfo}
            /> : ""
        }
        {(menu === 2 && props.targetFile)? 
            <DeleteDialog
                head={`${props.targetFile.fileName}.${props.targetFile.fileEx}`}
                body={"削除してよろしいですか？"}
                handler={handleDelete} 
            /> : ""
        }
		</>
	)
}

export default FileMenu;