import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'patientID',
    headerName: 'Patient ID',
    width: 125,
    sortable: false,
    editable: false,
    },
    {
        field: 'doctorDoctorID',
        headerName: 'Doctor ID',
        width: 110,
        sortable: false,
        editable: false,
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'middleInit',
        headerName: 'Middle Initial',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'sex',
        headerName: 'Sex',
        width: 50,
        sortable: false,
        editable: false,
    },
    {
        field: 'age',
        headerName: 'Age',
        width: 50,
        sortable: false,
        editable: false,
    },
    {
        field: 'dateOfBirth',
        headerName: 'DOB',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'street',
        headerName: 'Street',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'state',
        headerName: 'Province/Territory',
        width: 150,
        sortable: false,
        editable: false,
    },
];

function QuickSearchToolbar() {
    return (
      <Box
        sx={{p: 2, pb: 0,}}>
        <GridToolbarQuickFilter />
      </Box>
    );
}

export default function Patient() {
    const navigate = useNavigate();

    const [selected, setSelected] = React.useState(false);
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [patients, setPatients] = React.useState({
        id: '',
        patientID: 0,
        firstName: '',
        middleInit: '',
        lastName: '',
        sex: '',
        age: 0,
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        doctorDoctorID: 0,
    });

    const [data, setData] = React.useState({
        patientID: 1,
        firstName: '',
        middleInit: '',
        lastName: '',
        fullName: '',
        sex: 0,
        age: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        doctorDoctorID: 0,
    });

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/patients")
            .then((res) => {
            setPatients(res.data.map((patient, index) => {
              return {
                id: index,
                patientID: patient.Patient_ID,
                firstName: patient.FirstName,
                middleInit: patient.MiddleInit,
                lastName: patient.LastName,
                fullName: `${patient.FirstName} ${patient.MiddleInit || ''} ${patient.LastName}`,
                sex: patient.Sex,
                age: patient.Age,
                dateOfBirth: patient.DOB,
                street: patient.Street,
                city: patient.City,
                state: patient.State,
                doctorDoctorID: patient.Doctor_Doctor_ID,
              }
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    const handleEditSelectedButton = () => {
        if(selected){
          navigate('/patient/edit', {state: { data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleViewSelectedButton = () => {
        if(selected){
          // navigate to the view page with data
          navigate('/patient/view', {state: { data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleRowSelected = (newSelection) => {
      // create fullName, if middleInit is null then middleInit = ''
      const fullName = `${newSelection.row.firstName} ${newSelection.row.middleInit? newSelection.row.middleInit + '.' :''} ${newSelection.row.lastName}`;

      setData({
        doctorDoctorID: newSelection.row.doctorDoctorID,
        firstName: newSelection.row.firstName,
        middleInit: newSelection.row.middleInit,
        lastName: newSelection.row.lastName,
        fullName: fullName,
        sex: newSelection.row.sex,
        age: newSelection.row.age,
        dateOfBirth: newSelection.row.dateOfBirth,
        street: newSelection.row.street,
        city: newSelection.row.city,
        state: newSelection.row.state,
        patientID: newSelection.row.patientID,
      });

      setSelected(true)

      // setPatientID(newSelection.row.patientID);
   }


    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        List of All Patients
    </Typography>
    <div style={{ height: 400, width: '50%' }}>
        <DataGrid 
        rows={patients}
        columns={columns} 
        pagination 
        pageSize={5} 
        disableColumnFilter={true}
        onRowClick={handleRowSelected}
        components={{ Toolbar: QuickSearchToolbar }} />
    </div>
    {showErrorMessage && ( 
            <Alert severity="error" fullWidth sx={{marginTop: 2}}>No patient selected, please select a patient to edit/view.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button variant="contained" href="/patient/add">Add Patient</Button>
        <Button onClick={handleViewSelectedButton} variant="contained">View Selected Patient</Button>
        <Button onClick={handleEditSelectedButton} variant="contained">Edit Selected Patient</Button>
        <Button variant="outlined" href="/" justifyContent="center" >Main Menu</Button>
    </Stack>
    </Grid>
    );
}