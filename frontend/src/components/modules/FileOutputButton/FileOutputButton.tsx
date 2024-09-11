import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons'; // Bootstrap Iconsのインポート

import { getFileExtensions } from '../../../apis/requests';

const outputFile = (
  text: string,
  fileName: string,
  fileEx: string
) => {
  let ary = text.split('');
  let blob = new Blob([ary.join('')], { type: "text/plain" });
  let link = document.createElement('a');
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
      props.fileName || "code-playground", // デフォルトファイル名
      fileExs[props.lang] ? fileExs[props.lang] : "txt"
    );
  };

  return (
    <Button 
      variant="primary" 
      onClick={onClickHandler} 
      className="d-flex align-items-center"
    >
      <FileText size={24} className="me-2" />
      Download
    </Button>
  );
};
