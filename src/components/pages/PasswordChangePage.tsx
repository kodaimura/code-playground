import React, {useState, useEffect} from 'react';

import Header from '../parts/Header';
import PasswordChangeForm from '../parts/PasswordChangeForm';
import UserIconMenu from '../parts/UserIconMenu';
import {getProfile} from '../../utils/common-requests';


const PasswordChangePage = () => {
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

		<PasswordChangeForm />
		</>
		)
}

export default PasswordChangePage;