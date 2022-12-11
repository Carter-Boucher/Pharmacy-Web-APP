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
  const [showNetworkErrorMessage, setShowNetworkErrorMessage] = React.useState(false);

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [doctorIDError, setDoctorIDError] = React.useState(false);

  // function to check if firstName, lastName, email, location, and field are not empty
  const checkForm = () => {
    let temp = {}
    if (document.getElementById("firstName").value === "") {
      temp.firstName = false
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (document.getElementById("lastName").value === "") {
      temp.lastName = false
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (document.getElementById("address").value === "") {
      temp.email = false
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    if (document.getElementById("doctorID").value === "") {
        temp.doctorID = false
        setDoctorIDError(true);
    } else {
        setDoctorIDError(false);
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {
      // append to SampleDoctors["doctors"]
      const newDoctor = {
        "FirstName": data.get("firstName"),
        "MiddleInit": data.get("middleInit"),
        "LastName": data.get("lastName"),
        "OfficeAddress": data.get("address"),
        "Doctor_ID": data.get("doctorID"),
      }

      // add new doctor to database using FastAPI backend, if successful, show success message, else show error message
      Axios.post('http://127.0.0.1:5000/doctors/', newDoctor)
        .then((res) => {
          setDoctorIDError(false);
          setShowSuccessMessage(true);
          setShowErrorMessage(false);
          setShowNetworkErrorMessage(false);
          setTimeout(() => {
            navigate('/doctor', { replace: true });
          }, 2000);
        })
        .catch((err) => {
          setDoctorIDError(true);
          setShowSuccessMessage(false);
          setShowErrorMessage(false);
          setShowNetworkErrorMessage(true);
        });

    } else {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Typography component="h1" variant="h5">
            Add Doctor to Database
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>Please fill out all the required fields before submitting.</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully added the doctor to the database! Redirecting to main doctor page ...</Alert>
          )}
          {showNetworkErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>A doctor already has this given Doctor ID, please select a different one.</Alert>
          )}    
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" name="doctorID" required fullWidth id="doctorID" label="Doctor ID" error={doctorIDError}/>
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
          <TextField margin="normal" required fullWidth name="address" label="Office Address" id="address" error={addressError}/>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="center">

              <Button type="submit"  variant="contained">
                  Submit
              </Button>
              <Button variant="outlined" href="/doctor" justifyContent="center" >Back</Button>
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