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
import Grid from '@mui/material/Grid';

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

    const {open, handleCancel, prescriptions, fullName} = props;

    const [isPrescriptionSelected, setIsPrescriptionSelected] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [selectedMedicationName, setSelectedMedicationName] = React.useState("");
    const [prescriptionID, setPrescriptionID] = React.useState("");
    const [medicationDosageTime, setMedicationDosageTime] = React.useState("");
    const [medicationDosageAmount, setMedicationDosageAmount] = React.useState("");
    const [refillable, setRefillable] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    const theme = useTheme();

    const handleChangeMedication = (event) => {
        // find the medication dosage from the medication name
        // get prescriptionID from event.target.value which is formatted like (MedicationName) - (prescriptionID)
        setPrescriptionID(event.target.value.split(" - ")[1]);
        setSelectedMedicationName(event.target.value);
        setIsPrescriptionSelected(true);
      };

    React.useEffect(() => {
        if(prescriptionID != ""){
            // get DosageTime, DosageAmount, Refillable from prescriptionID from prescriptions
            let prescription = prescriptions.find((prescription) => prescription.Prescription_ID == prescriptionID);
            setMedicationDosageTime(prescription.DosageTime);
            setMedicationDosageAmount(prescription.DosageAmount);
            setRefillable(prescription.Refillable);
        }
    }, [prescriptionID])


    // const debugFunction = () => {
    //     console.log(pharmacyName);
    //     console.log(pharmacistName);
    // }

    
    const handleDispense = () => {
        if(refillable > 0){
            let prescription = prescriptions.find((prescription) => prescription.Prescription_ID == prescriptionID);
            // update prescription refillable to refillable - 1
            Axios.put(`http://127.0.0.1:5000/prescriptions/${prescriptionID}`, {
                Date: prescription.Date,
                Doctor_Doctor_ID: prescription.Doctor_Doc_ID,
                DosageAmount: prescription.DosageAmount,
                DosageTime: prescription.DosageTime,
                Medication_Med_ID: prescription.Medication_Med_ID,
                Patient_Patient_ID: prescription.Patient_Patient_ID,
                Pharmacist_Pharmacist_ID: prescription.Pharmacist_Pharmacist_ID,
                Prescription_ID: prescription.Prescription_ID,
                Refillable: prescription.Refillable - 1,
            })

            setSuccessMessage("Successfully dispensed the prescription. The prescription has been updated to have " + (prescription.Refillable - 1) + " refills left.")
            setShowSuccessMessage(true); 
    
            setTimeout(() => {
                window.location.reload(false);
            }, 2000);

        } else {
            // remove prescription from prescriptions
            Axios.delete(`http://127.0.0.1:5000/prescriptions/${prescriptionID}`)
            setSuccessMessage("Successfully dispensed the prescription. Additionally, since there are no refills left, the prescription has been removed from the database.")
            setShowSuccessMessage(true);

            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        }
    };

    return(
        <div>
            <Dialog open={open} onClose={handleCancel}>
            <DialogTitle sx={{marginBottom: -2.5}}>Manage {fullName}'s Prescriptions</DialogTitle>
            <Box>
                <DialogContent>
                    <DialogContentText sx={{mb: -1, mt: -1, width: "100vw"}} width="100%" maxWidth="100%" midWidth="100%" margin="normal">
                        Select one of {fullName}'s prescriptions to manage.
                    </DialogContentText>
                <FormControl margin="normal" fullWidth required helperText="" id="pharmacy-select" sx={{marginTop: 3}}>
                    <InputLabel>Prescription</InputLabel>
                        <Select label="Prescription" 
                        name="Prescription"
                            value={selectedMedicationName}
                            onChange={handleChangeMedication}
                            MenuProps={MenuProps}>
                            {prescriptions.map((option) => (
                            <MenuItem key={option.MedicationName + ' - ' + option.Prescription_ID} value={option.MedicationName + ' - ' + option.Prescription_ID} style={getStyles(option.value, selectedMedicationName, theme)}>
                                {option.MedicationName + ' - ' + option.Prescription_ID}
                            </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                {isPrescriptionSelected && (
                <div>
                    <Typography variant="subtitle1">
                            Prescription Information:
                    </Typography>
                    <Typography margin="normal" variant="subtitle2">
                            <strong>Dosage Amount:</strong> {medicationDosageAmount}
                    </Typography>
                    <Typography margin="normal" variant="subtitle2">
                            <strong>Dosage Time:</strong> {medicationDosageTime}  
                    </Typography>
                    <Typography margin="normal" variant="subtitle2">
                            <strong>Refills:</strong> {refillable}  
                    </Typography>
                </div>
                )}
                {showSuccessMessage && (
                    <Alert sx={{mt: 1}} severity="success">{successMessage}
                    </Alert>
                )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    {isPrescriptionSelected && (
                    <Button onClick={handleDispense} >Dispense</Button>
                    )}
                </DialogActions>
                </Box>
        </Dialog>
        </div>
    );
}
