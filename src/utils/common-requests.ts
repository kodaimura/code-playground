import {responseFilter} from './utils';
import {apiurl} from './constants';


export const login =　(
	userId: string,
	password: string,
	setError?: (message: string) => void 
) => {
	fetch(`${apiurl}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({userId, password})
	})
	.then(response => {
		if (!response.ok) {
			if (setError) {
				setError("Login failed.");
			}
			throw new Error(response.statusText);
		}
		return response.json();
	})
	.then(data => {
		localStorage.setItem("token", data.access_token);
		document.location.href = "/";
	})
	.catch(console.error);
}


export const logout = () => {
	localStorage.removeItem("token");
	document.location.href = "/";
}


export const signup = (
	userName: string,
	userId: string,
	password: string,
	passwordConfirm: string,
	setError?: (message: string) => void 
) => {
	if (password !== passwordConfirm && setError) {
		setError("Confirmation passwords do not match.");
	}

	fetch(`${apiurl}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			userName, 
			userId, 
			password, 
			passwordConfirm
		})
	})
	.then(response => {
		if (!response.ok) {
			if (setError) {
				setError((response.status === 409)? 
					"That ID is already in use." 
					: "Signup failed.");
			}
			throw new Error(response.statusText);
		}
		document.location.href = "/";
	}).catch(console.error);
}


export const getProfile = () => {
	return fetch(`${apiurl}/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(responseFilter)
	.catch(console.error);
}

export const checkAuth = () => {
	return fetch(`${apiurl}/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(response => {
		return (response.ok)? true : false;
	}).catch(() => {
		return false
	});
}