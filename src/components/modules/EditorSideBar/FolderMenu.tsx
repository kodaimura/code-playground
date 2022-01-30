import React, {useState, useEffect} from 'react';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';

import FolderNameForm from './FolderNameForm';
import FileNameForm from './FileNameForm';
import DeleteDialog from '../../parts/DeleteDialog';

import {Folder, FileInfo} from '../../../types/types';
import {deleteFolder} from '../../../utils/requests';


/*
FolderListのフォルダを右クリックした時のメニュー
*/

const FolderMenu = (props:{
	anchorEl: HTMLElement | null,
	targetFolder: Folder | undefined,
    setFolders: (arg: Folder[]) => void
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

    const handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(3);
        setOpen(false);
    };

    const handleClick4 = (event: React.MouseEvent<HTMLElement>) => {
        setMenu(4);
        setOpen(false);
    };

    const handleDelete = async () => {
        await deleteFolder(props.targetFolder!.folderNo)
        setMenu(0);
        document.location.reload();
    }


	return (
		<>
		<Menu
            anchorEl={props.anchorEl}
            open={open}
            onClose={handleClose}
        >
        <MenuItem onClick={handleClick1}>New File</MenuItem>
        <MenuItem onClick={handleClick2}>Rename</MenuItem>
        <Divider />
        <MenuItem onClick={handleClick3}>New Folder</MenuItem>
        <Divider />
        <MenuItem onClick={handleClick4}>Delete Folder</MenuItem>
        </Menu>

        {(menu === 1 && props.targetFolder)? 
            <FileNameForm
                parentFolderNo={props.targetFolder.folderNo}
                setFilesInfo={props.setFilesInfo}
            /> : ""
        }

		{(menu === 2 && props.targetFolder)?
			<FolderNameForm
				folder={props.targetFolder}
                parentFolderNo={props.targetFolder.parentFolderNo}
                setFolders={props.setFolders}
            /> : ""
		} 

		{(menu === 3 && props.targetFolder)?
			<FolderNameForm
                parentFolderNo={props.targetFolder.folderNo}
                setFolders={props.setFolders}
            /> : ""
		} 

        {(menu === 4 && props.targetFolder)?
            <DeleteDialog
                head={props.targetFolder.folderName}
                body={"削除してよろしいですか？"}
                handler={handleDelete} 
            /> : ""
        } 
		</>
	)
}

export default FolderMenu;