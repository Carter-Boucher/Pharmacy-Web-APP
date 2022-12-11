import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Home() {
  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
          <Box sx={{bgcolor: 'background.paper'}}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                Canada Pharmaceuticals 
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" paragraph>
                Built using React.js, FastAPI, SQLite, and Material UI.
              </Typography>
              <Alert severity="warning" sx={{marginBottom: 2}}>
                You are in admin mode. Select which functionality you would like to use.
              </Alert>
              <Stack sx={{ pt: 1 }} direction="row" spacing={1} justifyContent="center">
                <Button variant="contained" href="/patient">Patient</Button>
                <Button variant="contained" href="/doctor">Doctor</Button>
                <Button variant="contained" href="/pharmacy">Pharmacy</Button>
              </Stack>
            </Container>
          </Box>
        </Grid>
    </ThemeProvider>
  );
}

export default Home;