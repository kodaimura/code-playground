import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import LoginForm from '../parts/LoginForm';

import {CenterAlign} from '../parts/utils';
import {login} from '../../utils/common-requests';


const LoginPage = () => {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();


	return (
		<>
		<Header
			rightContent={
				<Button 
					onClick={() => navigate('/signup')}
				>SIGNUP</Button>}
		/>
		<CenterAlign>
		Click here to use as a guest →
		<Button
			size="large" 
			onClick={() => navigate('/guest')}
		>GUEST</Button>
		</CenterAlign>
		<LoginForm
			description="Login to Code Playground."
			onChange1={(e) => setUserId(e.target.value)}
			onChange2={(e) => setPassword(e.target.value)} 
			onClick={() => login(userId, password, setError)}
			errorMessage={error}
		/>
		</>
		)
}

export default LoginPage;