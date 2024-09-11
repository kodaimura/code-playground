import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getFileExtensions } from '../../../apis/requests';

const outputFile = (
  text: string,
  fileName: string,
  fileEx: string
) => {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.${fileEx}`;
  link.click();
};

export const FileOutputButton = (props: {
  text: string,
  fileName?: string,
  lang: string,
}) => {
  const [fileExs, setFileExs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getFileExtensions().then(data => {
      setFileExs(data);
    });
  }, []);

  const onClickHandler = () => {
    outputFile(
      props.text,
      props.fileName || "code-playground",
      fileExs[props.lang] ? fileExs[props.lang] : "txt"
    );
  };

  return (
    <Button 
      variant="primary" 
      onClick={onClickHandler} 
      className="d-flex align-items-center"
    >
      <i className="bi bi-file-earmark-text me-2" style={{ fontSize: '24px' }}></i>
      Download
    </Button>
  );
};
