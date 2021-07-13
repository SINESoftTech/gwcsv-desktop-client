import React, {useState} from 'react';
import {logout, useAuthDispatch, useAuthState} from '../../Context';
import EvidenceList from "../../Components/EvidenceListTable";
import Button from "@material-ui/core/Button";
import isElectron from 'is-electron'
import {AppBar, Container, Tabs} from "@material-ui/core";

const R = require('ramda');
// import electron from 'electron'
const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const Main = (props) => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  let [localFiles, setLocalFiles] = useState({})


  const handleLogout = () => {
    logout(dispatch);
    props.history.push('/login');
  };

  const handleLoad = async () => {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      console.log(result)
      setLocalFiles(result)
    }
  };

  const handleScan = async () => {
    if (ipcRenderer) {
    }
  };
  const handleSendToIdentify = () => {
    localFiles['01'].forEach(async (fileObj) => {
      var ticket = await sendToIdentify(fileObj)

      if (ipcRenderer) {
        console.log('ticket', ticket)
        var updatedFiles = await ipcRenderer.invoke('evidence:identifySent', JSON.stringify(getUser()), JSON.stringify(getClient()), JSON.stringify(ticket.ticket), JSON.stringify(fileObj))
        console.log('updatedFiles', updatedFiles)
        setLocalFiles(updatedFiles)
      }
    })

  };

  const getUser=()=>{
    var initUser={
      username:'seanlin',
      taxId: '24549210'
    }
    if(userDetails && userDetails.user){
      return userDetails.user
    }
    return initUser
  }

  const getClient = ()=>{
    return {
      taxId: '50985089',
      name: 'Happy Industry'
    }
  }

  const sendToIdentify = async (fileObj) => {
    // const result = await ipcRenderer.invoke('evidence:getImageFileContent')
    return {
      result: 'true',
      ticket: {
        id: '8c869dbd-1bb5-4fe2-ac60-9b4215edffb8'
      }
    }
  }
  const handleGetIdentifyResult = () => {
    localFiles['02'].forEach(async (fileObj) => {
      var ticketId = fileObj.filename.split('_')[3]
      var result = getIdentifyResult(ticketId)
      if(result.status === 'completed') {
        if (ipcRenderer) {
          var updatedFiles = await ipcRenderer.invoke('evidence:identifyResultReceived', JSON.stringify(fileObj), JSON.stringify(result))
          console.log('updatedFiles', updatedFiles)
          setLocalFiles(updatedFiles)
        }
      }
    })
  };

  const getIdentifyResult = (ticketId)=>{
    console.log(ticketId)
    return {
      status: 'completed',
      content:{
        invoiceNumber:'AZ12345678'
      }
    }
  }

  const byTicketId = R.groupBy((fileObj)=>{
    return fileObj.filename.split('_')[2].split('.')[0]
  })
  const handleResultAllConfirmed = () => {
    console.log('localfiles 03', localFiles['03'])
    var filesByTicketId = byTicketId(localFiles['03'])
    let imageFileExtension = ['jpg', 'png', 'git']
    Object.keys(filesByTicketId).forEach(async ticketId=>{
      if(ipcRenderer){
        let imageObj = filesByTicketId[ticketId].filter((fileObj)=>{
          return imageFileExtension.indexOf(fileObj.filename.split('.')[1]) > -1
        })[0]

        let sighttourObj = filesByTicketId[ticketId].filter(fileObj=>{
          return R.includes('sightour', fileObj.filename)
        })[0]

        console.log('imageObj', imageObj)
        console.log('sightourObj',sighttourObj)
        var updatedFiles = await ipcRenderer.invoke('evidence:evidenceSaved', JSON.stringify(imageObj), JSON.stringify(sighttourObj), null)
        setLocalFiles(updatedFiles)
      }
    })
  };

  const handleEvidenceSaved = () => {
  };

  const handleUpload = () => {
    var filesByTicketId = byTicketId(localFiles['04'])
    let imageFileExtension = ['jpg', 'png', 'git']
    Object.keys(filesByTicketId).forEach(async ticketId=>{
      let imageObj = filesByTicketId[ticketId].filter((fileObj)=>{
        return imageFileExtension.indexOf(fileObj.filename.split('.')[1]) > -1
      })[0]

      let sighttourObj = filesByTicketId[ticketId].filter(fileObj=>{
        return R.includes('sightour', fileObj.filename)
      })[0]

      let savedResultObj = filesByTicketId[ticketId].filter(fileObj=>{
        return R.includes('saved', fileObj.filename)
      })[0]
      var uploadResult = uploadToGateweb(imageObj, savedResultObj)
      if(uploadResult.success) {
        if (ipcRenderer) {
          var updatedFiles = await ipcRenderer.invoke('evidence:uploaded', JSON.stringify(imageObj), JSON.stringify(sighttourObj), JSON.stringify(savedResultObj))
          setLocalFiles(updatedFiles)
        }
      }
    })
  };

  const uploadToGateweb = (imageObj, savedResultObj) =>{
    return {
      success: true
    }
  }

  const handleTabChange = ()=>{

  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div style={{padding: 10}}>
      <Container>
        <h1>Main</h1>
        <p>Welcome {userDetails.user.username}</p>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
      <Container>
        <Button variant="contained" onClick={handleLoad}>Load</Button>
        <Button variant="contained" onClick={handleScan}>Scan</Button>
        <Button variant="contained" onClick={handleSendToIdentify}>Send to Identify</Button>
        <Button variant="contained" onClick={handleGetIdentifyResult}>Get Identify Result</Button>
        <Button variant="contained" onClick={handleResultAllConfirmed}>Result Confirmed</Button>
        <Button variant="contained" onClick={handleUpload}>Upload to Gateweb</Button>
      </Container>


      <Container>
        <div>{JSON.stringify(localFiles)}</div>
        <EvidenceList></EvidenceList>
      </Container>

    </div>
  );
};

export default Main;