import React, {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import {Folder} from '../../../types/types';
import {postFolder} from '../../../utils/requests';


/*
フォルダの新規作成、フォルダ名編集
*/

const FolderNameForm = (props: {
    folder?: Folder,
    parentFolderNo: number,
    setFolders: (arg: Folder[]) => void
}) => {
    const [folderName, setFolderName] = useState(props.folder? props.folder.folderName : "untitled");
    const [disabled, setDisabled] = useState(false);
    const folderNo = props.folder? props.folder.folderNo : undefined;

    const onClickHandler = () => {
        postFolder(props.parentFolderNo, folderName, folderNo)
        .then(data => {
            if (data) props.setFolders(data);
            setDisabled(true)
        })
    }

    return (
        <>
        {(disabled)? "" :
        <>
        <TextField 
            sx={{ m:1, minWidth: 160 }}
            label="Folder Name"
            size="small" 
            required
            value={folderName}             
            onChange={(e) => {
                setFolderName(e.target.value);
            }}
        />
        <Button sx={{ m:1 }}
            size="small"
            onClick={onClickHandler}
            startIcon={<SaveIcon />} 
        >save
        </Button>
        <Button sx={{ m:1 }}
            size="small"
            onClick={() => setDisabled(true)}
            startIcon={<CancelIcon />} 
        >cancel
        </Button>
        </>}
        </>
    )    
}

export default FolderNameForm;