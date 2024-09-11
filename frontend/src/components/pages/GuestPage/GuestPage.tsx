import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';

import {Header} from '../../layouts';
import {PlayGround} from '../../modules';


export const ContentBox = styled('div') ({
	width:"90%", 
	margin: "0 auto",
})

export const GuestPage = () => {
	const navigate = useNavigate();

	return (
		<>
		<Header/>
		<ContentBox>
		※同一のroomID(任意)を設定したユーザとエディタの共有が可能
		<PlayGround />
		</ContentBox>
		</>
	)
	
}