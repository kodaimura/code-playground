import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getFileExtensions } from '../../../apis/requests';

const outputFile = (text: string, fileName: string, fileEx: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${fileEx}`;
    link.click();
};

export const FileOutputButton = ({
    text,
    fileName = "code-playground",
    lang
}: {
    text: string,
    fileName?: string,
    lang: string,
}) => {
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

    const onClickHandler = () => {
        const fileExtension = fileExs[lang] || "txt";
        outputFile(text, fileName, fileExtension);
    };

    return (
        <Button
            variant="primary"
            onClick={onClickHandler}
            className="d-flex align-items-center"
        >
            <i className="bi bi-file-earmark-text me-2"/>&nbsp;ダウンロード
        </Button>
    );
};
