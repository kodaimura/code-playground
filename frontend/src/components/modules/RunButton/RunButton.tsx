import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { runProgram } from '../../../apis/requests';

export const RunButton = (props: {
  code: string,
  lang: string,
  setResult: (result: string) => void
}) => {
  const [disabled, setDisabled] = useState(false);

  const onClickHandler = () => {
    setDisabled(true);
    props.setResult("");
    runProgram(props.lang, props.code.replaceAll('"', '\\"'))
      .then(data => {
        if (data) props.setResult(data);
        setDisabled(false);
      });
  }

  return (
    <Button
      variant="danger"
      disabled={disabled}
      onClick={onClickHandler}
      style={{ fontSize: '24px' }} 
    >
      <i className="bi bi-play" />
    </Button>
  );
}
