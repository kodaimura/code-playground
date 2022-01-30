import React, {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {getFileExtensions} from '../../utils/requests';


const outputFile = (
	text: string,
	fileName: string, 
	fileEx: string
) => {
    let ary = text.split('');
    let blob = new Blob(ary,{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${fileEx}`;
    link.click();
}


const FileOutputButton = (
	props: {
		text: string,
		fileName: string, 
		lang: string,
	}
) => {
	const [fileExs, setFileExs] = useState<{[key: string]:string}>({});

    useEffect(() => {
		getFileExtensions().then(data => {
			setFileExs(data);
		})
	}, [])

	const onClickHandler = () => {
		outputFile(
			props.text,
			props.fileName, 
			fileExs[props.lang]? fileExs[props.lang] : "txt"
		)
	}


	return (
		<IconButton 
			color="primary"	
			onClick={onClickHandler}
		>
		<FileDownloadIcon fontSize="large"/>
		</IconButton>
	)
}

FileOutputButton.defaultProps = {
	fileName: "code-playground",
};
export default FileOutputButton;