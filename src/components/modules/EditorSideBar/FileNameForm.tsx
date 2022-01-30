import React, {useState, useEffect} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';

import LangAndVersionPulldown from '../LangAndVersionPulldown';
import {FileInfo} from '../../../types/types';
import {getFileExtensions, postFileInfo} from '../../../utils/requests';


/*
ファイル新規作成、ファイル名編集
*/

const FileNameForm = (props: {
    file?: FileInfo,
    parentFolderNo: number,
    setFilesInfo?: (arg: FileInfo[]) => void
}) => {
    const [fileName, setFileName] = useState(props.file? props.file.fileName : "untitled");
    const [lang, setLang] = useState(props.file? props.file.lang : "");
    const [version, setVersion] = useState(props.file? props.file.version : "");
    const [disabled, setDisabled] = useState(false);
    const [fileExs, setFileExs] = useState<{[key: string]:string}>({});
    const [fileEx, setFileEx] = useState(props.file? props.file.fileEx : "");
    const fileNo = props.file? props.file.fileNo : undefined;


    useEffect(() => {
        if (!disabled) {
            getFileExtensions().then((data) => {
                setFileExs(data);
            });
        }
    }, [disabled])

    useEffect(() => {
        if (fileExs[lang]) {
            setFileEx(fileExs[lang]);
        }
    }, [lang, fileExs])

    const onClickHandler = () => {
        if (fileName && lang && version){
            postFileInfo(props.parentFolderNo, fileName, fileEx, lang, version, fileNo)
            .then(data => {
                if (data && props.setFilesInfo) props.setFilesInfo(data);
                setDisabled(true);
            })
        }
    }

    return (
        <>
        {(disabled)? "" :
        <>
        <TextField 
            sx={{ m:1, minWidth: 160 }}
            label="File Name"
            size="small" 
            required
            value={fileName}             
            onChange={(e) => {
                setFileName(e.target.value);
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">.{fileEx}</InputAdornment>
            }}
            
        />
        <LangAndVersionPulldown
            lang={lang}
            version={version} 
            setLang={setLang} 
            setVersion={setVersion}
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

export default FileNameForm;