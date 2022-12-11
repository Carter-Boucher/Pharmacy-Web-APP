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

import AreYouSureBox from '../../components/AreYouSureBox';

export default function Edit() {
  const location = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  const [pharmacyID, setPharmacyID] = React.useState(location.state.data.pharmID);
  const [pharmacyName, setPharmacyName] = React.useState(location.state.data.name);   
  const [state, setState] = React.useState(location.state.data.state);
  const [city, setCity] = React.useState(location.state.data.city);
  const [country, setCountry] = React.useState(location.state.data.country);

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showDeletingMessage, setShowDeletingMessage] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [pharmacyIDError, setPharmacyIDError] = React.useState(false);
  const [pharmacyNameError, setPharmacyNameError] = React.useState(false);
  const [stateError, setStateError] = React.useState(false);
  const [cityError, setCityError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);


  const [open, setOpen] = React.useState(false);

  const handleClickOpenAreYouSure = () => {
    setOpen(true);
  };

  const handleCloseAreYouSure = () => {
    setOpen(false);
  };

  const handleConfirmAreYouSure = () => {
    // remove the doctor from the database
    Axios.delete(`http://127.0.0.1:5000/pharmacies/${location.state.data.pharmID}`)
    setShowDeletingMessage(true);
    setTimeout(() => {
      navigate('/pharmacy', { replace: true });
    }, 2000);

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
    if (document.getElementById("pharmacyName").value === "") {
      temp.firstName = false
      setPharmacyNameError(true);
    } else {
        setPharmacyNameError(false);
    }
    if (document.getElementById("state").value === "") {
        temp.lastName = false
        setStateError(true);
    } else {
        setStateError(false);
    }
    if (document.getElementById("city").value === "") {
        temp.email = false
        setCityError(true);
    } else {
        setCityError(false);
    }
    if (document.getElementById("country").value === "") {
        temp.location = false
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
        
        // send the data to the backend
        Axios.put(`http://127.0.0.1:5000/pharmacies/${pharmacyID}`, {
            Pharm_ID: pharmacyID,
            Name: data.get('pharmacyName'),
            State: data.get('state'),
            City: data.get('city'),
            Country: data.get('country')
        })
        .then((response) => {
            console.log(response);
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            setTimeout(() => {
                navigate('/pharmacy', { replace: true });
            }, 2000);
        }, (error) => {
            console.log(error);
            setErrorMessage("An error occurred while trying to add the pharmacy to the database. Please try again later.");
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
        question="Remove this pharmacy from the database?"
        message="Are you sure you want to remove this pharmacy from the database? This action cannot be undone."/>
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <Typography component="h1" variant="h5">
            Edit Pharmacy
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>{errorMessage}</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully edited the pharmacy! Redirecting to main pharmacy page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" disabled name="pharmacyID" defaultValue={pharmacyID} required fullWidth id="pharmacyID" label="Pharmacy ID" error={pharmacyIDError}/>       
          <TextField margin="normal" name="pharmacyName" required defaultValue={pharmacyName} fullWidth id="pharmacyName" label="Pharmacy Name" error={pharmacyNameError}/>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required name="city" defaultValue={city} fullWidth id="city" label="City" error={cityError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth defaultValue={state} id="state" label="Province/Territory" name="state" error={stateError}/>
              </Grid>       
          </Grid>
          <TextField margin="normal" name="country" required defaultValue={country} fullWidth id="country" label="Country" error={countryError}/>
          <Stack sx={{ pt: 2 }} spacing={1} direction="row" justifyContent="center">
            <Button type="submit" variant="contained">Save Changes</Button>
            <Button variant="contained" color="error" onClick={handleClickOpenAreYouSure}>Remove Pharmacy</Button>
          </Stack>
          </Box>
          <Box textAlign='center'>
          <Button sx={{mt: 2}} variant="outlined" href="/pharmacy" justifyContent="center" >Back</Button>
          </Box>
        </Box>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}