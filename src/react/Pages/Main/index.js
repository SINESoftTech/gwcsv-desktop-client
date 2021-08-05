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
import * as sightTourActions from '../../Actions/sightourActions'
import axios from "axios";

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
    await electronActions.getFileLists(dispatch)
    await gwActions.getAllClientList(dispatch, appState.auth.user.username, appState.auth.user.taxId, appState.auth.user.token)
  }, [])

  const getUser = () => {
    var initUser = {
      username: 'seanlin',
      taxId: '24549210'
    }
    return (appState.auth && appState.auth.user.username) ? appState.auth.user : initUser
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
  const handleClientSelectChange = (event) => {
    setClientTaxId(event.target.value)
  }

  const handleSendImageToIdentify = (event, data) => {
    //FIXME
    const blob = data[0].imageUrl
    const fileName = data[0].fileName
    const file = new File([blob], fileName);
    //FIXME add value
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('type', "A5001");
    bodyFormData.append('agent', "00000000");
    bodyFormData.append('company', "00000000");
    bodyFormData.append('token', "2olhx7gwv10z");
    //todo upload
    console.log(bodyFormData)
    uploadFileToSightour(bodyFormData)
  }

  const uploadFileToSightour = (formData) => {
    //FIXME
    const url = 'http://aiocr.sightour.com/gateweb/api/upload.php'
    axios.post(url, formData).then(r => {
      console.log(r)
    })
  }

  const handleScanImage = (event) => {
    console.log('handleScanImage event', event)
  }

  const updateFiles = (getFileListResult) => {

  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const renderClientSelectOptions = (clientLists) => {
    return clientLists.map(client => {
      return <MenuItem key={client.taxId} value={client.taxId}>{client.name}</MenuItem>
    })
  }
  const renderClientSelect = () => {
    console.log('renderClientSelect appState', appState)
    return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id="client-taxId-select-label">客戶</InputLabel>
          <Select
            labelId="client-taxId-select-label"
            id="client-taxId-select"
            value={clientTaxId}
            onChange={handleClientSelectChange}>
            <MenuItem key={0} value={''}>請選擇營利事業人</MenuItem>
            {appState.appData.clientLists.map(client => {
              return (<MenuItem key={client.taxId.id} value={client.taxId.id}>{client.name}</MenuItem>)
            })}
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
                    <Tab key={0} label="已掃描圖檔" {...a11yProps(0)} />
                    <Tab key={1} label="已辨識憑證" {...a11yProps(1)} />
                    <Tab key={2} label="已確認辨識結果" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <ScannedImageList data={appState.appData.fileLists['01']}
                                    username={appState.auth.user.username} clientTaxId={clientTaxId.toString()}
                                    onScanClick={handleScanImage}
                                    onSendToIdentifyClick={handleSendImageToIdentify}></ScannedImageList>
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
