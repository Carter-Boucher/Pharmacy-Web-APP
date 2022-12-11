import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Axios from 'axios';

import Medications from '../data/SampleMedications.json'
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};
  
function getStyles(a, b, theme) {
    return {
        fontWeight:
        b.indexOf(a) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

export default function DoctorPrescriptionForm(props){

    const {open, handleCancel, patient, patientID, doctorID} = props;
    const [prescriptionDetails, setPrescriptionDetails] = React.useState("Please select a medication to view the manufacturer's dosage instructions.");
    const [medication, setMedication] = React.useState("");
    const [medicationError, setMedicationError] = React.useState(false);

    const [prescriptions, setPrescriptions] = React.useState([]);
    // call API to get all prescriptions
    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/prescriptions/")
            .then((res) => {
                setPrescriptions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [medications, setMedications] = React.useState([]);
    // call API to get all medications
    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/medications/")
        .then((res) => {
            setMedications(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [medicationID, setMedicationID] = React.useState("");

    const [dosageTimeError, setDosageTimeError] = React.useState(false);
    const [dosageAmountError, setDosageAmountError] = React.useState(false);
    const [refillsError, setRefillsError] = React.useState(false);

    const theme = useTheme();

    const handleChangeMedication = (event) => {
        setMedication(event.target.value);

        // // this is a temp variable, it will be replaced with an API call
        // let temp = Medications['medications'].filter((med) => med.Med_Name === event.target.value);
        // setPrescriptionDetails(temp[0].Manu_Dosage);
        // setMedicationID(temp[0].Med_ID);

        // get Med_ID and Manu_Dosage from medications variable
        let temp = medications.filter((med) => med.Med_Name === event.target.value);
        setPrescriptionDetails(temp[0].Manu_Dosage);
        setMedicationID(temp[0].Med_ID);
      };

      const checkForm = () => {
        let temp = {}
        if (medication === "") {
          temp.medication = false
          setMedicationError(true);
        } else {
          setMedicationError(false);
        }
        if(document.getElementById("dosageTime").value === ""){
            temp.dosageTime = false
            setDosageTimeError(true);
        } else {
            setDosageTimeError(false);
        }
        if(document.getElementById("dosageAmount").value === ""){
            temp.dosageAmount = false
            setDosageAmountError(true);
        } else {
            setDosageAmountError(false);
        }
        if(document.getElementById("refills").value === ""){
            temp.refills = false
            setRefillsError(true);
        } else {
            setRefillsError(false);
        }
        // return true if every value in temp is true
        return Object.values(temp).every(x => x === true);
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(checkForm()) {

            // create prescription using API
            Axios.post('http://127.0.0.1:5000/prescriptions/', {
                Doctor_Doc_ID: doctorID,
                Patient_Patient_ID: patientID,
                Medication_Med_ID: medicationID,
                // negative one means no pharmacist has been assigned
                Pharmacist_Pharmacist_ID: -1,
                // Prescription ID is length of all prescriptions + 1
                Prescription_ID: parseInt(prescriptions.length + 1),
                Date: new Date().toISOString().slice(0, 10),
                DosageTime: data.get('dosageTime'),
                DosageAmount: data.get('dosageAmount'),
                Refillable: parseInt(data.get('refills'))
            })

            setShowErrorMessage(false);
            setShowSuccessMessage(true); 

            setTimeout(() => {
                window.location.reload(false);
            }, 2000);

        } else {
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    };

    return(
        <div>
            <Dialog open={open} onClose={handleCancel}>
            <DialogTitle sx={{marginBottom: -2.5}}>Give Prescription to {patient}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <DialogContent>
                <DialogContentText>
                    Please enter the prescription details below.
                </DialogContentText>
                <FormControl margin="normal" fullWidth required helperText="" error={medicationError} id="medication-select" sx={{marginTop: 3}}>
                    <InputLabel>Medication</InputLabel>
                        <Select label="Medication" name="medication"
                            value={medication}
                            onChange={handleChangeMedication}
                            MenuProps={MenuProps}>
                            {medications.map((option) => (
                            <MenuItem key={option.Med_Name} value={option.Med_Name} style={getStyles(option.value, medication, theme)}>
                                {option.Med_Name}
                            </MenuItem>
                            ))}
                        </Select>
                    <Typography variant="subtitle1" sx={{mt: 2}}>
                        Prescription details:
                    </Typography>
                    <Typography variant="subtitle2" sx={{mt: 1, width: "100vw"}} width="100%" maxWidth="100%" midWidth="100%">
                        {prescriptionDetails}
                    </Typography>
                    <TextField margin="normal" autoFocus required name="dosageTime" id="dosageTime" label="Dosage Time" fullWidth error={dosageTimeError}/>
                    <TextField margin="normal" autoFocus required name="dosageAmount" id="dosageAmount" label="Dosage Amount" fullWidth error={dosageAmountError}/>
                    <TextField margin="normal" autoFocus required name="refills" id="refills" label="Refill Amount" fullWidth error={refillsError}/>
                </FormControl>
                {showErrorMessage && ( 
                    <Alert severity="error">Please enter all required fields before submitting.</Alert>
                )}
                {showSuccessMessage && (
                    <Alert severity="success" >Prescription successfully given to {patient}. Refreshing ... 
                    </Alert>
                )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
                </Box>
        </Dialog>
        </div>
    );
}
