import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';

import DoctorPrescriptionForm from '../../components/DoctorPrescriptionForm';

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

export default function View(props) {
    const location = useLocation();

    const [selected, setSelected] = React.useState(false);
    const [selectedDoctor, setSelectedDoctor] = React.useState(() => location.state.data.fullName);
    const [selectedPatient, setSelectedPatient] = React.useState('Placeholder');
    const [selectedPatientID, setSelectedPatientID] = React.useState('Placeholder');

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [patients, setPatients] = React.useState({
        id: '',
        patientID: 1,
        firstName: '',
        middleInit: '',
        lastName: '',
        sex: '',
        age: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        doctorDoctorID: 1,
    });

    React.useEffect(() => {
        Axios.get(`http://127.0.0.1:5000/patients/doctor/${location.state.data.doctorID}`)
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

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleEditSelectedButton = () => {
        if(selected){
            setShowErrorMessage(false);
            handleClickOpen();
        } else {
            setOpen(false);
            setShowErrorMessage(true);
        }
    };

    const handleRowSelected = (newSelection) => {
        const fullName = `${newSelection.row.firstName} ${newSelection.row.middleInit? newSelection.row.middleInit + '.' :''} ${newSelection.row.lastName}`;
        setSelectedPatient(fullName);
        setSelectedPatientID(newSelection.row.patientID);
        setSelected(true)
    }

    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <DoctorPrescriptionForm 
    open={open} 
    patient={selectedPatient}
    handleCancel={handleClose}
    handleSave={handleClose}
    doctorID={location.state.data.doctorID}
    patientID={selectedPatientID}
    />
    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        {selectedDoctor}'s Patients
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
        <Alert severity="error" fullWidth sx={{marginTop: 2}}>No patient selected, please select a patient to give a prescription for.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button onClick={handleEditSelectedButton} variant="contained">Give Prescription To Patient</Button>
        <Button variant="outlined" href="/doctor" >Back</Button>
    </Stack>
    </Grid>
    );
}