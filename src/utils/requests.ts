import {File, FileInfo, Folder} from '../types/types';

import {responseFilter} from './utils';
import {apiurl} from './constants';


export const getFilesInfo = (
	parentFolderNo: number
): Promise<FileInfo[]> => {
	return fetch(`${apiurl}/files/info?parentFolderNo=${parentFolderNo}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(responseFilter)
	.catch(console.error);
}


export const putDescription = (
    fileNo: number,
	description: string,
) => {
	fetch(`${apiurl}/files/body/${fileNo}`, {
		method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({description})
    })
    .catch(console.error);
}


export const putCode = (
    fileNo: number,
	code: string
) => {
	fetch(`${apiurl}/files/body/${fileNo}`, {
		method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({code})
    })
    .catch(console.error);
}


export const getFile = (
	fileNo: number
): Promise<File> => {

	return fetch(`${apiurl}/files/${fileNo}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(responseFilter)
	.catch(console.error);
}


export const postFileInfo = (
    parentFolderNo: number,
	fileName: string,
    fileEx: string,
    lang: string,
    version: string,
    fileNo: number | undefined
) => {
    const url = (fileNo)? `${apiurl}/files/info/${fileNo}` : `${apiurl}/files/info`

	return fetch(url, {
		method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({parentFolderNo, fileName, fileEx, lang, version})
    })
    .then(responseFilter)
    .catch(console.error);
}


export const deleteFile = (
    fileNo: number
) => {
    fetch(`${apiurl}/files/${fileNo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
    }})
    .catch(console.error);
}


export const getPass = (
	folderNo: number
): Promise<{folderName:string, folderNo: number, parentFolderNo: number}[]> => {
	return fetch(`${apiurl}/folders/pass/${folderNo}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(responseFilter)
	.catch(console.error);
}


export const deleteFolder = (
    folderNo: number
) => {
    fetch(`${apiurl}/folders/${folderNo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
    }})
    .catch(console.error);
}


export const postFolder = (
    parentFolderNo: number,
    folderName: string,
    folderNo: number | undefined,
) => {
    const url = (folderNo)? `${apiurl}/folders/${folderNo}` : `${apiurl}/folders`

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({parentFolderNo, folderName})
    })
    .then(responseFilter)
    .catch(console.error);
}


export const getFolders = (
	parentFolderNo: number
): Promise<Folder[]> => {
	return fetch(`${apiurl}/folders?parentFolderNo=${parentFolderNo}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(responseFilter)
	.catch(console.error);
}


export const runProgram = (
	lang: string,
	version: string,
	code: string
) => {
	return fetch(`${apiurl}/run/${lang}/${version}`, {
		method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({code})
    })
    .then(response => {return response.text()})
    .catch(console.error);
}

export const getFileExtensions = () => {
    return fetch(`${apiurl}/file-extensions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {return response.json()})
    .catch(console.error);
}

export const getLangs = () => {
	return fetch(`${apiurl}/langs`, {
		method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {return response.json()})
    .catch(console.error);
}