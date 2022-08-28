import React, {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import socketIOClient, {Socket} from "socket.io-client";

import {
	Console,
	LangAndVersionPulldown,
	FileOutputButton,
	RunButton,
	Editor
} from '../../modules';
import { LeftAlign, RightAlign } from '../../shared';

import { defaultCodes } from '../../../utils/constants';


/*
WebSocket通信付きのプログラム実行環境
*/

const loc = document.location;
const ENDPOINT = `${loc.protocol}//${loc.host}`;
let socket: Socket;

const GroupForm = (props: {
	lang: string,
	codes: {[lang: string]: string},
	setCode: (code: string) => void,
	setCodes: (arg: {[lang: string]: string}) => void,
	setGroup: (group: string) => void,
}) => {
	const [group0, setGroup0] = useState("");
	const [group, setGroup] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [keep, setKeep] = useState({lang:"", code:""});


	useEffect(() => {
		props.setCodes({...props.codes, [keep.lang]: keep.code});

		if (keep.lang === props.lang) {
			props.setCode(keep.code);
		}
	}, [keep])


	const onChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let value = event.target.value;
		if (value === "" || value === group) {
			setDisabled(true);
		}else {
			setDisabled(false);
		}
		setGroup0(value)
	}

	const connectSocket = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		if (socket) {
			socket.disconnect();
		}
		setDisabled(true);
		socket = socketIOClient(ENDPOINT);
    	socket.on(group0, data => {
    		if (socket.id !== data.clientId) {
    			setKeep({lang : data.lang, code : data.code});
    		}
    	});
    	setGroup(group0);
    	props.setGroup(group0);
   	}

   	const disconnectSocket = () => {
   		if (socket) {
			socket.disconnect();
		}
		if (group0 !== "") {
			setDisabled(false);
		}
		setGroup("");
    	props.setGroup("");
   	}

	return (
		<>
		<TextField 
			sx={{ m:1, minWidth: 160 }}
			label="roomID"  
			color="success" 
			focused 
			size="small"
			onChange={onChangeHandler} />
		<IconButton 
			color="success"
			onClick={connectSocket}
			disabled={disabled}
		>
		<ConnectWithoutContactIcon fontSize="large"/>
		</IconButton>
		{(group === "")? "" :
			<>
			<span style={{"fontSize":11}}><em>{group}</em></span>
			<IconButton 
				color="warning"
				onClick={disconnectSocket}
			>
			<CancelIcon fontSize="small"/>
			<span style={{"fontSize":11, "color":"orange"}}>切断</span>
			</IconButton>
			</>
		}
      	</>
	)
}


export const PlayGround = () => {
	const [code, setCode] = useState("");
	const [result, setResult] = useState("");
	const [lang, setLang] = useState("");
	const [version, setVersion] = useState("");
	const [codes, setCodes] = useState<{[key: string]:string}>(defaultCodes);
	const [group, setGroup] = useState("");


	useEffect(() => {
		setCode(codes[lang]? codes[lang] : "");
	}, [lang])

	useEffect(() => {
		setCodes({...codes, [lang]: code});
	}, [code])

	const onChangeHandler = (
		code: string,
		event: React.ChangeEvent<HTMLInputElement>
	): void => {	
		setCode(code);
		if (group !== "") {
			socket.emit("typing", {
				group, lang, code
			})
		}
	}

	return (
		<>
		<Grid container>
        <Grid item xs={12} md={5}>
        	<LeftAlign>
          	<LangAndVersionPulldown 
          		lang={lang}
          		version={version}
          		setLang={setLang} 
          		setVersion={setVersion}
          	/>
        	</LeftAlign>
        </Grid>
        <Grid item xs={9} md={5}>
			<LeftAlign>
			<GroupForm
				lang={lang} 
				codes={codes}
				setCode={setCode}
				setCodes={setCodes}
				setGroup={setGroup}
			/>
			</LeftAlign> 
		</Grid>
        <Grid item xs={1.5} md={1}>
        	<RightAlign>
          	<RunButton 
          		code={code} 
          		lang={lang} 
          		version={version}
          		setResult={setResult} 
          	/>
        	</ RightAlign>
        </Grid>
        <Grid item xs={1.5} md={1}>
        	<RightAlign>
        	<FileOutputButton 
        		text={code} 
        		lang={lang} 
        	/>
        	</RightAlign>
        </Grid>
      	</Grid>

      	<Editor 
      		lang={lang} 
      		onChange={onChangeHandler}
      		code={code}
      	/>
      	<Console result={result} />
      	</>
	)
	
}