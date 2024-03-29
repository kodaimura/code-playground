import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import {signup} from '../../apis/common-requests';


const ErrorMessage = styled("div") ({
	color: "red"
})

const TextInput = styled(TextField) ({
	width: 300
})


export const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<Grid 
			container
			direction="column" 
			alignItems="center" 
			justifyContent="center" 
			style={{ height: '70vh' }} 
			spacing={2}
		>
		<Grid item>
			<em>
			Create a new account.
			</em>
		</Grid>
		<Grid item>
		<TextInput 
			label="Username"
			required 
			fullWidth 
			variant="filled"
			onChange={(e) => setUsername(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Password" 
			required 
			fullWidth 
			type="password" 
			variant="filled"
			onChange={(e) => setPassword(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			label="Confirmation Password" 
			required 
			fullWidth  
			type="password" 
			variant="filled"
			onChange={(e) => setPasswordConfig(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large" 
			variant="contained" 
			color="primary" 
			onClick={() => signup(username, password, passwordConfirm, setErrorMsg)}
		>Signup</ Button>
		</Grid>
		<Grid item>
		<ErrorMessage>
		{errorMsg}
		</ErrorMessage>
		</Grid>
		</Grid>
		)
}