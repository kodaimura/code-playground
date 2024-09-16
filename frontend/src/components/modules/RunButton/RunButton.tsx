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
    runProgram(props.lang, props.code.replaceAll('"', '\\"'))
      .then(data => {
        if (data) {
          ConsoleWindow(data);
        }
        setDisabled(false);
      });
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
