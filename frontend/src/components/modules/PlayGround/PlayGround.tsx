import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { io as socketIOClient, Socket } from "socket.io-client";

import {
  Console,
  LangAndVersionPulldown,
  FileOutputButton,
  RunButton,
  Editor
} from '../../modules';

import { defaultCodes } from '../../../utils/constants';

const loc = document.location;
const ENDPOINT = `${loc.protocol}//${loc.host}`;
let socket: Socket;

const GroupForm = (props: {
  lang: string,
  codes: { [lang: string]: string },
  setCode: (code: string) => void,
  setCodes: (arg: { [lang: string]: string }) => void,
  setGroup: (group: string) => void,
}) => {
  const [group0, setGroup0] = useState("");
  const [group, setGroup] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [keep, setKeep] = useState({ lang: "", code: "" });

  useEffect(() => {
    props.setCodes({ ...props.codes, [keep.lang]: keep.code });

    if (keep.lang === props.lang) {
      props.setCode(keep.code);
    }
  }, [keep]);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value === "" || value === group) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setGroup0(value);
  };

  const connectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
    setDisabled(true);
    socket = socketIOClient(ENDPOINT);
    socket.on(group0, data => {
      if (socket.id !== data.clientId) {
        setKeep({ lang: data.lang, code: data.code });
      }
    });
    setGroup(group0);
    props.setGroup(group0);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
    if (group0 !== "") {
      setDisabled(false);
    }
    setGroup("");
    props.setGroup("");
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="roomID"
          value={group0}
          onChange={onChangeHandler}
        />
        <Button
          variant="success"
          onClick={connectSocket}
          disabled={disabled}
        >
          <i className="bi bi-link-45deg"></i>
        </Button>
        {group !== "" && (
          <>
            <span style={{ fontSize: 11 }}><em>{group}</em></span>
            <Button
              variant="warning"
              onClick={disconnectSocket}
            >
              <i className="bi bi-x-circle"></i> 切断
            </Button>
          </>
        )}
      </InputGroup>
    </>
  );
};

export const PlayGround = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [lang, setLang] = useState("");
  const [version, setVersion] = useState("");
  const [codes, setCodes] = useState<{ [key: string]: string }>(defaultCodes);
  const [group, setGroup] = useState("");

  useEffect(() => {
    setCode(codes[lang] ? codes[lang] : "");
  }, [lang]);

  useEffect(() => {
    setCodes({ ...codes, [lang]: code });
  }, [code]);

  const onChangeHandler = (
    code: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCode(code);
    if (group !== "") {
      socket.emit("typing", {
        group, lang, code
      });
    }
  };

  return (
    <>
      <Row>
        <Col xs={12} md={5} className="text-start">
          <LangAndVersionPulldown
            lang={lang}
            version={version}
            setLang={setLang}
            setVersion={setVersion}
          />
        </Col>
        <Col xs={9} md={5} className="text-start">
          <GroupForm
            lang={lang}
            codes={codes}
            setCode={setCode}
            setCodes={setCodes}
            setGroup={setGroup}
          />
        </Col>
        <Col xs={1.5} md={1} className="text-end">
          <RunButton
            code={code}
            lang={lang}
            version={version}
            setResult={setResult}
          />
        </Col>
        <Col xs={1.5} md={1} className="text-end">
          <FileOutputButton
            text={code}
            lang={lang}
          />
        </Col>
      </Row>

      <Editor
        lang={lang}
        onChange={onChangeHandler}
        code={code}
      />
      <Console result={result} />
    </>
  );
};
