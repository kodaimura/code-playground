import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getFileExtensions } from '../../../apis/requests';


const useFileDownloader = (text: string, fileName: string, fileEx: string) => {
    const downloadFile = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileEx}`;
        link.click();
    };
    return downloadFile;
};


const useFileExtensions = () => {
    const [fileExs, setFileExs] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchFileExtensions = async () => {
            try {
                const data = await getFileExtensions();
                setFileExs(data);
            } catch (error) {
                console.error("Failed to fetch file extensions", error);
            }
        };

        fetchFileExtensions();
    }, []);

    return fileExs;
};


interface FileOutputButtonProps {
    text: string;
    fileName?: string;
    lang: string;
}


export const FileOutputButton: React.FC<FileOutputButtonProps> = ({
    text,
    fileName = "code-playground",
    lang,
}) => {
    const fileExs = useFileExtensions();
    const fileExtension = fileExs[lang] || "txt";
    const downloadFile = useFileDownloader(text, fileName, fileExtension);

    return (
        <Button
            variant="primary"
            onClick={downloadFile}
            className="d-flex align-items-center"
        >
            <i className="bi bi-file-earmark-text me-2" />&nbsp;ダウンロード
        </Button>
    );
};
