import React, {useState, useEffect} from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {SelectChangeEvent} from "@mui/material";

import {getLangs} from '../../../apis/requests';


export const LangAndVersionPulldown = (
	props : {
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
		})
	}, [])

	useEffect(() =>  {
		if (props.lang && langAndVer[props.lang]) {
			setVersions(langAndVer[props.lang]);
		}
	}, [props.lang])

	useEffect(() =>  {
		if (props.lang && langAndVer[props.lang]) {
			setVersions(langAndVer[props.lang]);
		}
	}, [props.version])


	useEffect(() =>  {
		if (versions.length !== 0) props.setVersion(versions[0]);
	}, [versions])


	const onChangeLang = (
		event: SelectChangeEvent<string>,
		child: React.ReactNode
	) => {
		const newLang = event.target.value;
		props.setLang(event.target.value);
		setVersions(langAndVer[newLang]);
	}

	const onChangeVersion = (
		event: SelectChangeEvent<string>, 
		child: React.ReactNode
	) => {
		props.setVersion(event.target.value);	
	}


	return (
		<>
		<FormControl sx={{ m:1, minWidth: 160 }}>
        <Select
        	size="small"
        	value={props.lang}
        	onChange={onChangeLang}
        >	
        	<MenuItem disabled={true} value={props.lang}>{props.lang}</MenuItem>
        	{langs.map((
				elem: string,
				index: number
			) => {
				return <MenuItem key={index} value={elem}>{elem}</MenuItem>
			})
			}
        </Select>
      	</FormControl>

      	<FormControl sx={{ m:1, minWidth: 160 }}>
        <Select
        	size="small"
        	value={props.version}
        	onChange={onChangeVersion}
        >	
        	<MenuItem disabled={true} value={props.version}>{props.version}</MenuItem>
        	{versions.map((
				elem: string,
				index: number
			) => {
				return <MenuItem key={index} value={elem}>{elem}</MenuItem>
			})
			}
        </Select>
      	</FormControl>
		</>
	)
}