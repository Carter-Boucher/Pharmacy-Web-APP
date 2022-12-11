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
import dayjs from 'dayjs';
import Axios from 'axios';


export default function Add() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [doctorDoctorIDError, setDoctorIDError] = React.useState(false);
  const [patientIDError, setPatientIDError] = React.useState(false);
  const [stateError, setStateError] = React.useState(false);
  const [streetError, setStreetError] = React.useState(false);
  const [cityError, setCityError] = React.useState(false);
  const [sexError, setSexError] = React.useState(false);
  const [DOBError, setDOBError] = React.useState(false);

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
    if (document.getElementById("patientID").value === "") {
        temp.patientID = false
        setPatientIDError(true);
    } else {
        setPatientIDError(false);
    }
    if (document.getElementById("doctorDoctorID").value === "") {
        temp.doctorDoctorID = false
        setDoctorIDError(true);
    } else {
        setDoctorIDError(false);
    }
    if (document.getElementById("state").value === "") {
        temp.state = false
        setStateError(true);
    } else {
        setStateError(false);
    }
    if (document.getElementById("street").value === "") {
        temp.street = false
        setStreetError(true);
    } else {
        setStreetError(false);
    }
    if (document.getElementById("city").value === "") {
        temp.city = false
        setCityError(true);
    } else {
        setCityError(false);
    }
    // check if dateOfBirth is valid (not yyyy-mm-dd string or future date or empty string)
    if (document.getElementById("dateOfBirth").value === "" || dayjs().isBefore(document.getElementById("dateOfBirth").value) || !dayjs(document.getElementById("dateOfBirth").value).isValid() || document.getElementById("dateOfBirth").value === "yyyy-mm-dd") {
        temp.DOB = false
        setDOBError(true);
    } else {
        setDOBError(false);
    }
    if (document.getElementById("sex").value === "") {
        temp.sex = false
        setSexError(true);
    } else {
        setSexError(false);
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {
      // append to SampleDoctors["doctors"]
      const newPatient = {
        "Patient_ID": parseInt(data.get("patientID")),
        "FirstName": data.get("firstName"),
        "MiddleInit": data.get("middleInit"),
        "LastName": data.get("lastName"),
        "Street": data.get("street"),
        "City": data.get("city"),
        "State": data.get("state"),
        "DOB": data.get("dateOfBirth"),
        "Age": dayjs().diff(data.get("dateOfBirth"), 'year'),
        "Sex": data.get("sex"),
        "Doctor_Doctor_ID": parseInt(data.get("doctorDoctorID"))

    }

    console.log(newPatient)

    // check if doctor already exists in database
    Axios.get('http://127.0.0.1:5000/doctors/' + data.get("doctorDoctorID"))
        .then((res) => {
        // add new doctor to database using FastAPI backend, if successful, show success message, else show error message
        Axios.post('http://127.0.0.1:5000/patients/', newPatient)
        .then(() => {
            setDoctorIDError(false);
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            setTimeout(() => {
            navigate('/patient', { replace: true });
            }, 2000);
        })
        .catch(() => {
            setPatientIDError(true);
            setErrorMessage("This patient ID already exists in the database. Please try again.")
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
            });
        })
        .catch(() => {
        setDoctorIDError(true);
        setErrorMessage("This doctor ID does not exist in the database. Please try again.")
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
    });

    } else {
      setErrorMessage("Please fill out all the required fields properly before submitting.")
      setShowErrorMessage(true);
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
            Add Patient to Database
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>{errorMessage}</Alert>
          )}          
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully added the patient to the database! Redirecting to main patient page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField margin="normal" name="patientID" required fullWidth id="patientID" label="Patient ID" error={patientIDError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField margin="normal" name="doctorDoctorID" required fullWidth id="doctorDoctorID" label="Doctor ID" error={doctorDoctorIDError}/>
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
        <TextField margin="normal" name="street" required fullWidth id="street" label="Street" error={streetError}/>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required name="city" fullWidth id="city" label="City" error={cityError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth id="state" label="Province/Territory" name="state" error={stateError}/>
              </Grid>       
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth margin="normal" id="dateOfBirth" name="dateOfBirth" error={DOBError} label="Date of Birth" type="date" defaultValue="yyyy-mm-dd" InputLabelProps={{shrink: true}}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth id="sex" label="Sex" name="sex" error={sexError}/>
              </Grid>       
          </Grid>
          <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="center">
              <Button type="submit"  variant="contained">
                  Submit
              </Button>
              <Button variant="outlined" href="/patient" justifyContent="center" >Back</Button>
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