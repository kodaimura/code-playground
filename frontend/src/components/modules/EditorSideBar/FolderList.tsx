import React from 'react';

import FolderOpen from './FolderOpen';
import {Folder} from '../../../types/types';


/*
EditorSideBarのフォルダ一覧表示
hier: フォルダの階層数(インデント用)
*/

const FolderList = (props:{
	folders: Folder[],
	hier: number,
	setOpenFileNo: (arg: number) => void,
}) => {

	return (
		<>
		{props.folders.map((
			elem: Folder,
			index: number
		) => {
			return (
				<FolderOpen 
					key={index}
					folder={elem} 
					hier={props.hier} 
					setOpenFileNo={props.setOpenFileNo}
				/>
			)
		})}
		
		</>
	)
}

export default FolderList;