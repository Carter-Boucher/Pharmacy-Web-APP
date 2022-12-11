import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';

export default function Add() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [pharmacyIDError, setPharmacyIDError] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [pharmacistIDError, setPharmacistIDError] = React.useState(false);

  // function to check if firstName, lastName, email, location, and field are not empty
  const checkForm = () => {
    let temp = {}
    if (document.getElementById("firstName").value === "") {
      setFirstNameError(true)
      temp.firstName = false
    } else {
      setFirstNameError(false)
    }
    if (document.getElementById("lastName").value === "") {
      setLastNameError(true)
      temp.lastName = false
    } else {
      setLastNameError(false)
    }
    if (document.getElementById("pharmacyID").value === "") {
      setPharmacyIDError(true)
      temp.pharmacyID = false
    } else {
      setPharmacyIDError(false)
    }
    if (document.getElementById("pharmacistID").value === "") {
      setPharmacistIDError(true)
      temp.pharmacistID = false
    } else {
      setPharmacistIDError(false)
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleBackButton = () => {
      navigate('/pharmacy/pharmacist', {state: {data: location.state.data}});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {
      const newPharmacist = {
        Pharmacist_ID: parseInt(data.get('pharmacistID')),
        FirstName: data.get('firstName'),
        LastName: data.get('lastName'),
        MiddleInit: data.get('middleInit'),
        Pharmacist_Pharmacy_ID: location.state.data.pharmID
    }

    // check if pharmacist ID already exists in database
    Axios.get(`http://127.0.0.1:5000/pharmacists/${data.get('pharmacistID')}`)
    .then((response) => {
        setPharmacistIDError(true);
        setErrorMessage("This pharmacist ID already exists in the database. Please try again.")
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
    })
    .catch(() => {
        setPharmacistIDError(false);
        setShowSuccessMessage(true);
        // add new pharmacy to database
        Axios.post(`http://127.0.0.1:5000/pharmacists/`, newPharmacist)
        .then(() => {
            setShowErrorMessage(false);
            setTimeout(() => {
                navigate('/pharmacy/pharmacist', {state: {data: location.state.data}});
            }, 3000);
        });
        });

        } else {
            setShowErrorMessage(true);
            setErrorMessage("Please fill out all the required fields properly before submitting.");
            setShowSuccessMessage(false);
        }
    };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Typography component="h1" variant="h5">
            Add Pharmacist to Database
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>{errorMessage}</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully added the pharmacist to the database! Redirecting to main patient page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField margin="normal" disabled name="pharmacyID" defaultValue={location.state.data.pharmID} required fullWidth id="pharmacyID" label="Pharmacy ID" error={pharmacyIDError}/>   
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField margin="normal" name="pharmacistID" required fullWidth id="pharmacistID" label="Pharmacist ID" error={pharmacistIDError}/>   
            </Grid>
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" name="firstName" required fullWidth id="firstName" label="First Name" error={firstNameError}/>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField margin="normal" name="middleInit" fullWidth id="middleInit" label="Init"/>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" error={lastNameError}/>
              </Grid>       
          </Grid>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="center">
              <Button type="submit"  variant="contained">
                  Submit
              </Button>
              <Button variant="outlined" onClick={handleBackButton} justifyContent="center" >Back</Button>
              </Stack>
            <Grid container justifyContent="center">
            </Grid>
          </Box>
        </Box>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}