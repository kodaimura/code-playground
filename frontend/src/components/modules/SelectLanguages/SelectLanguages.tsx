import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import { getLangs } from '../../../apis/requests';

interface SelectLanguagesProps {
    lang: string;
    setLang: (lang: string) => void;
}

export const SelectLanguages: React.FC<SelectLanguagesProps> = ({ lang, setLang }) => {
    const [langs, setLangs] = useState<string[]>([]);

    const fetchLangs = useCallback(async () => {
        try {
            const data = await getLangs();
            setLangs(data);
            if (!lang && data.length > 0) {
                setLang(data[0]);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }, [lang, setLang]);

    useEffect(() => {
        fetchLangs();
    }, [fetchLangs]);

    const onChangeLang = (newLang: string) => {
        setLang(newLang);
    };

    return (
        <div className="d-flex">
            <Form.Group className="me-3">
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {lang || "Select Language"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {langs.map((elem) => (
                            <Dropdown.Item
                                key={elem}
                                active={elem === lang}
                                onClick={() => onChangeLang(elem)}
                            >
                                {elem}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>
        </div>
    );
};
