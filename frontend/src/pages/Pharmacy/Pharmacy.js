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
  { 
  field: 'pharmID', 
  headerName: 'Pharmacy ID', 
  width: 125,
  sortable: false,
  editable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
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
  {
    field: 'country',
    headerName: 'Country',
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

    const [selected, setSelected] = React.useState(false);
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const [pharmacies, setPharmacies] = React.useState({
      id: '',
      name: '',
      city: '',
      state: '',
      country: '',
    });

    const [data, setData] = React.useState({
      id: '',
      name: '',
      city: '',
      state: '',
      country: '',
    });

    React.useEffect(() => {
        Axios.get("http://127.0.0.1:5000/pharmacies")
            .then((res) => {
              setPharmacies(res.data.map((pharmacy, index) => {
              return {
                id: index,
                pharmID: pharmacy.Pharm_ID,
                name: pharmacy.Name,
                city: pharmacy.City,
                state: pharmacy.State,
                country: pharmacy.Country,
              }
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    const handleEditSelectedButton = () => {
        if(selected){
          navigate('/pharmacy/edit', {state: { data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleViewSelectedButton = () => {
        if(selected){
          // navigate to the view page with data
          navigate('/pharmacy/pharmacist', {state: { data }});
        } else {
          setShowErrorMessage(true);
        }
    };

    const handleRowSelected = (newSelection) => {

      setData({
        pharmID: newSelection.row.pharmID,
        name: newSelection.row.name,
        city: newSelection.row.city,
        state: newSelection.row.state,
        country: newSelection.row.country,
      });

      setSelected(true)

   }


    return (
    <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
    <Typography variant="h4" align="left-center" color="text.primary" gutterBottom>
        List of All Pharmacies
    </Typography>
    <div style={{ height: 400, width: '50%' }}>
        <DataGrid 
        rows={pharmacies}
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
        <Button variant="contained" href="/pharmacy/add">Add Pharmacy</Button>
        <Button onClick={handleViewSelectedButton} variant="contained">View Selected Pharmacy</Button>
        <Button onClick={handleEditSelectedButton} variant="contained">Edit Selected Pharmacy</Button>
        <Button variant="outlined" href="/" justifyContent="center" >Main Menu</Button>
    </Stack>
    </Grid>
    );
}