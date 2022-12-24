import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

import {Header} from '../../layouts';
import {UserIconMenu} from '../../shared';
import {
	PlayGround2,
	PlayGround,
	EditorSideBar
} from '../../modules';

import {getProfile} from '../../../apis/common-requests';


export const MyPage = () => {
	const [openFileNo, setOpenFileNo] = useState(NaN);
	const [username, setUsername] = useState("");
	
	useEffect(() => {
    	getProfile()
    	.then((data) => {
    		if (data && data.username) setUsername(data.username);
  	})}, []);

	return (
		<>
		<Header rightContent={<UserIconMenu username={username}/>} />
		<Grid container>
        <Grid item xs={2.5} style={{ backgroundColor: "#CCC" }}>
			<EditorSideBar setOpenFileNo={setOpenFileNo}/>
		</Grid>
		<Grid item xs={9.5} >
			{(isNaN(openFileNo))? 
				<PlayGround />
				:<PlayGround2 fileNo={openFileNo}/>
			}
		</Grid>
		</Grid>
		</>
		);
}