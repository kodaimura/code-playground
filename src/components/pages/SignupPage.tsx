import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';
import {CenterAlign} from '../parts/utils';
import {signup} from '../../utils/common-requests';


const SignupPage = () => {
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	

	return (
		<>
		<Header 
			rightContent={
				<Button
					onClick={() => navigate('/')}
				>LOGIN</Button>
			}
		/>
		<CenterAlign>
		Click here to use as a guest →
		<Button
			size="large" 
			onClick={() => navigate('/guest')}
		>GUEST</Button>
		</CenterAlign>
		<SignupForm
			description="Create a new account."
			onChange1={(e) => setUserName(e.target.value)}
			onChange2={(e) => setUserId(e.target.value)}
			onChange3={(e) => setPassword(e.target.value)}
			onChange4={(e) => setPasswordConfig(e.target.value)}
			onClick={() => signup(userName, userId, password, passwordConfirm, setError)}
			errorMessage={error} />
		</>
		)
}

export default SignupPage;