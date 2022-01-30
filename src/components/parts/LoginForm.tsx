import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


const ErrorMessage = styled("div") ({
	color: "red"
})

const TextInput = styled(TextField) ({
	width: 300
})

const LoginForm = (props: {
	description?: string,
	onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
	buttonText?: string,
	errorMessage?: string
}) => {

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
			{props.description}
			</em>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="ID" 
			variant="filled"
			onChange={props.onChange1}
		/>
		</Grid>
		<Grid item>
		<TextInput 
			required 
			label="Password" 
			type="password" 
			variant="filled"
			onChange={props.onChange2}
		/>
		</Grid>
		<Grid item>
		<Button 
			size="large"
			variant="contained" 
			color="primary" 
			onClick={props.onClick} 
		>{props.buttonText}</ Button>
		</Grid>
		<Grid item>
		<ErrorMessage>
		{props.errorMessage? props.errorMessage : ""}
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

export default LoginForm;