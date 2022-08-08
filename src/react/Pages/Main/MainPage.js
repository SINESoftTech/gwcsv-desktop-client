import React from 'react';
import mainStyles from "./mainStyles";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Link
} from '@material-ui/core';
import EvidenceList from "../../Components/EvidenceListTable";
import GwMenuTop from "./GwMenuTop";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function MainPage() {

  const classes = mainStyles()
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <GwMenuTop/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EvidenceList/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright/>
          </Box>
        </Container>
      </main>
    </div>
  );
}
