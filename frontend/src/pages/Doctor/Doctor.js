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
    { field: 'doctorID', 
    headerName: 'Doctor ID', 
    width: 125,
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
      field: 'officeAddress',
      headerName: 'Office Address',
      width: 150,
      sortable: false,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.middleInit || ''} ${params.row.lastName || ''}`,
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

export default function Doctor() {
    const navigate = useNavigate();

    const [selected, setSelected] = React.useState(false);
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [doctors, setDoctors] = React.useState({
      id: '',
      doctorID: 1,
      firstName: '',
      middleInit: '',
      lastName: '',
      fullName: '',
      officeAddress: '',
    });

    const [data, setData] = React.useState({
      doctorID: 1,
      firstName: '',
      middleInit: '',
      lastName: '',
      fullName: 'John A Doe',
      address: '123 Main St',
    });

    React.useEffect(() => {
      Axios.get('http://127.0.0.1:5000/doctors/')
        .then((res) => {
          setDoctors(res.data.map((doctor, index) => {
            return {
              id: index,
              doctorID: doctor.Doctor_ID,
              firstName: doctor.FirstName,
              middleInit: doctor.MiddleInit,
              lastName: doctor.LastName,
              fullName: `${doctor.FirstName} ${doctor.MiddleInit || ''} ${doctor.LastName}`,
              officeAddress: doctor.OfficeAddress,
            }
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const handleEditSelectedButton = () => {
        if(selected){
          navigate('/doctor/edit', {state: { data }});
        } else {
            setShowErrorMessage(true);
        }
    };

    const handleViewSelectedButton = () => {
        if(selected){
          // navigate to the view page with data
          navigate('/doctor/view', {state: { data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleRowSelected = (newSelection) => {
      // create fullName, if middleInit is null then middleInit = ''
      const fullName = `${newSelection.row.firstName} ${newSelection.row.middleInit? newSelection.row.middleInit + '.' :''} ${newSelection.row.lastName}`;
      const doctorID = newSelection.row.doctorID;

      setData({
        doctorID: doctorID,
        firstName: newSelection.row.firstName,
        middleInit: newSelection.row.middleInit,
        lastName: newSelection.row.lastName,
        address: newSelection.row.officeAddress,
        fullName: fullName,
      });

      setSelected(true)

      // setPatientID(newSelection.row.patientID);
   }


    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        List of All Doctors
    </Typography>
    <div style={{ height: 400, width: '50%' }}>
        <DataGrid 
        rows={doctors}
        columns={columns} 
        pagination 
        pageSize={5} 
        disableColumnFilter={true}
        onRowClick={handleRowSelected}
        components={{ Toolbar: QuickSearchToolbar }} />
    </div>
    {showErrorMessage && ( 
            <Alert severity="error" fullWidth sx={{marginTop: 2}}>No doctor selected, please select a doctor to edit/view.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button variant="contained" href="/doctor/add">Add Doctor</Button>
        <Button onClick={handleViewSelectedButton} variant="contained">View Selected Doctor</Button>
        <Button onClick={handleEditSelectedButton} variant="contained">Edit Selected Doctor</Button>
        <Button variant="outlined" href="/" justifyContent="center" >Main Menu</Button>
    </Stack>
    </Grid>
    );
}