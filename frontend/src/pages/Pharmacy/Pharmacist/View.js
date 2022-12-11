import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import PharmacistPresctiptionForm from '../../../components/PharmacistPrescriptionForm';

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
        headerName: 'First Name',
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
        headerName: 'Last Name',
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
    const location = useLocation();

    const [selected, setSelected] = React.useState(false);
    const [open, setOpen] = React.useState(false);
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

    const [selectedPatientPrescriptionData, setSelectedPatientPrescriptionData] = React.useState([]);
    const [medicationsInfo, setMedicationsInfo] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/patients/pharmacist/" + location.state.data.pharmacistID)
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

    // get all the medications 
    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/medications")
            .then((res) => {
                setMedicationsInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        if(selected){
            // api call to find the prescriptions of the selected patient given patient ID and pharmacistID
            Axios.get(`http://127.0.0.1:5000/prescriptions/patient/${data.patientID}`)
                .then((res) => {
                    // match the medication name with the medication ID using the medicationsInfo
                    // and add it to the selectedPatientPrescriptionData
                    // only if the pharmacist ID matches the pharmacist ID of the prescription
                    setSelectedPatientPrescriptionData(res.data.filter((prescription) => prescription.Pharmacist_Pharmacist_ID === location.state.data.pharmacistID).map((prescription, index) => {
                        const medicationName = medicationsInfo.find((medication) => medication.Med_ID === prescription.Medication_Med_ID).Med_Name;
                        console.log(prescription.Doctor_Doc_ID)
                        return {
                            Doctor_Doc_ID: prescription.Doctor_Doc_ID,
                            Patient_Patient_ID: prescription.Patient_Patient_ID,
                            Medication_Med_ID: prescription.Medication_Med_ID,
                            Pharmacist_Pharmacist_ID: prescription.Pharmacist_Pharmacist_ID,
                            Prescription_ID: prescription.Prescription_ID,
                            MedicationName: medicationName,
                            Date: prescription.Date,
                            DosageTime: prescription.DosageTime,
                            DosageAmount: prescription.DosageAmount,
                            Refillable: prescription.Refillable,
                        }
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [selected]);

    const handleBackButton = () => {
        navigate('/pharmacy/pharmacist', {state: {data: location.state.originalData}});
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
   }

    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <PharmacistPresctiptionForm 
        open={open} 
        handleCancel={handleClose}
        fullName={data.fullName}
        medicationsInfo={medicationsInfo}
        prescriptions={selectedPatientPrescriptionData}
    />
    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        {location.state.data.fullName}'s Patients
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
            <Alert severity="error" fullWidth sx={{marginTop: 2}}>No patient selected, please select a patient to manage their prescription.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button variant="contained" onClick={handleEditSelectedButton}>Manage Selected Patient's Prescription</Button>
        <Button variant="outlined" onClick={handleBackButton} justifyContent="center" >Back</Button>
    </Stack>
    </Grid>
    );
}