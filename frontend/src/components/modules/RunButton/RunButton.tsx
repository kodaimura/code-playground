import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { runProgram } from '../../../apis/requests';
import { ConsoleWindow } from '../../modules';

export const RunButton = (props: {
  code: string,
  lang: string,
}) => {
  const [disabled, setDisabled] = useState(false);

  const onClickHandler = () => {
    setDisabled(true);
    runProgram(props.lang, fixCode(props.code))
      .then(data => {
        if (data) {
          ConsoleWindow(data);
        }
        setDisabled(false);
      });
  };

  const fixCode = (code: string) => {
    if (props.lang === "php") {
        code = code.replace(/^\<\?php\s*|\<\?\s*php\s*/i, '');
    }
    return code.replaceAll('"', '\\"')
  };

  return (
    <Button
      variant="danger"
      disabled={disabled}
      onClick={onClickHandler}
      className="d-flex align-items-center"
    >
      <i className="bi bi-play"/>&nbsp;&nbsp;実行
    </Button>
  );
};
