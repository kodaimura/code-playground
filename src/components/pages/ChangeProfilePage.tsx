import React, {useState, useEffect} from 'react';

import Header from '../parts/Header';
import SignupForm from '../parts/SignupForm';
import UserIconMenu from '../parts/UserIconMenu';
import {getProfile} from '../../utils/common-requests';


const ChangeProfilePage = () => {
	const [loginUserName, setLoginUserName] = useState("");
	const [userName, setUserName] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfig] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.userName) setLoginUserName(data.userName);
		});
	}, [])

  	const changeProfile = () => {
		if (password !== passwordConfirm) {
			setError("Confirmation passwords do not match.");
		}

		fetch("/changeprofile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.token}`},
			body: JSON.stringify({
				userName, 
				userId, 
				password, 
				passwordConfirm
			})
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 409) {
					setError(
						(response.status === 409)? 
						"That ID is already in use."
						: "Signup failed.")
				}
				throw new Error(response.statusText);
			}
			localStorage.removeItem("token");
			document.location.href = "/"
		})
		.catch(console.error)
	}

	return (
		<>
		<Header rightContent={<UserIconMenu userName={loginUserName}/>}/>

		<SignupForm
			description="Change profile."
			onChange1={(e) => setUserName(e.target.value)}
			onChange2={(e) => setUserId(e.target.value)}
			onChange3={(e) => setPassword(e.target.value)}
			onChange4={(e) => setPasswordConfig(e.target.value)}
			onClick={changeProfile}
			buttonText="CHANGE"
			errorMessage={error} />
		</>
		)
}

export default ChangeProfilePage;