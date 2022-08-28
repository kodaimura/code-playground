import React, {useState, useEffect} from 'react';

import {Header} from '../../layouts';
import {PasswordForm} from '../../forms';
import {UserIconMenu} from '../../shared';
import {getProfile} from '../../../apis/common-requests';


export const PasswordPage = () => {
	const [loginUsername, setLoginUsername] = useState("");

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.username) setLoginUsername(data.username);
		});
	}, [])

	return (
		<>
		<Header rightContent={<UserIconMenu username={loginUsername}/>}/>

		<PasswordForm />
		</>
		)
}