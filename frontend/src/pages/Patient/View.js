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

import PatientPrescriptionForm from '../../components/PatientPrescriptionForm';

const columns = [
    {
        field: 'medicationMedID',
        headerName: 'Medication ID',
        width: 150,
        sortable: false,
        editable: false,
    },
    { 
        field: 'doctorDoctorID',
        headerName: 'Doctor ID',
        width: 125,
        sortable: false,
        editable: false,
    },
    {
        field: 'patientPatientID',
        headerName: 'Patient ID',
        width: 110,
        sortable: false,
        editable: false,
    },
    {
        field: 'pharmacistPharmacistID',
        headerName: 'Pharmacist ID',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'prescriptionID',
        headerName: 'Prescription ID',  
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'prescriptionDate',
        headerName: 'Prescription Date',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'dosageTime',
        headerName: 'Dosage Time',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'dosageAmount',
        headerName: 'Dosage Amount',
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: 'refillable',
        headerName: 'Refills',
        width: 100,
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

    const [selectedPatient, setSelectedPatient] = React.useState(() => location.state.data.fullName);
    const [patientID, setPatientID] = React.useState(() => location.state.data.patientID);
    const [allMedications, setAllMedications] = React.useState([]);
    // might be location.state.allMedications

    // get api to get all medications
    React.useEffect(() => {
        Axios.get('http://127.0.0.1:5000/medications')
        .then((response) => {
            setAllMedications(response.data);
        });
    }, []);

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(false);

    const [pharmacies, setPharmacies] = React.useState([]);

    const [selectedPrescription, setSelectedPrescription] = React.useState({
        doctorDoctorID: 0,
        patientPatientID: 0,
        medicationMedID: 0,
        pharmacistPharmacistID: 0,
        prescriptionID: 0,
        prescriptionDate: '',
        dosageTime: '',
        dosageAmount: '',
        refillable: 0,
        medicationName: '',
    });

    const [prescription, setPrescriptions] = React.useState({
        id: 0,
        doctorDoctorID: 0,
        patientPatientID: 0,
        medicationMedID: 0,
        pharmacistPharmacistID: 0,
        prescriptionID: 0,
        prescriptionDate: '',
        dosageTime: '',
        dosageAmount: '',
        refillable: 0,
    });

    React.useEffect(() => {
        Axios.get(`http://127.0.0.1:5000/prescriptions/patient/${patientID}`)
            .then((res) => {
            setPrescriptions(res.data.map((prescription, index) => {
              return {
                id: index,
                doctorDoctorID: prescription.Doctor_Doc_ID,
                patientPatientID: prescription.Patient_Patient_ID,
                medicationMedID: prescription.Medication_Med_ID,
                pharmacistPharmacistID: prescription.Pharmacist_Pharmacist_ID,
                prescriptionID: prescription.Prescription_ID,
                prescriptionDate: prescription.Date,
                dosageTime: prescription.DosageTime,
                dosageAmount: prescription.DosageAmount,
                refillable: prescription.Refillable,
              }
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    const handleSetPatient = () => {
        setSelected(true);
    }

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

    // const debugFunction = () => {
    //     console.log(selectedPrescription.doctorDoctorID);
    // }

    const handleRowSelected = (newSelection) => {

        // find medicationName in allMedications by medicationMedID
        let medicationName = "";
        allMedications.forEach((medication) => {
            if(medication.Med_ID === newSelection.row.medicationMedID){
                medicationName = medication.Med_Name;
            }
        });
        
        setSelectedPrescription({
            doctorDoctorID: newSelection.row.doctorDoctorID,
            patientPatientID: newSelection.row.patientPatientID,
            medicationMedID: newSelection.row.medicationMedID,
            pharmacistPharmacistID: newSelection.row.pharmacistPharmacistID,
            prescriptionID: newSelection.row.prescriptionID,
            prescriptionDate: newSelection.row.prescriptionDate,
            dosageTime: newSelection.row.dosageTime,
            dosageAmount: newSelection.row.dosageAmount,
            refillable: newSelection.row.refillable,
            medicationName: medicationName,
        })

        setSelected(true);

        Axios.get(`http://127.0.0.1:5000/pharmacies/medication/${newSelection.row.medicationMedID}`)
        .then((res) => {
            setPharmacies(res.data);
        })        
    }
    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <PatientPrescriptionForm 
        open={open} 
        handleCancel={handleClose}
        pharmacies={pharmacies}
        handleSetPatient={handleSetPatient}
        prescriptionData={selectedPrescription}
    />

    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        {selectedPatient}'s Prescriptions
    </Typography>
    <div style={{ height: 400, width: '50%' }}>
        <DataGrid 
        rows={prescription}
        columns={columns} 
        pagination 
        pageSize={5} 
        disableColumnFilter={true}
        onRowClick={handleRowSelected}
        components={{ Toolbar: QuickSearchToolbar }} />
    </div>
    {showErrorMessage && ( 
        <Alert severity="error" fullWidth sx={{marginTop: 2}}>No prescription selected, please select a prescription to manage.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button onClick={handleEditSelectedButton} variant="contained">Manage Prescription</Button>
        <Button variant="outlined" href="/patient">Back</Button>
    </Stack>
    </Grid>
    );
}