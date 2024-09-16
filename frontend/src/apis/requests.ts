import {apiurl} from '../utils/constants';


export const runProgram = async (
	language: string,
	code: string
) => {
	return fetch(`${apiurl}/run`, {
		method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({language, code})
    })
    .then(response => {return response.text()})
    .catch(console.error);
}

export const getFileExtensions = async () => {
    return fetch(`${apiurl}/file-extensions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {return response.json()})
    .catch(console.error);
}

export const getLangs = async () => {
	return fetch(`${apiurl}/langs`, {
		method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {return response.json()})
    .catch(console.error);
}