import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';

import Header from '../parts/Header';
import PlayGround from '../modules/PlayGround';
import {LeftAlign} from '../parts/utils';


export const ContentBox = styled('div') ({
	width:"90%", 
	margin: "0 auto",
})

const GuestPage = () => {
	const navigate = useNavigate();

	return (
		<>
		<Header 
			rightContent={
				<>
				<Button
					onClick={() => navigate('/signup')}
				>SIGNUP</Button>
				<Button
					onClick={() => navigate('/')}
				>LOGIN</Button>
				</>}
		/>
		<ContentBox>
		<LeftAlign>
		※同一のroomID(任意)を設定したユーザとエディタの共有が可能
		</LeftAlign>
		<PlayGround />
		</ContentBox>
		</>
	)
	
}

export default GuestPage;