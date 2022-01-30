export type FileInfo = {
	fileNo: number,
	parentFolderNo: number,
	fileName: string,
	fileEx: string,
	lang: string,
	version: string,
}

export type FileBody = {
	code: string,
	description: string,
}

export type File = {
	fileNo: number,
	parentFolderNo: number,
	fileName: string,
	fileEx: string,
	lang: string,
	version: string,
	code: string,
	description: string,
	createAt: string,
	updateAt: string,
}


export type Folder = {
	folderNo: number,
	parentFolderNo: number,
	folderName: string,
	description: string,
	createAt: string,
	updateAt: string,
}