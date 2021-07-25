import React, {useEffect, useReducer, useState} from 'react';
import {gwActions, useAppDispatch, useAppState} from '../../Context';
import isElectron from 'is-electron'
import {
  Button,
  Box,
  AppBar,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Paper, Select,
  Tab,
  Tabs,
  Typography, FormControl
} from "@material-ui/core";
import GwMenuTop from "./GwMenuTop";
import mainStyles from "./mainStyles";
import ScannedImageList from "../../Components/ScannedImageList";
import ConfirmedEvidenceList from "../../Components/ConfirmedEvidenceList";
import IdentifiedEvidenceList from "../../Components/IdenfiedEvidenceList";
import * as electronActions from '../../Actions/electionActions'

const R = require('ramda');
// import electron from 'electron'
const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Main = (props) => {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const [value, setValue] = React.useState(0);
  const [clientTaxId, setClientTaxId] = React.useState('');
  const classes = mainStyles()

  useEffect(async () => {
    console.log('userDetails', appState)
    const result = await electronActions.getFileLists(dispatch)
    console.log('result', result)
  }, [])

  const handleLogout = () => {
    gwActions.logout(dispatch);
    props.history.push('/login');
  };

  async function getFiles(filepath) {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getFileLists', filepath)
      return result
    }
    return {}
  }

  const getUser = () => {
    var initUser = {
      username: 'seanlin',
      taxId: '24549210'
    }
    return (appState.auth) ? appState.auth : initUser
  }

  const getClient = () => {
    return {
      taxId: '50985089',
      name: 'Happy Industry'
    }
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  const handleClientSelectChange = (event, target)=>{
    console.log('handleClientSelectChange event', event)
    console.log('handleClientSelectChange target', target)
    setClientTaxId(event.target.value)
  }

  const handleSendImageToIdentify = (event)=>{
    console.log('handleSendImageToIdentify event', event)
  }

  const handleScanImage = (event)=>{
    console.log('handleScanImage event', event)
  }


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const renderUserMenu = () => {
    if (appState.auth) {
      return (
        <div>
          <nav>
            <p>Welcome {appState.auth.username}</p>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </nav>
        </div>
      )
    }
    return (<>
      <nav>Aloha</nav>
      <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
    </>)
  }

  const renderClientSelect = () => {
    return (
      <>
        <FormControl className={classes.formControl}>
        <InputLabel id="client-taxId-select-label">客戶</InputLabel>
        <Select
          labelId="client-taxId-select-label"
          id="client-taxId-select"
          value={clientTaxId}
          onChange={handleClientSelectChange}>
          <MenuItem value={'24549210'}>
            Gateweb Ltd. Co.
          </MenuItem>
        </Select>
        </FormControl>
      </>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <GwMenuTop/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <h1>Main</h1>
          {renderClientSelect()}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AppBar position="static">
                  <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab label="已掃描圖檔" {...a11yProps(0)} />
                    <Tab label="已辨識憑證" {...a11yProps(1)} />
                    <Tab label="已確認辨識結果" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <ScannedImageList data={appState.appData.fileLists['01']} onScanClick={handleScanImage} onSendToIdentifyClick={handleSendImageToIdentify}></ScannedImageList>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <IdentifiedEvidenceList data={[]}></IdentifiedEvidenceList>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ConfirmedEvidenceList></ConfirmedEvidenceList>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Main;