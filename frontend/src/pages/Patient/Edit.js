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

  const [patientName, setPatientName] = React.useState(() => location.state.data.fullName);
  const [doctorExists, setDoctorExists] = React.useState(() => location.state.data.doctorExists);

  const [doctorDoctorID, setDoctorDoctorID] = React.useState(() => location.state.data.doctorDoctorID);
  const [firstName, setFirstName] = React.useState(() => location.state.data.firstName);
  const [lastName, setLastName] = React.useState(() => location.state.data.lastName);
  const [middleInit, setMiddleInit] = React.useState(() => location.state.data.middleInit);
  const [sex, setSex] = React.useState(() => location.state.data.sex);
  const [age, setAge] = React.useState(() => location.state.data.age);
  const [dateOfBirth, setDateOfBirth] = React.useState(() => location.state.data.dateOfBirth);
  const [street, setStreet] = React.useState(() => location.state.data.street);
  const [city, setCity] = React.useState(() => location.state.data.city);
  const [state, setState] = React.useState(() => location.state.data.state);
  const [patientID, setPatientID] = React.useState(() => location.state.data.patientID);

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showDeletingMessage, setShowDeletingMessage] = React.useState(false);

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


  const [open, setOpen] = React.useState(false);

  const handleClickOpenAreYouSure = () => {
    setOpen(true);
  };

  const handleCloseAreYouSure = () => {
    setOpen(false);
  };

  const handleConfirmAreYouSure = () => {
    // remove the doctor from the database
    Axios.delete(`http://127.0.0.1:5000/patients/${location.state.data.patientID}`)
    setShowDeletingMessage(true);
    setTimeout(() => {
      navigate('/patient', { replace: true });
    }, 2000);

  };

  // fundtion to check if firstName, lastName, email, location, and field are not empty
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
    if (document.getElementById("doctorDoctorID").value === "") {
        temp.doctorID = false
        setDoctorIDError(true);
    } else {
        setDoctorIDError(false);
    }
    if (document.getElementById("patientID").value === "") {
        temp.patientID = false
        setPatientIDError(true);
    } else {
        setPatientIDError(false);
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
    if (document.getElementById("sex").value === "") {
        temp.sex = false
        setSexError(true);
    } else {
        setSexError(false);
    }
    if (document.getElementById("dateOfBirth").value === "" || dayjs().isBefore(document.getElementById("dateOfBirth").value) || !dayjs(document.getElementById("dateOfBirth").value).isValid() || document.getElementById("dateOfBirth").value === "yyyy-mm-dd") {
      temp.DOB = false
      setDOBError(true);
    } else {
      setDOBError(false);
    }

    // return true if every value in temp is true
    return Object.values(temp).every(x => x === true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(checkForm()) {

      if(Axios.get(`http://127.0.0.1:5000/doctors/${data.get('doctorDoctorID')}`)) {
        Axios.put(`http://127.0.0.1:5000/patients/${location.state.data.patientID}`, {
          Patient_ID: patientID,
          FirstName: data.get('firstName'),
          LastName: data.get('lastName'),
          MiddleInit: data.get('middleInit'),
          Street: data.get('street'),
          City: data.get('city'),
          State: data.get('state'),
          DOB: data.get('dateOfBirth'),
          // calculate age based on DOB
          Age: dayjs().diff(data.get('dateOfBirth'), 'year'), 
          Sex: data.get('sex'),
          Doctor_Doctor_ID: parseInt(data.get('doctorDoctorID')),
        });

        setShowSuccessMessage(true);
        setShowErrorMessage(false);

        // navigate to the doctor page
        setTimeout(() => {
          navigate('/patient', { replace: true });
        }, 2000);

      } else {
        setErrorMessage("The doctor ID you entered does not exist in the database. Please enter a valid doctor ID.")
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
      }
      
    } else {
      setErrorMessage("Please fill out all the required fields properly before submitting.")
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
        question="Remove this patient from the database?"
        message="Are you sure you want to remove this patient from the database? This action cannot be undone."/>
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Typography component="h1" variant="h5">
            Edit {patientName}'s Information
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
              <TextField margin="normal" disabled name="patientID" required defaultValue={patientID} fullWidth id="patientID" label="Patient ID" error={patientIDError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField margin="normal" name="doctorDoctorID" defaultValue={doctorDoctorID} required fullWidth id="doctorDoctorID" label="Doctor ID" error={doctorDoctorIDError}/>
              </Grid>       
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" name="firstName" required fullWidth id="firstName" defaultValue={firstName} label="First Name" error={firstNameError}/>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField margin="normal" name="middleInit" fullWidth defaultValue={middleInit} id="middleInit" label="Init"/>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" required fullWidth id="lastName" defaultValue={lastName} label="Last Name" name="lastName" error={lastNameError}/>
              </Grid>       
          </Grid>
        <TextField margin="normal" name="street" required fullWidth id="street" label="Street" defaultValue={street} error={streetError}/>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required name="city" fullWidth id="city" label="City" defaultValue={city} error={cityError}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth id="state" label="Province/Territory" name="state" defaultValue={state} error={stateError}/>
              </Grid>       
          </Grid>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth margin="normal" id="dateOfBirth" name="dateOfBirth" error={DOBError} label="Date of Birth" type="date" defaultValue={dateOfBirth} InputLabelProps={{shrink: true}}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField margin="normal" required fullWidth id="sex" label="Sex" name="sex" defaultValue={sex} error={sexError}/>
              </Grid>       
          </Grid>
          <Stack sx={{ pt: 2 }} spacing={1} direction="row" justifyContent="center">
            <Button type="submit" variant="contained">Save Changes</Button>
            <Button variant="contained" color="error" onClick={handleClickOpenAreYouSure}>Remove Patient</Button>
          </Stack>
          </Box>
          <Box textAlign='center'>
          <Button sx={{mt: 2}} variant="outlined" href="/patient" justifyContent="center" >Back</Button>
          </Box>
        </Box>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}