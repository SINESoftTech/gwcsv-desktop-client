import React, {useEffect, useState} from 'react';
import {logout, useAuthDispatch, useAuthState} from '../../Context';
import EvidenceList from "../../Components/EvidenceListTable";
import Button from "@material-ui/core/Button";
import isElectron from 'is-electron'
import {AppBar, Container, CssBaseline, Grid, IconButton, Paper, Tab, Tabs, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ImageDisplay from 'material-ui-image'
import GwMenuTop from "./GwMenuTop";
import mainStyles from "./mainStyles";
import * as mockData from './mockDisplayData'
import ScannedImageList from "../../Components/ScannedImageList";
import ConfirmedEvidenceList from "../../Components/ConfirmedEvidenceList";
import IdentifiedEvidenceList from "../../Components/IdenfiedEvidenceList";

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
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const [localFiles, setLocalFiles] = useState()
  const [value, setValue] = React.useState(0);

  const classes = mainStyles()
  useEffect(async () => {
    await fetchAllFiles()
  }, [])

  const handleLogout = () => {
    logout(dispatch);
    props.history.push('/login');
  };

  const fetchAllFiles = async () => {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      setLocalFiles(result)
    }
  }

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
    if (userDetails && userDetails.user) {
      return userDetails.user
    }
    return initUser
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const renderUserMenu = () => {
    if (userDetails.user) {
      return (
        <div>
          <nav>
            <p>Welcome {userDetails.user.username}</p>
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

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <GwMenuTop/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <h1>Main</h1>
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
                  <ScannedImageList data={localFiles} user={getUser()} client={getClient()}></ScannedImageList>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <IdentifiedEvidenceList data={localFiles}></IdentifiedEvidenceList>
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