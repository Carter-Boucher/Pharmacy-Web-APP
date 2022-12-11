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

import AreYouSureBox from '../../components/AreYouSureBox';

export default function Edit() {
  const location = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  const [doctorName, setDoctorName] = React.useState(() => location.state.data.fullName);
  const [doctorID, setDoctorID] = React.useState(() => location.state.data.doctorID);
  const [firstName, setFirstName] = React.useState(() => location.state.data.firstName);
  const [lastName, setLastName] = React.useState(() => location.state.data.lastName);
  const [middleInit, setMiddleInit] = React.useState(() => location.state.data.middleInit);
  const [address, setAddress] = React.useState(() => location.state.data.address);

  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showDeletingMessage, setShowDeletingMessage] = React.useState(false);

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [doctorIDError, setDoctorIDError] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpenAreYouSure = () => {
    setOpen(true);
  };

  const handleCloseAreYouSure = () => {
    setOpen(false);
  };

  const handleConfirmAreYouSure = () => {
    // remove the doctor from the database
    Axios.delete(`http://127.0.0.1:5000/doctors/${location.state.data.doctorID}`)
    setShowDeletingMessage(true);
    setTimeout(() => {
      navigate('/doctor', { replace: true });
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
      // update the doctor using Axios.put
      // @app.put("/doctors/{doctor_id}", response_model=schemas.Doctor)
      // def update_doctor(doctor_id: int, doctor: schemas.Doctor, db: Session = Depends(get_db)):
      //     db_doctor = crud.get_doctor(db, doctor_id)
      //     if db_doctor is None:
      //         raise HTTPException(status_code=404, detail="Doctor not found")
      //     return crud.update_doctor(db=db, doctor_id=doctor_id, doctor=doctor)
      Axios.put(`http://127.0.0.1:5000/doctors/${location.state.data.doctorID}`, {
        Doctor_ID: location.state.data.doctorID,
        FirstName: data.get('firstName'),
        MiddleInit: data.get('middleInit'),
        LastName: data.get('lastName'),
        OfficeAddress: data.get('address'),
      });

      setShowSuccessMessage(true);
      setShowErrorMessage(false);

      // navigate to the doctor page
      setTimeout(() => {
        navigate('/doctor', { replace: true });
      }, 2000);
      
    } else {
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
        question="Remove this doctor from the database?"
        message="Are you sure you want to remove this doctor from the database? This action cannot be undone."/>
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Typography component="h1" variant="h5">
            Edit {doctorName}'s Information
          </Typography>
          {showErrorMessage && ( 
          <Alert severity="error" sx={{marginTop: 2, width:'100%'}}>Please fill out all the required fields before submitting.</Alert>
          )}         
          {showSuccessMessage && ( 
          <Alert severity="success" sx={{marginTop: 2, width:'100%'}}>Successfully added the doctor to the database! Redirecting to main doctor page ...</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField disabled margin="normal" name="doctorID" required fullWidth id="doctorID" label="Doctor ID" defaultValue={doctorID} error={doctorIDError}/>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" name="firstName" required fullWidth id="firstName" label="First Name" defaultValue={firstName} error={firstNameError}/>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField margin="normal" name="middleInit" fullWidth id="middleInit" defaultValue={middleInit} label="Init"/>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField margin="normal" required fullWidth id="lastName" label="Last Name" defaultValue={lastName} name="lastName"error={lastNameError}/>
              </Grid>       
          </Grid>
          <TextField margin="normal" required fullWidth name="address" label="Office Address" defaultValue={address} id="address" error={addressError}/>
          <Stack sx={{ pt: 2 }} spacing={1} direction="row" justifyContent="center">
            <Button type="submit" variant="contained">Save Changes</Button>
            <Button variant="contained" color="error" onClick={handleClickOpenAreYouSure}>Remove Doctor</Button>
          </Stack>
          </Box>

          <Box textAlign='center'>
          <Button sx={{mt: 2}} variant="outlined" href="/doctor" justifyContent="center" >Back</Button>
          </Box>
        </Box>
        </Grid>
      </Container>
    </ThemeProvider>
    );
}