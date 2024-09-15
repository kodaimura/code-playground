import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import { getLangs } from '../../../apis/requests';

export const SelectLanguages = (
  props: {
    lang: string,
    setLang: (lang: string) => void,
  }
) => {
  const [langs, setLangs] = useState<string[]>([]);

  useEffect(() => {
    getLangs().then(data => {
      const langs = data;
      setLangs(langs);
      if (props.lang === "") props.setLang(data[0]);
    });
  }, []);

  const onChangeLang = (newLang: string) => {
    props.setLang(newLang);
  };

  return (
    <div className="d-flex">
      <Form.Group className="me-3">
        <Form.Label>Language</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {props.lang || "Select Language"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {langs.map((elem) => (
              <Dropdown.Item
                key={elem}
                active={elem === props.lang}
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
