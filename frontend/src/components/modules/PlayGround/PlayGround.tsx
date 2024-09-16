import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { io as socketIOClient, Socket } from "socket.io-client";

import {
    SelectLanguages,
    FileOutputButton,
    RunButton,
    Editor
} from '../../modules';

import { defaultCodes } from '../../../utils/constants';

const loc = document.location;
const ENDPOINT = `${loc.protocol}//${loc.host}`;
let socket: Socket;

const ConnectForm = (props: {
    lang: string,
    group: string,
    setCode: (code: string) => void,
    setGroup: (group: string) => void,
}) => {
    const [disabled, setDisabled] = useState(true);
    const [keep, setKeep] = useState({ lang: "", code: "" });

    useEffect(() => {
		if (keep.lang === props.lang) {
			props.setCode(keep.code);
		}
	}, [keep])

    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = event.target.value;
        if (value === "" || value === props.group) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        props.setGroup(value);
    };

    const connectSocket = () => {
        if (socket) {
            socket.disconnect();
        }
        setDisabled(true);
        socket = socketIOClient(ENDPOINT);
        socket.on(props.group, data => {
            if (socket.id !== data.clientId) {
                setKeep({ lang: data.lang, code: data.code });
            }
        });
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
        }
        if (props.group !== "") {
            setDisabled(false);
        }
        props.setGroup("");
    };

    return (
        <>
            同一のルームIDを設定したユーザとエディタを共有
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="ルームID"
                    value={props.group}
                    onChange={onChangeHandler}
                />
                <Button
                    variant="success"
                    onClick={connectSocket}
                    disabled={disabled}
                >
                    <i className="bi bi-link-45deg"></i>共有
                </Button>
                {props.group !== "" && disabled && (
                    <>
                        <Button
                            variant="warning"
                            onClick={disconnectSocket}
                        >
                            <i className="bi bi-x-circle"></i>切断
                        </Button>
                    </>
                )}
            </InputGroup>
        </>
    );
};

export const PlayGround = () => {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("");
    const [group, setGroup] = useState("");
    const prevLangRef = useRef<string>("");

    useEffect(() => {
        if (!localStorage.getItem('codes')) {
            localStorage.setItem('codes', JSON.stringify(defaultCodes));
        }
    }, []);

    const storeCode = () => {
        const storedCodes = localStorage.getItem('codes');
        if (storedCodes) {
            let codes = JSON.parse(storedCodes);
            codes[prevLangRef.current] = code;
            localStorage.setItem('codes', JSON.stringify(codes));
        } else {
            localStorage.setItem('codes', JSON.stringify(defaultCodes));
        }
        prevLangRef.current = lang;
    }

    const setStoredCode = () => {
        const storedCodes = localStorage.getItem('codes');
        if (storedCodes) {
            const codes = JSON.parse(storedCodes);
            if (lang in codes) {
                setCode(codes[lang]);
            } else {
                setCode("");
            }
        }
    }

    const resetCodes = () => {
        localStorage.removeItem('codes');
        window.location.reload();
    };

    useEffect(() => {
        storeCode();
        setStoredCode();
    }, [lang]);

    useEffect(() => {
        window.addEventListener("beforeunload", storeCode);
        return () => {
            window.removeEventListener("beforeunload", storeCode);
        };
    }, [lang, code]);

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
                <Col xs={6} className="text-start">
                    <ConnectForm
                        lang={lang}
                        group={group}
                        setCode={setCode}
                        setGroup={setGroup}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={3} className="text-start">
                    <SelectLanguages
                        lang={lang}
                        setLang={setLang}
                    />
                </Col>
                <Col xs={12} md={9} className="text-end d-flex justify-content-end">
                    <RunButton
                        code={code}
                        lang={lang}
                    />
                    <FileOutputButton
                        text={code}
                        lang={lang}
                    />
                    <Button
                        variant="warning"
                        onClick={resetCodes}
                        className="d-flex align-items-center"
                    >
                        <i className="bi bi-arrow-clockwise me-2"/>&nbsp;リセット
                    </Button>
                </Col>
            </Row>

            <Editor
                lang={lang}
                onChange={onChangeHandler}
                code={code}
            />
        </>
    );
};
