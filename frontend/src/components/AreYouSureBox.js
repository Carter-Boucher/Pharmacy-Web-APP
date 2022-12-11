import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function AreYouSureBox(props){
    const {question, message, open, handleYes, handleNo, showDeletingMessage} = props;

    return(
        <div>
            <Dialog
            open={open}
            onClose={handleNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle sx={{marginTop: 1}} id="alert-dialog-title">
                    {question}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                {showDeletingMessage && (
                    <Alert sx={{mt: 2}} severity="success" >Deleting ... 
                    </Alert>
                )}
                </DialogContent>
                <DialogActions>
                    <Button sx={{ marginBottom: 1}}onClick={handleNo}>No, Keep</Button>
                    <Button sx={{ marginBottom: 1, marginRight: 1}} color="error" onClick={handleYes} autoFocus>
                    Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
