import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const CustomAppBar = styled(AppBar) ({
	backgroundColor: "black",
});


export const Header = (props: {
	leftContent?: React.ReactNode,
	rightContent?: React.ReactNode
}) => {

	return (
		<CustomAppBar position="static">
		<Toolbar>
		{props.leftContent}
		<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      	Code Playground
        </Typography>
		{props.rightContent}
		</ Toolbar>
		</CustomAppBar>
	);
}