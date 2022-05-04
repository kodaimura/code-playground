import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import LoginForm from '../parts/LoginForm';

import {CenterAlign} from '../parts/utils';


const LoginPage = () => {
	
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
		<LoginForm/>
		</>
		)
}

export default LoginPage;