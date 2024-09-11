import React, { useState, useEffect } from 'react';
import { Dropdown, Form } from 'react-bootstrap';

import { getLangs } from '../../../apis/requests';

export const LangAndVersionPulldown = (
  props: {
    lang: string,
    version: string,
    setLang: (lang: string) => void,
    setVersion: (version: string) => void
  }
) => {
  const [langAndVer, setLangAndVer] = useState<{ [key: string]: string[] }>({});
  const [versions, setVersions] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);

  useEffect(() => {
    getLangs().then(data => {
      const langs = Object.keys(data);
      setLangAndVer(data);
      setLangs(langs);
      if (props.lang === "") props.setLang(langs[0]);
      if (data[props.lang]) setVersions(data[props.lang]);
    });
  }, []);

  useEffect(() => {
    if (props.lang && langAndVer[props.lang]) {
      setVersions(langAndVer[props.lang]);
    }
  }, [props.lang]);

  useEffect(() => {
    if (props.lang && langAndVer[props.lang]) {
      setVersions(langAndVer[props.lang]);
    }
  }, [props.version]);

  useEffect(() => {
    if (versions.length !== 0) props.setVersion(versions[0]);
  }, [versions]);

  const onChangeLang = (newLang: string) => {
    props.setLang(newLang);
    setVersions(langAndVer[newLang]);
  };

  const onChangeVersion = (newVersion: string) => {
    props.setVersion(newVersion);
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
            {langs.map((elem, index) => (
              <Dropdown.Item
                key={index}
                active={elem === props.lang}
                onClick={() => onChangeLang(elem)}
              >
                {elem}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group>
        <Form.Label>Version</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {props.version || "Select Version"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {versions.map((elem, index) => (
              <Dropdown.Item
                key={index}
                active={elem === props.version}
                onClick={() => onChangeVersion(elem)}
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
