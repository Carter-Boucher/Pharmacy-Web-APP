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
import Axios from 'axios';

export default function Add() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [pharmacyNameError, setPharmacyNameError] = React.useState(false);
  const [pharmacyIDError, setPharmacyIDError] = React.useState(false);
  const [stateError, setStateError] = React.useState(false);
  const [cityError, setCityError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);

  // function to check if firstName, lastName, email, location, and field are not empty
  const checkForm = () => {
    let temp = {}
    if (document.getElementById("pharmacyName").value === "") {
      temp.firstName = false
      setPharmacyNameError(true);
    } else {
      setPharmacyNameError(false);
    }
    if (document.getElementById("pharmacyID").value === "") {
        temp.patientID = false
        setPharmacyIDError(true);
    } else {
        setPharmacyIDError(false);
    }
    if (document.getElementById("state").value === "") {
        temp.state = false
        setStateError(true);
    } else {
        setStateError(false);
    }
    if (document.getElementById("city").value === "") {
        temp.city = false
        setCityError(true);
    } else {
        setCityError(false);
    }
    if (document.getElementById("country").value === "") {
        temp.country = false
        setCountryError(true);
    } else {
        setCountryError(false);
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {
      const newPharmacy = {
        "Pharm_ID": data.get('pharmacyID'),
        "Name": data.get('pharmacyName'),
        "City": data.get('city'),
        "State": data.get('state'),
        "Country": data.get("country"),
    }

    // check if pharmacy ID already exists in database
    Axios.get(`http://127.0.0.1:5000/pharmacies/${data.get('pharmacyID')}`)
    .then((response) => {
        setPharmacyIDError(true);
        setErrorMessage("This pharmacy ID already exists in the database. Please try again.")
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
    })
    .catch(() => {
        setPharmacyIDError(false);
        setShowSuccessMessage(true);
        // add new pharmacy to database
        Axios.post(`http://127.0.0.1:5000/pharmacies/`, newPharmacy)
        .then(() => {
            setShowErrorMessage(false);
            setTimeout(() => {
                navigate('/pharmacy');
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
            Add Pharmacy to Database
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>{errorMessage}</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully added the pharmacy to the database! Redirecting to main pharmacy page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" name="pharmacyID" required fullWidth id="pharmacyID" label="Pharmacy ID" error={pharmacyIDError}/>       
          <TextField margin="normal" name="pharmacyName" required fullWidth id="pharmacyName" label="Pharmacy Name" error={pharmacyNameError}/>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required name="city" fullWidth id="city" label="City" error={cityError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth id="state" label="Province/Territory" name="state" error={stateError}/>
              </Grid>       
          </Grid>
          <TextField margin="normal" name="country" required fullWidth id="country" label="Country" error={countryError}/>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="center">
              <Button type="submit"  variant="contained">
                  Submit
              </Button>
              <Button variant="outlined" href="/pharmacy" justifyContent="center" >Back</Button>
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