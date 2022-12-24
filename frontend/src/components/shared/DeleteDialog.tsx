import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const DeleteDialog = (props: {
    color?: "primary" | "inherit" | "default" | "secondary" | "error" | "info" | "success" | "warning",
	head?: string,
	body?: string,
	handler: any
}) => {
  	const [open, setOpen] = useState(true);

  	return (
    	<>
      	<Dialog
        	open={open}
        	onClose={() => setOpen(false)}
      	>
        <DialogTitle>
          {props.head}
        </DialogTitle>

        <DialogContent>
          	<DialogContentText>
            {props.body}
          	</DialogContentText>
        </DialogContent>
        
        <DialogActions>
        	<Button 
        		onClick={() => setOpen(false)}>Cancel</Button>
        	<Button 
        		onClick={() => {
        			props.handler();
        			setOpen(false);
        		}} autoFocus>
            OK
          	</Button>
        </DialogActions>
      	</Dialog>
    </>
  );
}

DeleteDialog.defaultProps = {
    color: "primary",
    head: "削除します。", 
    body: "本当によろしいですか？",
};