import React, {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

import {putCode} from '../../../apis/requests';


export const FileSaveButton = (props: {
    fileNo: number,
    code: string,
}) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(false);
    }, [props.code])

    const onClickHandler = () => {
        putCode(props.fileNo, props.code);
        setDisabled(true);
    }
    
    return (
        <IconButton
        onClick={onClickHandler}
        disabled={disabled}
        >
        <SaveIcon fontSize="large"/>
        </IconButton>
    )
    
}