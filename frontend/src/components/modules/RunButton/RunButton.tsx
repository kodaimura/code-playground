import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { runProgram } from '../../../apis/requests';
import { ConsoleWindow } from '../../modules';


interface RunButtonProps {
    code: string;
    lang: string;
}


const fixCode = (code: string, lang: string): string => {
    if (lang === "php") {
        code = code.replace(/^<\?php\s*|<\?\s*php\s*/i, '');
    }
    return code.replaceAll('"', '\\"');
};


export const RunButton: React.FC<RunButtonProps> = ({ code, lang }) => {
    const [disabled, setDisabled] = useState(false);

    const onClickHandler = useCallback(() => {
        setDisabled(true);
        const fixedCode = fixCode(code, lang);

        runProgram(lang, fixedCode)
            .then(data => {
                if (data) {
                    ConsoleWindow(data);
                }
                setDisabled(false);
            })
            .catch(() => setDisabled(false));
    }, [code, lang]);

    return (
        <Button
            variant="danger"
            disabled={disabled}
            onClick={onClickHandler}
            className="d-flex align-items-center"
        >
            <i className="bi bi-play" />&nbsp;&nbsp;実行
        </Button>
    );
};
