import {useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import {login} from '../../apis/common-requests';


const ErrorMessage = styled("div") ({
	color: "red"
})

const TextInput = styled(TextField) ({
	width: 300
})

export const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	return (
		<>
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
			Login to Code Playground.
			</em>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="Username" 
			variant="filled"
			onChange={(e) => setUsername(e.target.value)}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="Password" 
			type="password" 
			variant="filled"
			onChange={(e) => setPassword(e.target.value)} 
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large"
			variant="contained" 
			color="primary" 
			onClick={() => login(username, password, setErrorMsg)}
		>Login</ Button>
		</Grid>
		<Grid item>
		<ErrorMessage>
		{errorMsg}
		</ErrorMessage>
		</Grid>
		</Grid>
		</>
		)
}

LoginForm.defaultProps = {
	buttonText: "LOGIN", 
	description: ""
};