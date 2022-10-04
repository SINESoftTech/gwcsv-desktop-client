import React from 'react';
import {
  CssBaseline, Box, Typography, Container, Grid, Paper, Link,
} from '@mui/material';
import mainStyles from './core/styles/mainStyles';
import DesktopNavbar from './core/layout/DesktopNavbar';
import EvidenceListTable from './core/ui/EvidenceListTable';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function MainPage() {
  const classes = mainStyles();
  return (
    <>
      <CssBaseline />
      <DesktopNavbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EvidenceListTable />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </>
  );
}
