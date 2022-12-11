import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';

import AreYouSureBox from '../../../components/AreYouSureBox';

export default function Edit() {
  const location = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  const [pharmacyID, setPharmacyID] = React.useState(location.state.data.pharmacistPharmacyID);
  const [pharmacistID, setPharmacistID] = React.useState(location.state.data.pharmacistID);   
  const [firstName, setFirstName] = React.useState(location.state.data.firstName);
  const [lastName, setLastName] = React.useState(location.state.data.lastName);
  const [middleInit, setMiddleInit] = React.useState(location.state.data.middleInit);

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showDeletingMessage, setShowDeletingMessage] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [pharmacyIDError, setPharmacyIDError] = React.useState(false);
  const [pharmacistIDError, setPharmacistIDError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);


  const [open, setOpen] = React.useState(false);

  const handleClickOpenAreYouSure = () => {
    setOpen(true);
  };

  const handleCloseAreYouSure = () => {
    setOpen(false);
  };

  const handleConfirmAreYouSure = () => {
    // remove the doctor from the database
    Axios.delete(`http://127.0.0.1:5000/pharmacists/${location.state.data.pharmacistID}`)
    setShowDeletingMessage(true);
    setTimeout(() => {
        navigate('/pharmacy/pharmacist', {state: {data: location.state.originalData}});
    }, 2000);

  };

  const handleBackButton = () => {
    navigate('/pharmacy/pharmacist', {state: {data: location.state.originalData}});
};

  // fundtion to check if firstName, lastName, email, location, and field are not empty
  const checkForm = () => {
    let temp = {}
    if (document.getElementById("pharmacyID").value === "") {
        temp.firstName = false
        setPharmacyIDError(true);
    } else {
        setPharmacyIDError(false);
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {
        console.log({
          Pharmacist_ID: parseInt(data.get('pharmacistID')),
          FirstName: data.get('firstName'),
          MiddleInit: data.get('middleInit'),
          LastName: data.get('lastName'),
          Pharmacist_Pharmacy_ID: pharmacyID
        })
        // send the data to the backend
        Axios.put(`http://127.0.0.1:5000/pharmacists/${pharmacistID}`, {
            Pharmacist_ID: parseInt(data.get('pharmacistID')),
            FirstName: data.get('firstName'),
            MiddleInit: data.get('middleInit'),
            LastName: data.get('lastName'),
            Pharmacist_Pharmacy_ID: pharmacyID
        })
        .then((response) => {
            console.log(response);
            setPharmacistIDError(false);
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            setTimeout(() => {
                navigate('/pharmacy/pharmacist', {state: {data: location.state.originalData}});
            }, 2000);
        }, (error) => {
            console.log(error);
            setPharmacistIDError(true);
            setErrorMessage("This pharmacist ID already exists in the database or is invalid. Please select a different pharmacist ID.")
            setShowErrorMessage(true);
            setShowSuccessMessage(false);
        });

    } else {
        setErrorMessage("Please fill out all the required fields.");
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AreYouSureBox open={open} 
        handleYes={handleConfirmAreYouSure} 
        handleNo={handleCloseAreYouSure}
        showDeletingMessage={showDeletingMessage}
        question="Remove this pharmacist from the database?"
        message="Are you sure you want to remove this pharmacist from the database? This action cannot be undone."/>
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <Typography component="h1" variant="h5">
            Edit {location.state.data.fullName}'s Information
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>{errorMessage}</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully edited {location.state.data.fullName}'s information! Redirecting to main patient page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField disabled margin="normal" name="pharmacyID" defaultValue={pharmacyID} required fullWidth id="pharmacyID" label="Pharmacy ID" error={pharmacyIDError}/>   
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField margin="normal" name="pharmacistID" required defaultValue={pharmacistID} fullWidth id="pharmacistID" label="Pharmacist ID" error={pharmacistIDError}/>   
            </Grid>
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" name="firstName" defaultValue={firstName} required fullWidth id="firstName" label="First Name" error={firstNameError}/>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField margin="normal" name="middleInit" defaultValue={middleInit} fullWidth id="middleInit" label="Init"/>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" required fullWidth id="lastName" defaultValue={lastName} label="Last Name" name="lastName" error={lastNameError}/>
              </Grid>       
          </Grid>
          <Stack sx={{ pt: 2 }} spacing={1} direction="row" justifyContent="center">
            <Button type="submit" variant="contained">Save Changes</Button>
            <Button variant="contained" color="error" onClick={handleClickOpenAreYouSure}>Remove Pharmacist</Button>
          </Stack>
          </Box>
          <Box textAlign='center'>
          <Button sx={{mt: 2}} variant="outlined" onClick={handleBackButton} justifyContent="center" >Back</Button>
          </Box>
        </Box>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}