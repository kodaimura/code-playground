import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';
import {CenterAlign} from '../parts/utils';


const SignupPage = () => {
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
		<SignupForm />
		</>
		)
}

export default SignupPage;