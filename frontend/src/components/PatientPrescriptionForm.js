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

    const {open, handleCancel, prescriptionData, pharmacies} = props;

    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [pharmacyMessage, setPharmacyMessage] = React.useState("");

    const [selectedPharmacyName, setSelectedPharmacyName] = React.useState("");
    const [selectedPharmacistName, setSelectedPharmacistName] = React.useState("");
    const [modifiedPharmacists, setModifiedPharmacists] = React.useState([{
        Pharmacist_ID: 0,
        Pharmacist_Name: "",
        Pharmacist_Pharmacy_ID: 0
    }]);

    const [selectedPharmacistID, setSelectedPharmacistID] = React.useState(0);

    const [selectedPharmacyID, setSelectedPharmacyID] = React.useState(0);
    const [isPharmacySelected, setIsPharmacySelected] = React.useState(false);

    const [pharmacyName, setPharmacyName] = React.useState("");
    const [pharmacistName, setPharmacistName] = React.useState("");

    React.useEffect(() => {
        if (prescriptionData.pharmacistPharmacistID != -1){

            Axios.get(`http://127.0.0.1:5000/pharmacists/` + prescriptionData.pharmacistPharmacistID)
            .then((response) => {
                console.log(response.data.Pharmacist_Pharmacy_ID)
                setPharmacistName(response.data.FirstName + ' ' + (response.data.MiddleInit ? response.data.MiddleInit + '.' + ' ': '' ) + response.data.LastName)

                // get pharmacy name from pharmacistPharmacyID
                Axios.get(`http://127.0.0.1:5000/pharmacies/` + response.data.Pharmacist_Pharmacy_ID)
                    .then((response) => {
                console.log(response.data.Name)
                setPharmacyName(response.data.Name)
                })
            })
        } else {
            setPharmacyName("");
            setPharmacistName("");
        }
    }, [prescriptionData])

    React.useEffect(() => {
        if(pharmacyName == ""){
            setPharmacyMessage(`Currently not assigned to any pharmacy.`);
        } else {
            setPharmacyMessage(`Pickup from ${pharmacyName}, managed by ${pharmacistName}`);
        }
    }, [pharmacyName, pharmacistName])

    React.useEffect(() => {
        console.log(selectedPharmacyID);
        console.log(selectedPharmacyName);

        Axios.get(`http://127.0.0.1:5000/pharmacists/pharmacy/${selectedPharmacyID}`)
        .then((response) => {
            // set modified pharmacists for each pharmacist in the response
            setModifiedPharmacists(response.data.map((pharmacist) => {
                let fullName = pharmacist.FirstName + ' ' + (pharmacist.MiddleInit ? pharmacist.MiddleInit + '.' + ' ': '' ) + pharmacist.LastName
                return {
                    pharmacistID: pharmacist.Pharmacist_ID,
                    fullName: fullName,
                    pharmacistPharmacyID: pharmacist.Pharmacist_Pharmacy_ID
                }
            }));
        })

    }, [selectedPharmacyID, selectedPharmacyName])

    const [pharmacistError, setPharmacistError] = React.useState(false);
    const [pharmacyError, setPharmacyError] = React.useState(false);

    const theme = useTheme();

    const handleChangePharmacy = (event) => {
        setSelectedPharmacyID(pharmacies.find(pharmacy => pharmacy.Name === event.target.value).Pharm_ID);
        setSelectedPharmacyName(event.target.value);

        setSelectedPharmacistName('');
        setIsPharmacySelected(true);
      };
    
    const handleChangePharmacist = (event) => {
        setSelectedPharmacistName(event.target.value);
        setSelectedPharmacistID(modifiedPharmacists.find(pharmacist => pharmacist.fullName === event.target.value).pharmacistID);
    };

    // const debugFunction = () => {
    //     console.log(pharmacyName);
    //     console.log(pharmacistName);
    // }

      const checkForm = () => {
        let temp = {}
        // check if pharmacist is selected
        if (selectedPharmacistName === '') {
            temp.pharmacistError = false;
            setPharmacistError(true);
        } else {
            setPharmacistError(false)
        }
        // check if pharmacy is selected
        if (selectedPharmacyName === '') {
            temp.pharmacyError = false;
            setPharmacyError(true);
        } else {
            setPharmacyError(false)
        }

        // return true if every value in temp is true
        return Object.values(temp).every(x => x === true);
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(checkForm()) {
        
            // create prescription using API
            Axios.put(`http://127.0.0.1:5000/prescriptions/${prescriptionData.prescriptionID}`, {
                Doctor_Doc_ID: prescriptionData.doctorDoctorID,
                Patient_Patient_ID: prescriptionData.patientPatientID,
                Medication_Med_ID: prescriptionData.medicationMedID,
                Pharmacist_Pharmacist_ID: selectedPharmacistID,
                Prescription_ID: prescriptionData.prescriptionID,
                Date: prescriptionData.prescriptionDate,
                DosageTime: prescriptionData.dosageTime,
                DosageAmount: prescriptionData.dosageAmount,
                Refillable: prescriptionData.refillable,
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
            <DialogTitle sx={{marginBottom: -2.5}}>Manage your Prescription of {prescriptionData.medicationName}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <DialogContent>
                    <DialogContentText sx={{mt: -1, mb: 1}}>
                        This prescription for {prescriptionData.medicationName} was created on {prescriptionData.prescriptionDate}.
                    </DialogContentText>
                <Typography variant="subtitle1" sx={{mt: 1, width: "100vw"}} width="100%" maxWidth="100%" midWidth="100%" margin="normal">
                        Prescription Information:
                </Typography>
                <Typography margin="normal" variant="subtitle2">
                    {pharmacyMessage}
                </Typography>
                <Typography margin="normal" variant="subtitle2">
                        <strong>Dosage Amount:</strong> {prescriptionData.dosageAmount}
                </Typography>
                <Typography margin="normal" variant="subtitle2">
                        <strong>Dosage Time:</strong> {prescriptionData.dosageTime}  
                </Typography>
                <Typography margin="normal" variant="subtitle2">
                        <strong>Refills:</strong> {prescriptionData.refillable}  
                </Typography>

                <FormControl margin="normal" fullWidth required helperText="" error={pharmacyError} id="pharmacy-select" sx={{marginTop: 3}}>
                    <InputLabel>Pharmacy</InputLabel>
                        <Select label="Pharmacy" 
                        name="pharmacy"
                            value={selectedPharmacyName}
                            onChange={handleChangePharmacy}
                            MenuProps={MenuProps}>
                            {pharmacies.map((option) => (
                            <MenuItem key={option.Name} value={option.Name} style={getStyles(option.value, selectedPharmacyName, theme)}>
                                {option.Name}
                            </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                {isPharmacySelected && (
                    <FormControl margin="normal" fullWidth required helperText="" error={pharmacistError} name="pharmacist-select" id="pharmacist-select" sx={{marginTop: 3}}>
                        <InputLabel>Pharmacist</InputLabel>
                            <Select label="Pharmacist" 
                                    name="pharmacist"
                                    value={selectedPharmacistName}
                                    onChange={handleChangePharmacist}
                                    MenuProps={MenuProps}>
                                    {modifiedPharmacists.map((option) => (
                                    <MenuItem key={option.fullName} value={option.fullName} style={getStyles(option.value, selectedPharmacistName, theme)}>
                                            {option.fullName}
                                    </MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                   )}
                {showErrorMessage && ( 
                    <Alert severity="error">Please enter all required fields before submitting.</Alert>
                )}
                {showSuccessMessage && (
                    <Alert severity="success">Successfully selected a pharmacist. Refreshing ... 
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
