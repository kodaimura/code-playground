import React, {useState} from 'react';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {runProgram} from '../../utils/requests';


const RunButton = (props: {
    code: string,
    lang: string,
    version: string,
    setResult: (result: string) => void
}) => {
    const [disabled, setDisabled] = useState(false);

    const onClickHandler = () => {
        setDisabled(true)
        props.setResult("");
        runProgram(props.lang, props.version, props.code.replaceAll('"', '\\"'))
        .then(data => {
            if (data) props.setResult(data);
            setDisabled(false)
        })
    }
    
    return (
        <IconButton
        color="error"
        disabled={disabled}
        onClick={onClickHandler}
        >
        <PlayArrowIcon fontSize="large"/>
        </IconButton>
    )
    
}

export default RunButton;