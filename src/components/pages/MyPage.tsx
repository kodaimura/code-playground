import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

import Header from '../parts/Header';
import UserIconMenu from '../parts/UserIconMenu';
import PlayGround2 from '../modules/PlayGround2';
import PlayGround from '../modules/PlayGround';
import EditorSideBar from '../modules/EditorSideBar';

import {getProfile} from '../../utils/common-requests';


const MyPage = () => {
	const [openFileNo, setOpenFileNo] = useState(NaN);
	const [userName, setUserName] = useState("");
	
	useEffect(() => {
    	getProfile()
    	.then((data) => {
    		if (data && data.userName) setUserName(data.userName);
  	})}, []);

	return (
		<>
		<Header rightContent={<UserIconMenu userName={userName}/>} />
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


export default MyPage;