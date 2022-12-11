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

const columns = [
  { 
  field: 'pharmacistID', 
  headerName: 'Pharmacist ID', 
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
    field: 'pharmacistPharmacyID',
    headerName: 'Pharmacy ID',
    width: 150,
    sortable: false,
    editable: false,
  }
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
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [pharmacists, setPharmacists] = React.useState({
      id: '',
      pharmacistID: '',
      firstName: '',
      middleInit: '',
      lastName: '',
      pharmacistPharmacyID: '',
    });

    const [data, setData] = React.useState({
      pharmacistID: '',
      firstName: '',
      middleInit: '',
      lastName: '',
      pharmacistPharmacyID: '',
      fullName: '',
    });

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/pharmacists/pharmacy/" + location.state.data.pharmID)
            .then((res) => {
              setPharmacists(res.data.map((pharmacist, index) => {
              return {
                id: index,
                pharmacistID: pharmacist.Pharmacist_ID,
                firstName: pharmacist.FirstName,
                middleInit: pharmacist.MiddleInit,
                lastName: pharmacist.LastName,
                pharmacistPharmacyID: pharmacist.Pharmacist_Pharmacy_ID,
              }
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    const handleEditSelectedButton = () => {
        if(selected){
          navigate('/pharmacy/pharmacist/edit', {state: { data, originalData: location.state.data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleAddButton = () => {
      console.log('here')
        navigate('/pharmacy/pharmacist/add', {state: { data: location.state.data }});
    };

    const handleViewSelectedButton = () => {
        if(selected){
          // navigate to the view page with data
          navigate('/pharmacy/pharmacist/view', {state: { data, originalData: location.state.data}});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleRowSelected = (newSelection) => {
      let fullName = newSelection.row.firstName + " " + (newSelection.row.middleInit ? newSelection.row.middleInit + '.' : '') + " " + newSelection.row.lastName;

      setData({
        pharmacistID: newSelection.row.pharmacistID,
        firstName: newSelection.row.firstName,
        middleInit: newSelection.row.middleInit,
        lastName: newSelection.row.lastName,
        pharmacistPharmacyID: newSelection.row.pharmacistPharmacyID,
        fullName: fullName,
      });
      setSelected(true)

   }

    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <Typography variant="h4" align="left-center" color="text.primary">
        List of All Pharmacists
    </Typography>
    <Typography variant="h6" align="left-center" color="text.primary" sx={{mb: 2}}>
        Working for the {location.state.data.name} in {location.state.data.city}, {location.state.data.state}
    </Typography>
    <div style={{ height: 400, width: '50%' }}>
        <DataGrid 
        rows={pharmacists}
        columns={columns} 
        pagination 
        pageSize={5} 
        disableColumnFilter={true}
        onRowClick={handleRowSelected}
        components={{ Toolbar: QuickSearchToolbar }} />
    </div>
    {showErrorMessage && ( 
            <Alert severity="error" fullWidth sx={{marginTop: 2}}>No pharmacy selected, please select a pharmacy to edit/view.</Alert>
    )}
    <Stack sx={{ pt: 2 }} direction="row" spacing={1} justifyContent="space-around">
        <Button variant="contained" onClick={handleAddButton}>Add Pharmacist</Button>
        <Button onClick={handleViewSelectedButton} variant="contained">View Selected Pharmacist</Button>
        <Button onClick={handleEditSelectedButton} variant="contained">Edit Selected Pharmacist</Button>
        <Button variant="outlined" href="/pharmacy" justifyContent="center" >Back</Button>
    </Stack>
    </Grid>
    );
}