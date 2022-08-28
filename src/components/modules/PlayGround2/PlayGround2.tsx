import React, {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import {
	Console,
	FileOutputButton,
	FileSaveButton,
	RunButton,
	Editor
} from '../../modules';
import {RightAlign} from '../../shared';

import {defaultCodes} from '../../../utils/constants';
import {File} from '../../../types/types';
import {getFile, putDescription} from '../../../apis/requests';


/*
ログインユーザ用のプログラム実行環境
ファイル保存機能。
*/

export const PlayGround2 = (props:{
	fileNo: number
}) => {
	const [file, setFile] = useState<File>();
	const [code, setCode] = useState("");
	const [result, setResult] = useState("");
	const [memo, setMemo] = useState(false);
	const [description, setDescription] = useState("");
	const [descSaveDisabled, setDescSaveDisabled] = useState(true);
	

	useEffect(() => {
		if (props.fileNo) {
			getFile(props.fileNo)
			.then(data => {
				if (data) setFile(data)
			})
		}
	}, [props.fileNo])

	useEffect(() => {
		if (file) {
			setCode(file.code? file.code : defaultCodes[file.lang]? defaultCodes[file.lang] : "");
			setDescription(file.description);
		} 
	}, [file])


	return (
		<>
		<Grid container>
		<Grid item xs={12} md={12} style={{padding: 10}}>
		{memo?
		<>
		<TextField
          	label="Memo"
          	multiline
          	fullWidth
          	size="small"
          	rows={5}
          	value={description}
          	onChange={(e) => {
          		setDescription(e.target.value);
          		if (descSaveDisabled) setDescSaveDisabled(false);
          	}}
        /></> : <><i style={{ whiteSpace: "pre-wrap"}}>{description}</i></>}
        <Button 
			size="small"
			onClick={() => setMemo(memo? false : true)}
		>メモ
		</Button>
		<IconButton 
			color="primary"
			disabled={descSaveDisabled}
			 onClick={() => {
        		putDescription(props.fileNo, description);
        		setDescSaveDisabled(true);
        		setMemo(false);
        	}}
		>
		<SaveIcon/>
        </IconButton>
        <hr/>
        </Grid>
        <Grid item xs={12} md={5}>

        	<b><span style={{fontSize: "1.3rem", paddingLeft: 10}}>
			{file? `${file.fileName}.${file.fileEx}` : ""}
			</span></b>
			<FileSaveButton fileNo={props.fileNo} code={code} />
        </Grid>
        <Grid item xs={6} md={5}>
        
        	<RightAlign>
        	{file? `${file.lang} : ${file.version}` : ""}
          	<RunButton 
          		code={code} 
          		lang={file? file.lang : ""} 
          		version={file? file.version : ""}
          		setResult={setResult} 
          	/>
        	</ RightAlign>
        </Grid>
        <Grid item xs={6} md={2}>
        	<RightAlign>
        	<FileOutputButton 
        		text={code}
        		fileName={file? file.fileName : ""} 
        		lang={file? file.lang : ""} 
        	/>
        	</RightAlign>
        </Grid>
      	</Grid>

      	<Editor 
      		lang={file? file.lang : ""} 
      		onChange={setCode}
      		code={code}
      	/>
      	<Console result={result} />
      	</>
	)
	
}