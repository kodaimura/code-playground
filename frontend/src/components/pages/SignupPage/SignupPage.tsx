import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

import {Header} from '../../layouts';
import {SignupForm} from '../../forms';
import {CenterAlign} from '../../shared';


export const SignupPage = () => {
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